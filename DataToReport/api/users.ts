import axios from 'axios';
import { paths, components } from '@/api/api';

type UpdateUserRequest = paths['/users']['put']['requestBody']['content']['application/json'];
type UpdateUserResponse = paths['/users']['put']['responses']['200'];
type BadRequestResponse = components['responses']['badRequest'];
type UpdateUserError = { error: string };

export const updateUser = async (id: number, email?: string, password?: string, name?: string): Promise<null | UpdateUserError> => {
    try {
        const requestBody: UpdateUserRequest = {
            id,
            email,
            password,
            name,
        };

        const response = await axios.put<UpdateUserResponse>('http://127.0.0.1:8080/users', requestBody, {
            withCredentials: true,
        });

        if (response.status === 200) {
            return null;
        }

        return { error: 'Failed to update user' };

    } catch (error: any) {
        if (axios.isAxiosError(error) && error.response?.status === 400) {
            const badRequest: BadRequestResponse = error.response.data;
            const errorMessage = badRequest.content?.['application/json']?.message || 'Bad request';
            return { error: errorMessage };
        }

        console.error('Update user request failed:', error);
        return { error: 'Failed to update user' };
    }
};