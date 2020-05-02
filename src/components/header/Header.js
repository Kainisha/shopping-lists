import React from 'react';
import styled from 'styled-components';
import Button from 'components/buttons/Button';

const HeaderStyled = styled.header`
  height: 60px;
  width: 100%;
  position: sticky;
  top: 0;
  box-shadow: 0 4 4 #838383;
  display: flex;
  align-items: center;
  padding: 1rem;
`;

const Header = () => (
  <HeaderStyled>
    <Button text="List" main link to="/list" />
    <Button text="Archive" main to="/achive" />
    <Button text="New" main to="/new" />
  </HeaderStyled>
);

export default Header;
