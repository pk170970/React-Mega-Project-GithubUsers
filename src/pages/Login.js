import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';
// import loginImg from '../images/login-img.svg';

const Login = () => {
  const { loginWithRedirect, isAuthenticated, user } = useAuth0();
  // console.log(isAuthenticated);
  const isUser = isAuthenticated && Object.keys(user).length > 0;
  
  if (isUser) {
    return <Navigate to="/" />
  }
  return (
    <Wrapper>
      <div className="container">
        <img src="https://react-search-github-users.netlify.app/static/media/login-img.45d3b74fbb4ac483314eef377e006a54.svg" alt="github user login" />
        <h1>github user</h1>
        <button className="btn" onClick={loginWithRedirect}>Log In / Sign Up</button>
      </div>
    </Wrapper>
  );
};
const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  .container {
    width: 90vw;
    max-width: 600px;
    text-align: center;
  }
  img {
    margin-bottom: 2rem;
  }
  h1 {
    margin-bottom: 1.5rem;
  }
`;
export default Login;
