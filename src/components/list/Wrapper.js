import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import List from 'components/list/List';
import Loader from 'components/utilities/Loader';
import ErrorMessage from 'components/utilities/ErrorMessage';

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = ({ lists, archived }) => {
  return (
    <>
      <Loader big />
      <ErrorMessage />
      <WrapperStyled>
        {lists.map(({ id, name, shopping_list_items: items, done }) => (
          <List
            name={name}
            items={items}
            done={done}
            id={id}
            key={`list-${id}`}
            archived={archived}
          />
        ))}
      </WrapperStyled>
    </>
  );
};

Wrapper.propTypes = {
  lists: PropTypes.array.isRequired,
  archived: PropTypes.bool,
};

Wrapper.defaultProps = {
  archived: false,
};

export default Wrapper;
