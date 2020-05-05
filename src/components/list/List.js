import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import { connect } from 'react-redux';
import ArrowIcon from '@material-ui/icons/PlayArrow';

import Bar from 'components/list/Bar';
import Item from 'components/list/items/Item';
import IconButton from 'components/buttons/IconButton';

const ListStyled = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 1rem 0;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr;
  position: relative;
  outline: 0;

  .button--done {
    position: absolute;
    right: 55px;
    z-index: 1;
    top: -25px;
  }

  .button--create {
    position: absolute;
    right: 5px;
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

const IconWrapperStyled = styled.div`
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
`;

const BarStyled = styled.div`
  grid-area: bar;
`;

const opacity = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const ItemsWrapperStyled = styled.div`
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

const List = ({ name, items, done, id, updateAction }) => {
  const initCounter = items.filter((item) => item.done).length;
  const [counter, setCounter] = useState(initCounter);
  const [listItems, setListItems] = useState(items);
  const [showItems, setShowItems] = useState(false);
  const [doneStatus, setDoneStatus] = useState(done);

  const handleClickItem = (itemId) => {
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
    setDoneStatus(!done);
    updateAction({ id, name, done: !done });
  };

  return (
    <ListStyled>
      <IconButton
        className="button--done"
        success={doneStatus}
        icon="done"
        onClick={handleSetDone}
      />
      <IconButton className="button--create" icon="create" />
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
              key={`list-item-${id}`}
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
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateAction: ({ id, done, name }) =>
      dispatch({ type: 'UPDATE_LIST', payload: { id, done, name } }),
  };
};

export default connect(null, mapDispatchToProps)(List);
