import React from 'react';
import styled from 'styled-components';
import Link from 'components/buttons/Link';

const HeaderStyled = styled.header`
  height: 40px;
  position: sticky;
  top: 0;
  box-shadow: 0 4px 4px #838383;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 1rem;
  background: white;
  z-index: 100;

  a {
    margin: 0 0.5rem;
  }

  @media (min-width: 768px) {
    justify-content: flex-start;
  }
`;

const Header = () => (
  <HeaderStyled>
    <Link text="List" to="/list" icon="list" />
    <Link text="Archived" to="/achived" icon="archive" />
    <Link text="Create" to="/create" icon="new" />
  </HeaderStyled>
);

export default Header;
