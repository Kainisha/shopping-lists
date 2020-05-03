import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import ArrowIcon from '@material-ui/icons/PlayArrow';

import Bar from 'components/list/Bar';
import Item from 'components/list/items/Item';

const ListStyled = styled.div`
  border-bottom: 1px solid lightgray;
  padding: 1rem 0;
  margin: 1rem 0;
  display: grid;
  grid-template-columns: 1fr;
`;

const InfoStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 4fr 2fr 5fr;
  grid-template-areas: 'icon name counter bar';
`;

const IconStyled = styled.div`
  grid-area: icon;

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
  margin-left: 20px;
  margin-top: 20px;
  border-top: 1px solid lightgray;

  ${({ showItems }) =>
    showItems &&
    css`
      display: flex;
    `}
`;

const List = ({ name, items }) => {
  const initCounter = items.filter((item) => item.done).length;
  const [counter, setCounter] = useState(initCounter);
  const [listItems, setListItems] = useState(items);
  const [showItems, setShowItems] = useState(false);

  const handleClickItem = (id) => {
    const changedItems = listItems.map((item) => {
      if (item.id !== id) {
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

  const handleShowItems = () => {
    setShowItems(!showItems);
  };

  return (
    <ListStyled>
      <InfoStyled onClick={handleShowItems}>
        <IconStyled showItems={showItems}>
          <ArrowIcon />
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
          {listItems.map(({ id, description, done }) => (
            <Item
              id={id}
              description={description}
              done={done}
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
  name: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
};

export default List;
