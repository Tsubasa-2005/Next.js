import axios from 'axios';
import { paths } from '@/api/api';

type RegisterRequest = paths['/register']['post']['requestBody']['content']['application/json'];
type RegisterResponse = paths['/register']['post']['responses']['200'];
type RegisterError = { error: string };

export const register = async (user_id: number, password: string, name: string, email: string): Promise<null | RegisterError> => {
    try {
        const requestBody: RegisterRequest = { user_id, password, name, email };

        const response = await axios.post<RegisterResponse>('http://127.0.0.1:8080/register', requestBody, {
            withCredentials: true,
        });

        // 成功した場合はnullを返す
        return null;
    } catch (error) {
        console.error('Register request failed:', error);
        return { error: 'Failed to register' };
    }
};