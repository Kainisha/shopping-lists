/* eslint-disable react/require-default-props */
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import InputText from 'components/inputs/Text';
import Button from 'components/buttons/Button';
import ItemForm from 'components/create/ItemForm';
import ErrorMessage from 'components/utilities/ErrorMessage';

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

const Form = ({
  id,
  shoppingList,
  isFetching,
  isError,
  createAction,
  getListsAction,
  updateAllAction,
}) => {
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const { handleSubmit } = useForm();
  const [deletedItems, setDeletedItems] = useState([]);

  const isNew = () => id === null;

  const getList = async () => {
    // eslint-disable-next-line radix
    if (shoppingList.id === parseInt(id)) {
      return;
    }
    await getListsAction({ id, filters: '' });
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

  const handleChange = ({ value }) => setName(value);

  const handleAddItem = () => {
    const newItem = { name: '', id: uuidv4(), done: false };
    setItems((prev) => [...prev, newItem]);
  };

  const handleChangeItem = ({ id: itemId, description }) => {
    const temp = items;
    const index = temp.findIndex((item) => item.id === itemId);
    const updatedItem = Object.assign(items[index], { description, changed: true });
    temp.splice(index, 1, updatedItem);
    setItems(temp);
  };

  const handleDeleteItem = ({ id: itemId }) => {
    const temp = items;
    const index = items.findIndex((item) => item.id === itemId);
    temp.splice(index, 1);
    setItems([...temp]);
    setDeletedItems((prev) => [...prev, itemId]);
  };

  const onSubmit = async () => {
    if (isNew()) {
      await createAction({ name, done: false, items });
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
      {isError && <ErrorMessage text="Blad" />}
      <FormWrapperStyled>
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
          <InputText name="name" label="Name" initValue={name} changeValue={handleChange} />
          <ButtonsWrapperStyled>
            <Button text="New item" type="button" onClick={handleAddItem} />
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
              type="submit"
              success
              isFetching={isFetching}
              disabled={disabledSubmit()}
            />
          </ButtonsWrapperStyled>
        </FormStyled>
      </FormWrapperStyled>
    </>
  );
};

Form.propTypes = {
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  createAction: PropTypes.func.isRequired,
  id: PropTypes.string,
  getListsAction: PropTypes.func.isRequired,
  updateAllAction: PropTypes.func.isRequired,
  shoppingList: PropTypes.object,
};

Form.defaultProps = {
  isFetching: false,
  isError: false,
  id: null,
  shoppingList: {},
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isError: state.auth.isError,
    shoppingList: state.shoppingLists.list,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAction: ({ name, done, items }) =>
      dispatch({ type: CREATE_LIST, payload: { name, done, items } }),
    getListsAction: ({ filters, id }) => dispatch({ type: GET_LISTS, payload: { filters, id } }),
    updateAllAction: ({ id, name, newItems, deletedItems, changedItems }) =>
      dispatch({ type: UPDATE_ALL, payload: { id, name, newItems, deletedItems, changedItems } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
