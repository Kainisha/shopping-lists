import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';
import RemoveIcon from '@material-ui/icons/Remove';
import SaveIcon from '@material-ui/icons/Save';
import SearchIcon from '@material-ui/icons/Search';

interface IconButton {
  sm: number | undefined;
  success: boolean | undefined;
  error: boolean | undefined;
}

const IconButtonStyled = styled.button<IconButton>`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.mainColorHover};
  transition: background-color 300ms ease-in-out;
  height: 2rem;
  width: 2rem;
  box-shadow: 0 1px 2px 1px lightgrey;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;

  &::after {
    content: '';
    opacity: 0;
    box-shadow: 0 1px 2px 2px lightgrey;
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
    border-color: darkgray;
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

interface IconButtonLink {
  sm: number | undefined;
  to: string;
  disabled: boolean | undefined;
}

const IconButtonLinkStyled = styled(Link)<IconButtonLink>`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.mainColorHover};
  transition: background-color 300ms ease-in-out;
  height: 2rem;
  width: 2rem;
  box-shadow: 0 1px 2px 1px lightgrey;
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
    border-color: darkgray;
  }

  &::after {
    content: '';
    opacity: 0;
    box-shadow: 0 1px 2px 2px lightgrey;
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

type Icon = 'done' | 'create' | 'remove' | 'save' | 'search';

interface ButtonProps {
  sm: boolean | undefined;
  success?: boolean | undefined;
  error?: boolean | undefined;
  icon: Icon;
  className?: string;
  link?: string | undefined;
  onClick: () => void;
  to?: string | undefined;
  disabled?: boolean;
}

interface LinkProps {
  sm?: boolean | undefined;
  success?: boolean | undefined;
  error?: boolean | undefined;
  icon: Icon;
  className?: string;
  link?: boolean | undefined;
  onClick?: () => void;
  to?: string | undefined;
  disabled?: boolean | undefined;
}

type IconButtonProps = ButtonProps | LinkProps;

const IconButton: FunctionComponent<IconButtonProps> = ({
  icon,
  className,
  success,
  error,
  link,
  onClick,
  to,
  sm,
  disabled,
}) => {
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

  const handleClick = () => {
    if (!onClick) {
      return;
    }
    onClick();
  };

  return (
    <>
      {link && to ? (
        <IconButtonLinkStyled
          className={className}
          to={to}
          sm={sm ? 1 : undefined}
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
          sm={sm ? 1 : undefined}
          disabled={disabled}
        >
          {buttonIcon()}
        </IconButtonStyled>
      )}
    </>
  );
};

IconButton.propTypes = {
  icon: PropTypes.oneOf<Icon>(['done', 'create', 'remove', 'save', 'search']).isRequired,
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
  onClick: () => null,
  sm: false,
  disabled: false,
};

export default IconButton;
