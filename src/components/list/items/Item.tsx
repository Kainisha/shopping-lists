import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import { updateListItem as updateListItemAction } from 'actions';

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

interface UpdateListItem {
  id: number;
  description: string;
  done: boolean;
}

interface ItemProps {
  id: number;
  description: string;
  done: boolean;
  clickItem: (id: number) => void;
  updateListItem?: ({ id, description, done }: UpdateListItem) => void;
  archived: boolean | undefined;
}

const Item: FunctionComponent<ItemProps> = ({
  id,
  description,
  done,
  clickItem,
  updateListItem,
  archived,
}) => {
  const handleClick = () => {
    if (archived || !updateListItem) {
      return;
    }
    clickItem(id);
    updateListItem({ id, description, done: !done });
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
  updateListItem: PropTypes.func.isRequired,
  archived: PropTypes.bool,
};

Item.defaultProps = {
  archived: false,
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateAction: ({ id, description, done }: UpdateListItem) =>
      dispatch(updateListItemAction({ id, description, done })),
  };
};

export default connect(null, mapDispatchToProps)(Item);
