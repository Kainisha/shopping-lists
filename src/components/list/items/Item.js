import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const ItemStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.defaultColor};
  padding: 5px 15px;
  border-radius: 15px;
  display: flex;
  width: 500px;
  margin: 5px 0;
  transition: background-color 300ms ease-in-out;

  &:hover {
    box-shadow: 0 0 4px lightgray;
  }

  ${({ done }) =>
    done &&
    css`
      background-color: ${({ theme }) => theme.successColor};
    `};
`;

const Item = ({ id, description, done, clickItem }) => {
  const handleClick = () => clickItem(id);

  return (
    <ItemStyled done={done} onClick={handleClick}>
      {description}
    </ItemStyled>
  );
};

Item.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  clickItem: PropTypes.func.isRequired,
};

export default Item;
