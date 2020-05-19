import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import List from 'components/list/List';
import Loader from 'components/utilities/Loader';
import ErrorMessage from 'components/utilities/ErrorMessage';

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = ({ lists, isFetching, archived }) => {
  return (
    <>
      {isFetching && <Loader big />}
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
  isFetching: PropTypes.bool,
  archived: PropTypes.bool,
};

Wrapper.defaultProps = {
  isFetching: false,
  archived: false,
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isError: state.auth.isError,
  };
};

export default connect(mapStateToProps)(Wrapper);
