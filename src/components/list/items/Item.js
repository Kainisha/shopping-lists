import React from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { connect } from 'react-redux';

const ItemStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.defaultColor};
  padding: 5px 15px;
  border-radius: 15px;
  display: flex;
  width: 300px;
  margin: 5px 0;
  transition: background-color 300ms ease-in-out;
  white-space: normal;

  &:hover {
    box-shadow: 0 0 10px lightgray;
  }

  ${({ done }) =>
    done &&
    css`
      background-color: ${({ theme }) => theme.successColor};
    `};

  @media (min-width: 768px) {
    width: 500px;
  }
`;

const Item = ({ id, description, done, clickItem, updateAction }) => {
  const handleClick = () => {
    clickItem(id);
    updateAction({ id, description, done: !done });
  };

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
  updateAction: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAction: ({ id, description, done }) =>
      dispatch({ type: 'UPDATE_LIST_ITEM', payload: { id, description, done } }),
  };
};

export default connect(null, mapDispatchToProps)(Item);
