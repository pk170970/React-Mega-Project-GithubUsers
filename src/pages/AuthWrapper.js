import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import styled from 'styled-components';

function AuthWrapper({children}) {
  const {isLoading,error}= useAuth0();
  if(isLoading){
    return (
      <Wrapper>
        <img src="https://react-search-github-users.netlify.app/static/media/preloader.a6525050b19ec22d72cd.gif" alt="" className="loading-img" />
      </Wrapper>
    )
  }
  
  if(error){
    return(
      <Wrapper>
        <h1>{error.message}</h1>
      </Wrapper>
    )
  }
  return <>{children}</>;
}

const Wrapper = styled.section`
  min-height: 100vh;
  display: grid;
  place-items: center;
  img {
    max-width:100%;
  }
`;

export default AuthWrapper;
