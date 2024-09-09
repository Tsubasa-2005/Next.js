import axios from 'axios';
import { paths, components } from '@/api/api';
import {setCookie} from "@/lib/utils/cookie";

type LoginRequest = paths['/login']['post']['requestBody']['content']['application/json'];
type LoginResponse = paths['/login']['post']['responses']['200'];
type BadRequestResponse = components['responses']['badRequest'];
type LoginError = { error: string };

export const login = async (user_id: number, password: string): Promise<null | LoginError> => {
    try {
        const requestBody: LoginRequest = { user_id, password };

        const response = await axios.post<LoginResponse>('http://127.0.0.1:8080/login', requestBody, {
            withCredentials: true,
        });

        const cookies = response.headers['set-cookie'];
        if (cookies && cookies.length > 0) {
            const tokenCookie = cookies.find(cookie => cookie.includes('Bearer'));
            if (tokenCookie) {
                const token = tokenCookie.split('Bearer ')[1];
                if (token) {
                    await setCookie(token);
                    return null;
                }
            }
        }

        return { error: 'Token not found in response' };

    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            const badRequest: BadRequestResponse = error.response.data;
            const errorMessage = badRequest.content?.['application/json']?.message || 'Bad request';
            return { error: errorMessage };
        }

        console.error('Login request failed:', error);
        return { error: 'Failed to login' };
    }
};