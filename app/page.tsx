"use client";

/*
 * main page component of the application
 * handle displaying either sign-in button or user's profile information
 * based on if user authenticated with Google
 */

import { useEffect, useState } from "react";
import styled from "styled-components";
import Header from "@/components/header";
import SignInLink from "@/components/signin-link";

// local type definition for Google user data, stop vercel from yelling at me
interface GoogleUser {
  sub: string;          
  name: string;         
  given_name: string;    
  family_name: string;  
  picture: string;     
  email: string;         
  email_verified: boolean; 
  locale: string;        
}

// styled components for page
const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;         
`;

const UserInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 2rem;
  background-color: rgb(174, 104, 255);
`;

const UserCard = styled.div`
  background: #fff;
  border-radius: 1rem;
  padding: 2rem;
  box-shadow: 0 6px 20px rgba(0,0,0,0.1);
  text-align: center;
  max-width: 480px;
  width: 90%;
`;

const CardTitle = styled.h2`
  margin: 0 0 1.5rem;
  font-size: 1.75rem;
  color: #333;
`;

const UserImage = styled.img`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  margin-bottom: 1rem;
`;

const UserName = styled.h2`
  margin: 0 0 0.5rem;
  font-size: 1.5rem;
`;

const UserEmail = styled.p`
  margin: 0;
  color: #666;
`;

export default function HomePage() {
  // state to store the user's information with proper typing
  const [user, setUser] = useState<GoogleUser | null>(null);

  // check user info in URL parameters
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const userParam = urlParams.get('user');
    if (userParam) {
      try {
        // parse and store user info from URL parameters
        setUser(JSON.parse(userParam));
      } catch (error) {
        console.error('Error parsing user data:', error);
      }
    }
  }, []);

  return (
    <AppContainer>
      <Header />
      {user ? (
        // display user info if authenticated
        <UserInfo>
          <UserCard>
            <CardTitle>Your Information</CardTitle>
            {user.picture && <UserImage src={user.picture} alt="Profile" />}
            <UserName>{user.name}</UserName>
            <UserEmail>{user.email}</UserEmail>
          </UserCard>
        </UserInfo>
      ) : (
        // display sign-in button if not authenticated
        <SignInLink />
      )}
    </AppContainer>
  );
}
