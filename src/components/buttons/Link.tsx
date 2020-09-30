import React, { FunctionComponent } from 'react';
import { NavLink } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ListIcon from '@material-ui/icons/List';
import ArchiveIcon from '@material-ui/icons/Archive';
import NewIcon from '@material-ui/icons/AddCircleOutline';

const NavLinkStyled = styled(NavLink)`
  width: 4rem;
  height: 2rem;
  transition: background-color 300ms ease-in-out, transform 300ms ease-in-out;
  border: 2px solid ${({ theme }) => theme.mainColorHover};
  background-color: ${({ theme }) => theme.mainColor};
  border-radius: 20px;
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

interface LinkProps {
  text: string;
  to: string;
  icon?: string;
}

const Link: FunctionComponent<LinkProps> = ({ text, to, icon }) => {
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
    <NavLinkStyled to={to} activeClassName="link--active">
      {buttonIcon()}
      <span>{text}</span>
    </NavLinkStyled>
  );
};

Link.propTypes = {
  text: PropTypes.string.isRequired,
  to: PropTypes.string.isRequired,
  icon: PropTypes.string,
};

Link.defaultProps = {
  icon: '',
};

export default Link;
