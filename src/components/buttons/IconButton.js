import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';

const IconButtonStyled = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.mainColorHover};
  transition: background-color 300ms ease-in-out;
  height: 2rem;
  width: 2rem;
  box-shadow: 0 0 3px 2px lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    opacity: 0;
    box-shadow: 0 0 3px 4px lightgrey;
    transition: opacity 300ms ease-in-out;
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }

  ${({ sm }) =>
    sm &&
    css`
      width: 1.5rem;
      height: 1.5rem;
    `}

  svg {
    font-size: 1rem;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.defaultColor};
  }

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};

    &::after {
      opacity: 1;
    }
  }

  ${({ success }) =>
    success &&
    css`
      background-color: ${({ theme }) => theme.successColor};
      border: 1px solid ${({ theme }) => theme.successColorHover};

      &:hover {
        background-color: ${({ theme }) => theme.successColorHover};
      }
    `};

  ${({ error }) =>
    error &&
    css`
      background-color: ${({ theme }) => theme.errorColor};
      border: 1px solid ${({ theme }) => theme.errorColorHover};
      color: white;

      &:hover {
        background-color: ${({ theme }) => theme.errorColorHover};
      }
    `};
`;

const IconButtonLinkStyled = styled(Link)`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.mainColorHover};
  transition: background-color 300ms ease-in-out;
  height: 2rem;
  width: 2rem;
  box-shadow: 0 0 3px 2px lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;

  ${({ sm }) =>
    sm &&
    css`
      width: 1.5rem;
      height: 1.5rem;
    `}

  svg {
    font-size: 1rem;
  }

  &:disabled {
    background-color: ${({ theme }) => theme.defaultColor};
  }

  &::after {
    content: '';
    opacity: 0;
    box-shadow: 0 0 3px 4px lightgrey;
    transition: opacity 300ms ease-in-out;
    position: absolute;
    height: 100%;
    width: 100%;
    border-radius: 50%;
  }

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};

    &::after {
      opacity: 1;
    }
  }
`;

const IconButton = ({ icon, className, success, error, link, onClick, to, sm, disabled }) => {
  const buttonIcon = () => {
    switch (icon) {
      case 'done': {
        return <DoneIcon />;
      }
      case 'create': {
        return <CreateIcon />;
      }
      case 'remove': {
        return <RemoveIcon />;
      }
      case 'save': {
        return <SaveIcon />;
      }
      case 'search': {
        return <SearchIcon />;
      }
      default: {
        return '';
      }
    }
  };

  const handleClick = () => onClick();

  return (
    <>
      {link ? (
        <IconButtonLinkStyled
          className={className}
          to={to}
          sm={sm ? true : undefined}
          disabled={disabled}
        >
          {buttonIcon()}
        </IconButtonLinkStyled>
      ) : (
        <IconButtonStyled
          type="button"
          className={className}
          success={success}
          error={error}
          onClick={handleClick}
          sm={sm}
          disabled={disabled}
        >
          {buttonIcon()}
        </IconButtonStyled>
      )}
    </>
  );
};

IconButton.propTypes = {
  icon: PropTypes.string.isRequired,
  className: PropTypes.string,
  success: PropTypes.bool,
  error: PropTypes.bool,
  onClick: PropTypes.func,
  link: PropTypes.bool,
  to: PropTypes.string,
  sm: PropTypes.bool,
  disabled: PropTypes.bool,
};

IconButton.defaultProps = {
  className: '',
  success: false,
  error: false,
  link: false,
  to: '',
  onClick: () => {},
  sm: false,
  disabled: false,
};

export default IconButton;
