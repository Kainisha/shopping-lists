import React, { useEffect, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import MainTemplate from 'layout/MainTemplate';
import Wrapper from 'components/list/Wrapper';
import Filter from 'components/archived/Filter';

import { getLists } from 'actions';

interface Item {
  id: number;
  description: string;
  done: boolean;
}

interface List {
  name: string;
  id: number;
  done: boolean;
  // eslint-disable-next-line camelcase
  shopping_list_items: Array<Item>;
}

interface GetListsAction {
  filters: string;
}

interface ArchivedProps {
  getListsAction: ({ filters }: GetListsAction) => void;
  shoppingLists: List[];
}

const Archived: FunctionComponent<ArchivedProps> = ({ getListsAction, shoppingLists }) => {
  useEffect(() => {
    const filtersParams = new URLSearchParams();
    filtersParams.append('done', 'true');
    filtersParams.append('_sort', 'id:DESC');
    getListsAction({ filters: filtersParams.toString() });
  }, []);

  const handleFilter = (filters: { name: string }) => {
    const filtersParams = new URLSearchParams();
    filtersParams.append('done', 'true');
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
      <>
        <Filter onFilter={handleFilter} />
        <Wrapper lists={shoppingLists} archived />
      </>
    </MainTemplate>
  );
};

Archived.propTypes = {
  getListsAction: PropTypes.func.isRequired,
  shoppingLists: PropTypes.array.isRequired,
};

interface MapStateToProps {
  shoppingLists: { lists: List[] };
}

const mapStateToProps = (state: MapStateToProps) => {
  return {
    shoppingLists: state.shoppingLists.lists,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    getListsAction: ({ filters }: GetListsAction) => dispatch(getLists({ filters })),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Archived);
