import { client } from '@/api/common/client';
import type { DeviceRegistration, DeviceResponse, UserRegistration } from './types';

export const userApi = {
  registerDevice: async (data: DeviceRegistration) => {
    const res = await client.post<DeviceResponse>('/api/users/devices', data);
    return res.data;
  },
  registerUser: async (payload: UserRegistration) => {
    const {data} = await client.put<DeviceResponse>('/api/users/me', payload);
    return data;
  },
};
