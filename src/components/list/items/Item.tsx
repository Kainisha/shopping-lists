import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';

interface ItemStyled {
  done: boolean;
}

const ItemStyled = styled.div<ItemStyled>`
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

type UpdateAction = {
  id: number;
  description: string;
  done: boolean;
};

type ItemProps = {
  id: number;
  description: string;
  done: boolean;
  clickItem: (id: number) => void;
  updateAction: ({ id, description, done }: UpdateAction) => void;
  archived: boolean | undefined;
};

const Item: FunctionComponent<ItemProps> = ({
  id,
  description,
  done,
  clickItem,
  updateAction,
  archived,
}) => {
  const handleClick = () => {
    if (archived) {
      return;
    }
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
  archived: PropTypes.bool,
};

Item.defaultProps = {
  archived: false,
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateAction: ({ id, description, done }: UpdateAction) =>
      dispatch({ type: 'UPDATE_LIST_ITEM', payload: { id, description, done } }),
  };
};

export default connect(null, mapDispatchToProps)(Item);
