import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import MainTemplate from 'layout/MainTemplate';
import { connect } from 'react-redux';
import Wrapper from 'components/list/Wrapper';

const List = ({ getListsAction, shoppingLists }) => {
  useEffect(() => {
    getListsAction();
  }, []);

  return (
    <MainTemplate>
      <>
        <Wrapper lists={shoppingLists} />
      </>
    </MainTemplate>
  );
};

List.propTypes = {
  getListsAction: PropTypes.func,
  shoppingLists: PropTypes.array,
};

List.defaultProps = {
  getListsAction: () => {},
  shoppingLists: [],
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isError: state.auth.isError,
    shoppingLists: state.shoppingLists.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListsAction: () => dispatch({ type: 'GET_LISTS' }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(List);
