import { AppShell } from '@mantine/core';
import { LoginPage } from './login-page';
import { BrowserRouter, Route, Routes, useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { setNavigation } from './services/axios-instance';
import { Dashboard } from './dashboard';
import { ProtectedRoute } from './components/protected-route';

const ConfigAxiosNavigation = () => {
  const nav = useNavigate();

  useEffect(() => {
    setNavigation(nav);
  }, []);
  return undefined;
};

const ErrorPage = () => {
  return <h1>ERROR</h1>;
};
export function App() {
  return (
    <AppShell>
      <AppShell.Main bg={'blue.2'}>
        <BrowserRouter>
          <ConfigAxiosNavigation />
          <Routes>
            <Route path="/login" Component={() => <LoginPage />} />
            <Route path="/error" Component={() => <ErrorPage />} />
            <Route
              path="/dashboard"
              Component={() => (
                <ProtectedRoute
                  children={(profile) => <Dashboard profile={profile} />}
                />
              )}
            />
          </Routes>
        </BrowserRouter>
      </AppShell.Main>
    </AppShell>
  );
}

export default App;
