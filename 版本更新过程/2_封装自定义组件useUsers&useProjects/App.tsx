import { AuthenticatedApp } from 'authenticated-app';
import { useAuth } from 'context/auth-context';
import React from 'react';
import { UnauthenticatedApp } from 'unauthenticated-app';
import './App.css';
// 不再引入，而是使用登录状态的切换
// import { ProjectListScreen } from 'screens/project-list';
// import { LoginScreen } from 'screens/login';

function App() {
  const {user} = useAuth()

  return (
    <div className="App">
      {/* <LoginScreen/>
      <ProjectListScreen/> */}
      {user ? <AuthenticatedApp/> : <UnauthenticatedApp/>}
    </div>
  );
}

export default App;
