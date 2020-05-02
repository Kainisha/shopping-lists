import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import CachedIcon from '@material-ui/icons/Cached';

const ButtonStyled = styled.button`
  width: 9rem;
  height: 2rem;
  transition: background-color 300ms ease-in-out, transform 300ms ease-in-out;
  border: 2px solid ${({ theme }) => theme.mainColorHover};
  background-color: ${({ theme }) => theme.mainColor};
  border-radius: 5px;
  text-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 4px lightgray;

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};
  }

  ${({ success }) =>
    success &&
    css`
      border-color: ${({ theme }) => theme.successColorHover};
      background-color: ${({ theme }) => theme.successColor};

      &:hover {
        background-color: ${({ theme }) => theme.successColorHover};
      }
    `}

  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme }) => theme.errorColorHover};
      background-color: ${({ theme }) => theme.errorColor};

      &:hover {
        background-color: ${({ theme }) => theme.errorColorHover};
      }
    `}
`;

const NavLinkStyled = styled(NavLink)`
  width: 9rem;
  height: 2rem;
  transition: background-color 300ms ease-in-out, transform 300ms ease-in-out;
  border: 2px solid ${({ theme }) => theme.mainColorHover};
  background-color: ${({ theme }) => theme.mainColor};
  border-radius: 5px;
  text-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 4px lightgray;

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};
  }

  &:link--active {
    background-color: ${({ theme }) => theme.mainColorHover};
  }
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(-360deg);
    }
`;

const IconWrapper = styled.span`
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;

const Button = ({ text, success, error, link, to, onClick, isFetching }) => {
  const handleClick = () => onClick();

  return (
    <>
      {link ? (
        <NavLinkStyled to={to} activeClassName="link--active">
          {text}
        </NavLinkStyled>
      ) : (
        <ButtonStyled
          type="button"
          onClick={handleClick}
          className=""
          error={error}
          success={success}
        >
          {isFetching ? (
            <IconWrapper>
              <CachedIcon />
            </IconWrapper>
          ) : (
            <span>{text}</span>
          )}
        </ButtonStyled>
      )}
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  link: PropTypes.bool,
  to: PropTypes.string,
  onClick: PropTypes.func,
  isFetching: PropTypes.bool,
};

Button.defaultProps = {
  success: false,
  error: false,
  link: false,
  to: '',
  onClick: () => {},
  isFetching: false,
};

export default Button;
