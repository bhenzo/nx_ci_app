import { PropsWithChildren, ReactNode, useEffect, useState } from 'react';
import { useAuth } from '../hooks/use-auth';
import { Route } from 'react-router-dom';

type Props = {
  children: (profile: Profile) => ReactNode;
};
export const ProtectedRoute = ({ children }: Props) => {
  const { getProfile } = useAuth();
  const [prof, setProf] = useState<Profile>();
  useEffect(() => {
    const fetchProfile = async (): Promise<void> => {
      const _pr = await getProfile();
      setProf(_pr);
    };
    fetchProfile();
  }, []);
  return <>{prof && children(prof)}</>;
};
