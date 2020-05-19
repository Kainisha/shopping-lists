import React from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import CachedIcon from '@material-ui/icons/Cached';
import ListIcon from '@material-ui/icons/List';
import ArchiveIcon from '@material-ui/icons/Archive';
import NewIcon from '@material-ui/icons/AddCircleOutline';

const ButtonStyled = styled.button`
  width: 9rem;
  height: 2rem;
  transition: background-color 300ms ease-in-out;
  border: 2px solid ${({ theme }) => theme.mainColorHover};
  background-color: ${({ theme }) => theme.mainColor};
  border-radius: 5px;
  text-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 4px lightgray;

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};
  }

  &:disabled {
    background-color: lightgray;
    border-color: darkgray;
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
  width: 4rem;
  height: 2rem;
  transition: background-color 300ms ease-in-out, transform 300ms ease-in-out;
  border: 2px solid ${({ theme }) => theme.mainColorHover};
  background-color: ${({ theme }) => theme.mainColor};
  border-radius: 5px;
  text-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 4px lightgray;
  display: flex;
  justify-content: center;
  align-items: center;
  text-decoration: none;
  color: black;

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};
  }

  &.link--active {
    background-color: ${({ theme }) => theme.mainColorHover};
  }

  svg {
    font-size: 20px;
  }

  span {
    display: none;
  }

  @media (min-width: 768px) {
    width: 9rem;

    span {
      display: block;
    }

    svg {
      margin-right: 10px;
    }
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

const Button = ({ text, success, error, link, to, onClick, isFetching, icon, type, disabled }) => {
  const handleClick = () => onClick();

  const buttonIcon = () => {
    switch (icon) {
      case 'list': {
        return <ListIcon />;
      }
      case 'archive': {
        return <ArchiveIcon />;
      }
      case 'new': {
        return <NewIcon />;
      }
      default: {
        return '';
      }
    }
  };

  return (
    <>
      {link ? (
        <NavLinkStyled to={to} activeClassName="link--active">
          {buttonIcon()}
          <span>{text}</span>
        </NavLinkStyled>
      ) : (
        <ButtonStyled
          type={type}
          onClick={handleClick}
          className=""
          error={error}
          success={success}
          disabled={disabled}
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
  icon: PropTypes.string,
  type: PropTypes.string,
  disabled: PropTypes.bool,
};

Button.defaultProps = {
  success: false,
  error: false,
  link: false,
  to: '',
  onClick: () => {},
  isFetching: false,
  icon: '',
  type: 'button',
  disabled: false,
};

export default Button;
