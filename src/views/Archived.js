import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import MainTemplate from 'layout/MainTemplate';
import Wrapper from 'components/list/Wrapper';

import { GET_LISTS } from 'actions';

const Archived = ({ getListsAction, shoppingLists }) => {
  useEffect(() => {
    const filtersParams = new URLSearchParams();
    filtersParams.append('done', true);
    filtersParams.append('_sort', 'id:DESC');
    getListsAction({ filters: filtersParams.toString() });
  }, []);

  const handleFilter = (filters) => {
    const filtersParams = new URLSearchParams();
    filtersParams.append('done', true);
    filtersParams.append('_sort', 'id:DESC');

    // eslint-disable-next-line no-restricted-syntax
    for (const [key, value] of Object.entries(filters)) {
      if (value.trim() === '') {
        // eslint-disable-next-line no-continue
        continue;
      }
      filtersParams.append(`${key}_contains`, value);
    }

    getListsAction({ filters: filtersParams.toString() });
  };

  return (
    <MainTemplate>
      <Wrapper lists={shoppingLists} onFilter={handleFilter} archived />
    </MainTemplate>
  );
};

Archived.propTypes = {
  getListsAction: PropTypes.func,
  shoppingLists: PropTypes.array,
};

Archived.defaultProps = {
  getListsAction: () => {},
  shoppingLists: [],
};

const mapStateToProps = (state) => {
  return {
    shoppingLists: state.shoppingLists.lists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getListsAction: ({ filters }) => dispatch({ type: GET_LISTS, payload: { filters } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archived);
