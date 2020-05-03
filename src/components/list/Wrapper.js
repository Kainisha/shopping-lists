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

const Wrapper = ({ lists, isFetching, isError }) => {
  return (
    <>
      {isFetching ? (
        <Loader big />
      ) : (
        <WrapperStyled>
          {lists.map(({ id, name, shopping_list_items: items }) => (
            <List name={name} items={items} key={`list-${id}`} />
          ))}
        </WrapperStyled>
      )}
      {isError && <ErrorMessage text="Error appeared during fething shopping lists" />}
    </>
  );
};

Wrapper.propTypes = {
  lists: PropTypes.array.isRequired,
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
};

Wrapper.defaultProps = {
  isFetching: false,
  isError: false,
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isError: state.auth.isError,
  };
};

export default connect(mapStateToProps)(Wrapper);
