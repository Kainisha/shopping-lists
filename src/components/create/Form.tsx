/* eslint-disable react/require-default-props */
import React, { useState, useEffect, FunctionComponent } from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { Dispatch } from 'redux';
import { connect } from 'react-redux';
import InputText from 'components/inputs/Text';
import Button from 'components/buttons/Button';
import ItemForm from 'components/create/ItemForm';

import { CREATE_LIST, GET_LISTS, UPDATE_ALL } from 'actions';

const FormWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;

  @media (min-width: 768px) {
    grid-template-columns: 2fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: repeat(2, 1fr);
  }
`;

const FormStyled = styled.form``;

const ButtonsWrapperStyled = styled.div`
  margin: 2rem 0;
  display: flex;
  align-items: center;
`;

const ItemsFormWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-row-gap: 1rem;
`;

interface Item {
  id: string;
  description: string;
  done: boolean;
  changed?: boolean;
}

interface List {
  id: number;
  name: string;
  // eslint-disable-next-line camelcase
  shopping_list_items: Array<Item>;
  done: boolean;
}

interface GetListsAction {
  id: string;
  filters: string;
}

interface CreateAction {
  name: string;
  done: boolean;
  items: Array<Item>;
}

interface UpdateAllAction {
  id: string | null;
  name: string;
  newItems: Item[];
  deletedItems: string[];
  changedItems: Item[];
}

type FormProps = {
  id: string | null;
  shoppingList: List | undefined;
  isFetching: boolean | undefined;
  createAction: ({ name, done, items }: CreateAction) => void;
  getListsAction: ({ id, filters }: GetListsAction) => void;
  updateAllAction: ({ id, name, newItems, deletedItems, changedItems }: UpdateAllAction) => void;
};

type HandleChangeItem = {
  id: string;
  description: string;
};

type HandleDeleteItem = {
  id: string;
};

const Form: FunctionComponent<FormProps> = ({
  id,
  shoppingList,
  isFetching,
  createAction,
  getListsAction,
  updateAllAction,
}) => {
  const [name, setName] = useState('');
  const [items, setItems] = useState<Item[]>([]);
  const { handleSubmit } = useForm();
  const [deletedItems, setDeletedItems] = useState<string[]>([]);

  const isNew = () => id === null;

  const getList = () => {
    // eslint-disable-next-line radix
    if (id === null || !shoppingList || shoppingList.id === parseInt(id)) {
      return;
    }
    getListsAction({ id, filters: '' });
  };

  useEffect(() => {
    if (isNew()) {
      return;
    }

    getList();

    if (typeof shoppingList === 'undefined' || Object.keys(shoppingList).length === 0) {
      return;
    }

    const { name: initName, shopping_list_items: initItems } = shoppingList;

    setName(initName);
    setItems(initItems);
  }, [id, shoppingList]);

  const handleChange = ({ value }: { value: string }) => setName(value);

  const handleAddItem = () => {
    const newItem: Item = { description: '', id: uuidv4(), done: false };
    setItems((prev) => [...prev, newItem]);
  };

  const handleChangeItem = ({ id: itemId, description }: HandleChangeItem) => {
    const temp = items;
    const index = temp.findIndex((item) => item.id === itemId);
    const updatedItem = Object.assign(items[index], { description, changed: true });
    temp.splice(index, 1, updatedItem);
    setItems(temp);
  };

  const handleDeleteItem = ({ id: itemId }: HandleDeleteItem) => {
    const temp = items;
    const index = items.findIndex((item) => item.id === itemId);
    temp.splice(index, 1);
    setItems([...temp]);
    setDeletedItems((prev) => [...prev, itemId]);
  };

  const onSubmit = async () => {
    if (isNew()) {
      createAction({ name, done: false, items });
      return;
    }

    if (!shoppingList) {
      return;
    }

    const { shopping_list_items: initItems } = shoppingList;

    const initItemsIds = initItems.map((item) => item.id);
    const newItems = items.filter((item) => !initItemsIds.includes(item.id));
    const changedItems = items.filter((item) => item.changed && initItemsIds.includes(item.id));
    updateAllAction({ id, name, newItems, deletedItems, changedItems });
  };

  const disabledSubmit = () => items.length === 0;

  return (
    <>
      <FormWrapperStyled>
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
          <InputText name="name" label="Name" initValue={name} changeValue={handleChange} />
          <ButtonsWrapperStyled>
            <Button text="New item" onClick={handleAddItem} />
          </ButtonsWrapperStyled>
          <ItemsFormWrapperStyled>
            {items.map(({ description, id: itemId }) => (
              <ItemForm
                onChange={handleChangeItem}
                onDelete={handleDeleteItem}
                key={`form-item-${itemId}`}
                initValue={description}
                id={itemId}
              />
            ))}
          </ItemsFormWrapperStyled>
          <ButtonsWrapperStyled>
            <Button
              text="Save"
              success
              isFetching={isFetching}
              submit
              onClick={() => null}
              disabled={disabledSubmit()}
            />
          </ButtonsWrapperStyled>
        </FormStyled>
      </FormWrapperStyled>
    </>
  );
};

interface MapStateToProps {
  auth: { isFetching: boolean };
  shoppingLists: { list: List };
}

const mapStateToProps = (state: MapStateToProps) => {
  return {
    isFetching: state.auth.isFetching,
    shoppingList: state.shoppingLists.list,
  };
};

const mapDispatchToProps = (dispatch: Dispatch) => {
  return {
    createAction: ({ name, done, items }: CreateAction) =>
      dispatch({ type: CREATE_LIST, payload: { name, done, items } }),
    getListsAction: ({ filters, id }: GetListsAction) =>
      dispatch({ type: GET_LISTS, payload: { filters, id } }),
    updateAllAction: ({ id, name, newItems, deletedItems, changedItems }: UpdateAllAction) =>
      dispatch({ type: UPDATE_ALL, payload: { id, name, newItems, deletedItems, changedItems } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
