/*
  SignInLink component displays the sign-in card with a link
  to initiate the Google OAuth flow
 */

import styled from "styled-components";
import Link from "next/link";

// styled components 
const StyledMain = styled.main`
  flex: 1;                   
  background-color: rgb(174, 104, 255);
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;

const Card = styled.div`
  background: #fff;
  border-radius: 1rem;       
  padding: 3rem;             
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 480px;       
  width: 90%;
`;

const CardTitle = styled.h2`
  margin: 0 0 1rem;
  font-size: 2rem;      
`;

const CardSubtitle = styled.p`
  margin: 0 0 2rem;
  font-size: 1.125rem;      
  color: #555;
`;

const LinkButton = styled(Link)`
  display: block;
  width: 80%;             
  margin: 0 auto 1rem; 
  padding: 1rem;          
  margin-bottom: 1rem;
  background-color: #8b5cf6;
  color: #fff;
  text-decoration: none;
  text-align: center;
  border-radius: 0.5rem;
  font-size: 1.125rem;       
  font-weight: 500;

  &:last-child {
    margin-bottom: 0;
  }
  &:hover {
    opacity: 0.9;
  }
`;

// the main component with link to start signin
export default function SignInLink() {
  return (
    <StyledMain>
      <Card>
        <CardTitle>OAuth Demo</CardTitle>
        <CardSubtitle>Click the link to sign in</CardSubtitle>
        <LinkButton href="/api/auth/google">Sign in with Google</LinkButton>
      </Card>
    </StyledMain>
  );
}
