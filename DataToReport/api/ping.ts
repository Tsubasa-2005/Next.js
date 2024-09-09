import axios from 'axios';
import { paths } from "@/api/api";

type PingResponse = paths['/ping']['get']['responses']['200']['content']['application/json'];
type PingError = { error: string };

export const pingServer = async (): Promise<null | PingError> => {
    try {
        const response = await axios.get<PingResponse>('http://127.0.0.1:8080/ping');

        if (!response.data || response.data.message !== 'pong') {
            console.error('Unexpected response: message is not "pong". Response is:', response.data);
            return { error: 'Unexpected response: message is not "pong"' };
        }

        return null;
    } catch (error) {
        console.error('Ping request failed:', error);
        return { error: 'Failed to ping the server' };
    }
};