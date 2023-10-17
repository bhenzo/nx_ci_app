import { useNavigate } from 'react-router-dom';
import { instance, setToken } from '../services/axios-instance';

export interface Credentials {
  user?: string;
  password?: string;
}

export const useAuth = () => {
  const navigate = useNavigate();
  const login = async (
    credentials: Credentials,
    successPath: string
  ): Promise<string | undefined> => {
    try {
      const resp = await instance.post<
        Credentials,
        { data: { access_token: string } }
      >('/auth/login', credentials);
      if (resp?.data?.access_token) {
        setToken(resp.data.access_token);
        navigate(successPath);
      }
    } catch (err) {
      console.log(err);
    }
    return undefined;
  };

  const getProfile = async (): Promise<Profile | undefined> => {
    const resp = await instance.get<void, { data: Profile }>('/auth/profile');
    return resp?.data;
  };

  return { login, getProfile };
};
