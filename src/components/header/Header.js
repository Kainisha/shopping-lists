import React from 'react';
import styled from 'styled-components';
import Button from 'components/buttons/Button';

const HeaderStyled = styled.header`
  height: 40px;
  width: 100%;
  position: sticky;
  top: 0;
  box-shadow: 0 4px 4px #838383;
  display: flex;
  align-items: center;
  padding: 1rem;

  a {
    margin: 0 0.5rem;
  }
`;

const Header = () => (
  <HeaderStyled>
    <Button text="List" to="/list" main link icon="list" />
    <Button text="Archived" to="/achived" main link icon="archive" />
    <Button text="New" to="/new" main link icon="new" />
  </HeaderStyled>
);

export default Header;
