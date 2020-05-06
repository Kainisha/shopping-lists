import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import DoneIcon from '@material-ui/icons/Done';
import CreateIcon from '@material-ui/icons/Create';

const IconButtonStyled = styled.button`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.mainColorHover};
  transition: background-color 300ms ease-in-out;
  height: 2.5rem;
  width: 2.5rem;
  box-shadow: 0 0 8px lightgrey;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};
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
`;

const IconButtonLinkStyled = styled(Link)`
  border-radius: 50%;
  background-color: ${({ theme }) => theme.mainColor};
  border: 1px solid ${({ theme }) => theme.mainColorHover};
  transition: background-color 300ms ease-in-out;
  height: 2.5rem;
  width: 2.5rem;
  box-shadow: 0 0 8px lightgrey;
  display: flex;
  justify-content: center;
  align-items: center;

  svg {
    font-size: 1.2rem;
  }

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};
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
`;

const IconButton = ({ icon, className, success, link, onClick, to }) => {
  const buttonIcon = () => {
    switch (icon) {
      case 'done': {
        return <DoneIcon />;
      }
      case 'create': {
        return <CreateIcon />;
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
        <IconButtonLinkStyled className={className} success={success} to={to} exact>
          {buttonIcon()}
        </IconButtonLinkStyled>
      ) : (
        <IconButtonStyled className={className} success={success} onClick={handleClick}>
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
  onClick: PropTypes.func.isRequired,
  link: PropTypes.bool,
  to: PropTypes.string,
};

IconButton.defaultProps = {
  className: '',
  success: false,
  link: false,
  to: '',
};

export default IconButton;
