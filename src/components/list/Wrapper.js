import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import List from 'components/list/List';
import Loader from 'components/utilities/Loader';
import ErrorMessage from 'components/utilities/ErrorMessage';
import Filter from 'components/archived/Filter';

const WrapperStyled = styled.div`
  display: flex;
  flex-direction: column;
`;

const Wrapper = ({ lists, isFetching, isError, archived, onFilter }) => {
  const handleFilter = (filters) => onFilter(filters);

  return (
    <>
      {isFetching && <Loader big />}
      {archived && <Filter onFilter={handleFilter} />}
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
      {isError && <ErrorMessage text="Error appeared during fething shopping lists" />}
    </>
  );
};

Wrapper.propTypes = {
  lists: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  archived: PropTypes.bool,
  onFilter: PropTypes.func,
};

Wrapper.defaultProps = {
  isFetching: false,
  isError: false,
  archived: false,
  onFilter: () => {},
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isError: state.auth.isError,
  };
};

export default connect(mapStateToProps)(Wrapper);
