/*
  Header component 
  title is clickable and links back to the home page
  to return from user info to signin again
 */

import styled from "styled-components";

// styled components for the header
const HeaderContainer = styled.header`
  background-color: #fff;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const Wrapper = styled.div`
  max-width: 64rem;
  margin: 0 auto;
  padding: 1.5rem 2rem;
  text-align: center;
`;

/* wanted to keep with Link tag for next.js, but 
 * pain to try and get it working for this purpose, have it with 'a' 
 * tag so sticking with it
 */ 
const Title = styled.a`
  font-size: 2rem;
  font-weight: bold;
  color: #111827;
  margin: 0;
  cursor: pointer;
  transition: color 0.2s ease;
  text-decoration: none;
  display: inline-block;

  &:hover {
    color: #8b5cf6;
  }
`;

// simple header component
export default function Header() {
  return (
    <HeaderContainer>
      <Wrapper>
        <Title href="/">CS391 OAuth Project</Title>
      </Wrapper>
    </HeaderContainer>
  );
}
