import {
  Button,
  Card,
  Center,
  Divider,
  Group,
  PasswordInput,
  Stack,
  Text,
  TextInput,
} from '@mantine/core';
import { useState } from 'react';
import { Credentials, useAuth } from './hooks/use-auth';

export const LoginPage = () => {
  const [credentials, setCredentials] = useState<Credentials>({});
  const { login } = useAuth();

  return (
    <Center h={'100vh'}>
      <Card>
        <Text fw={600} mb={10}>
          Login
        </Text>
        <TextInput
          label="Usuario"
          withAsterisk
          placeholder="Email o usuario"
          onChange={(ev) =>
            setCredentials({ ...credentials, user: ev.target.value })
          }
        />
        <TextInput
          label="Contraseña"
          withAsterisk
          onChange={(ev) =>
            setCredentials({ ...credentials, password: ev.target.value })
          }
        />
        <Stack mt={'md'} gap={'xs'}>
          <Button size="xs" onClick={() => login(credentials, '/dashboard')}>
            Ingresar
          </Button>
          <Button size="xs" variant="transparent">
            Crear usuario
          </Button>
        </Stack>
      </Card>
    </Center>
  );
};
