import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';
import { v4 as uuidv4 } from 'uuid';
import { connect } from 'react-redux';
import InputText from 'components/inputs/Text';
import Button from 'components/buttons/Button';
import ItemForm from 'components/create/ItemForm';
import ErrorMessage from 'components/utilities/ErrorMessage';

const FormWrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
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

const Form = ({ isFetching, isError, createAction }) => {
  const [name, setName] = useState('');
  const [items, setItems] = useState([]);
  const { handleSubmit } = useForm();

  const handleChange = ({ value }) => setName(value);
  const handleAddItem = () => {
    const newItem = { name: '', id: uuidv4(), done: false };
    setItems((prev) => [...prev, newItem]);
  };
  const handleChangeItem = ({ index, description }) => {
    const temp = items;
    const updatedItem = Object.assign(items[index], { description });
    temp.splice(index, 1, updatedItem);
    setItems(temp);
  };

  const handleDeleteItem = ({ index }) => {
    const temp = items;
    temp.splice(index, 1);
    setItems([...temp]);
  };

  const onSubmit = async () => {
    await createAction({ name, done: false, items });
  };

  return (
    <>
      {isError && <ErrorMessage text="Blad" />}
      <FormWrapperStyled>
        <FormStyled onSubmit={handleSubmit(onSubmit)}>
          <InputText name="name" label="Name" changeValue={handleChange} />
          <ButtonsWrapperStyled>
            <Button text="Save" type="submit" success isFetching={isFetching} />
            <Button text="New item" type="button" onClick={handleAddItem} />
          </ButtonsWrapperStyled>
          <ItemsFormWrapperStyled>
            {items.map(({ name: itemName, id: itemId }, index) => (
              <ItemForm
                index={index}
                onChange={handleChangeItem}
                onDelete={handleDeleteItem}
                key={`form-item-${itemId}`}
                initValue={itemName}
              />
            ))}
          </ItemsFormWrapperStyled>
        </FormStyled>
      </FormWrapperStyled>
    </>
  );
};

Form.propTypes = {
  isFetching: PropTypes.bool,
  isError: PropTypes.bool,
  createAction: PropTypes.func.isRequired,
};

Form.defaultProps = {
  isFetching: false,
  isError: false,
};

const mapStateToProps = (state) => {
  return {
    isFetching: state.auth.isFetching,
    isError: state.auth.isError,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    createAction: ({ name, done, items }) =>
      dispatch({ type: 'CREATE_LIST', payload: { name, done, items } }),
    createItemAction: ({ description, done, items }) =>
      dispatch({ type: 'CREATE_LIST_ITEM', payload: { description, done, items } }),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Form);
