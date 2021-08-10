import { AuthenticatedApp } from 'authenticated-app';
import { ErrorBoundary } from 'components/error-boundary';
import { FullPageErrorFallBack } from 'components/lib';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';
// 不再引入，而是使用登录状态的切换
// import { ProjectListScreen } from 'screens/project-list';
// import { LoginScreen } from 'screens/login';

function App() {
  const { user } = useAuth()

  return (
    <div className="App">
      {/* 添加异常边界 */}
      <ErrorBoundary fallbackRender={FullPageErrorFallBack}>
        {user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
      </ErrorBoundary>
      {/* <LoginScreen/>
      <ProjectListScreen/> */}

    </div>
  );
}

export default App;
