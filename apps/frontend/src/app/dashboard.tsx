import { Center, Text, Title } from '@mantine/core';

type Props = {
  profile: Profile;
};

export const Dashboard = ({ profile }: Props) => {
  return (
    <Center h={'100vh'}>
      <Title>Dashboard</Title>
      <Text>Usuario: {profile.username}</Text>
    </Center>
  );
};
