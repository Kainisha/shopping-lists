import React, { useState, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import ArrowIcon from '@material-ui/icons/PlayArrow';

import Bar from 'components/list/Bar';
import Item from 'components/list/items/Item';
import IconButton from 'components/buttons/IconButton';
import { UPDATE_LIST, DELETE_LIST, SAVE_ARCHIVED } from 'actions';

const ListStyled = styled.div`
  border-bottom: 2px solid lightgray;
  padding: 1rem 0;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  outline: 0;

  .button__done {
    position: absolute;
    right: 80px;
    z-index: 1;
    top: -25px;
  }

  .button__remove,
  .button__save {
    right: 5px;
    position: absolute;
    z-index: 1;
    top: -25px;
  }

  .button__create {
    position: absolute;
    right: 40px;
    z-index: 1;
    top: -25px;
  }
`;

const InfoStyled = styled.div`
  display: grid;
  grid-row-gap: 10px;
  grid-template-areas: 'icon name' 'counter counter' 'bar bar';
  align-items: center;
  grid-template-columns: 1fr 8fr;
  align-items: center;

  @media (min-width: 768px) {
    grid-template-columns: 1fr 4fr 2fr 5fr;
    grid-template-areas: 'icon name counter bar';
  }
`;

const IconStyled = styled.div`
  grid-area: icon;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 10px;

  @media (min-width: 768px) {
    border: 0;
    padding-bottom: 0;
  }
`;

interface IconWrapper {
  showItems: boolean;
}

const IconWrapperStyled = styled.div<IconWrapper>`
  background: ${({ theme }) => theme.mainColor};
  border-radius: 5px;
  border: 1px solid ${({ theme }) => theme.mainColorHover};
  width: 25px;
  height: 25px;
  display: flex;
  align-items: center;
  justify-content: center;

  svg {
    transition: transform 300ms ease-in-out;

    ${({ showItems }) =>
      showItems &&
      css`
        transform: rotateZ(90deg);
      `}
  }
`;

const NameStyled = styled.div`
  grid-area: name;
  align-self: stretch;
  display: flex;
  align-items: center;
  border-bottom: 1px solid lightgrey;
  padding-bottom: 10px;

  @media (min-width: 768px) {
    border: 0;
    padding-bottom: 0;
  }
`;

const CounterStyled = styled.div`
  grid-area: counter;
  color: gray;
`;

const BarStyled = styled.div`
  grid-area: bar;
  color: gray;
`;

const opacity = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

interface ItemsWrapper {
  showItems: boolean;
}

const ItemsWrapperStyled = styled.div<ItemsWrapper>`
  flex-direction: column;
  transition: opacity 300ms ease-in-out;
  animation: ${opacity} 300ms linear forwards;
  display: none;
  padding: 20px 0;
  margin-top: 20px;
  border-top: 1px solid gray;

  ${({ showItems }) =>
    showItems &&
    css`
      display: flex;
    `}
`;

interface List {
  name: string;
  done: boolean;
  id: number;
}

interface Item {
  id: number;
  description: string;
  done: boolean;
}

type UpdateAction = List;

interface SaveArchivedAction {
  name: string;
  items: Array<Item>;
}

type DeleteAction = {
  id: number;
};

interface ListProps {
  name: string;
  items: Array<Item>;
  done: boolean;
  id: number;
  archived?: boolean | undefined;
  updateAction: ({ id, name, done }: UpdateAction) => void;
  saveArchivedAction: ({ name, items }: SaveArchivedAction) => void;
  deleteAction: ({ id }: DeleteAction) => void;
}

const List: FunctionComponent<ListProps> = ({
  name,
  items,
  done,
  id,
  archived,
  updateAction,
  saveArchivedAction,
  deleteAction,
}) => {
  const initCounter = items.filter((item) => item.done).length;
  const [counter, setCounter] = useState(initCounter);
  const [listItems, setListItems] = useState(items);
  const [showItems, setShowItems] = useState(false);
  const [doneStatus, setDoneStatus] = useState(done);

  const handleClickItem = (itemId: number) => {
    const changedItems = listItems.map((item) => {
      if (item.id !== itemId) {
        return item;
      }

      const temp = item;
      temp.done = !temp.done;
      return temp;
    });

    setListItems(changedItems);
    const changedCounter = listItems.filter((item) => item.done).length;
    setCounter(changedCounter);
  };

  const handleShowItems = () => setShowItems(!showItems);
  const handleSetDone = () => {
    setDoneStatus(!doneStatus);
    updateAction({ id, name, done: !doneStatus });
  };

  const handleSave = () => saveArchivedAction({ name, items });
  const handleDelete = () => deleteAction({ id });

  const isCompleted = () => listItems.filter((item) => item.done).length === items.length;

  return (
    <ListStyled>
      {archived ? (
        <IconButton className="button__save" icon="save" onClick={handleSave} sm />
      ) : (
        <>
          <IconButton
            className="button__done"
            success={doneStatus ? true : undefined}
            icon="done"
            onClick={handleSetDone}
            disabled={!isCompleted()}
            sm
          />
          <IconButton className="button__create" icon="create" link to={`/create/${id}`} sm />
          <IconButton icon="remove" className="button__remove" error onClick={handleDelete} sm />
        </>
      )}

      <InfoStyled onClick={handleShowItems}>
        <IconStyled>
          <IconWrapperStyled showItems={showItems}>
            <ArrowIcon />
          </IconWrapperStyled>
        </IconStyled>
        <NameStyled>
          <span>{name}</span>
        </NameStyled>
        <CounterStyled>
          <span>{items.length} items</span>
        </CounterStyled>
        <BarStyled>
          <Bar all={items.length} counter={counter} />
        </BarStyled>
      </InfoStyled>

      {true && (
        <ItemsWrapperStyled showItems={showItems}>
          {listItems.map(({ id: itemId, description, done: itemDone }) => (
            <Item
              id={itemId}
              description={description}
              done={itemDone}
              clickItem={handleClickItem}
              key={`list-item-${itemId}`}
              archived={archived}
            />
          ))}
        </ItemsWrapperStyled>
      )}
    </ListStyled>
  );
};

List.propTypes = {
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  done: PropTypes.bool.isRequired,
  updateAction: PropTypes.func.isRequired,
  saveArchivedAction: PropTypes.func.isRequired,
  deleteAction: PropTypes.func.isRequired,
  archived: PropTypes.bool,
};

List.defaultProps = {
  archived: false,
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    updateAction: ({ id, done, name }: UpdateAction) =>
      dispatch({ type: UPDATE_LIST, payload: { id, done, name } }),
    saveArchivedAction: ({ name, items }: SaveArchivedAction) =>
      dispatch({ type: SAVE_ARCHIVED, payload: { name, items } }),
    deleteAction: ({ id }: DeleteAction) => dispatch({ type: DELETE_LIST, payload: { id } }),
  };
};

export default connect(null, mapDispatchToProps)(List);
