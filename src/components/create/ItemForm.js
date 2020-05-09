import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/inputs/Text';
import IconButton from 'components/buttons/IconButton';

const ItemFormStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem;
  grid-column-gap: 2rem;
  align-items: center;
`;

const ItemForm = ({ onChange, onDelete, index, initValue }) => {
  const handleChange = ({ value }) => onChange({ index, description: value });
  const handleDelete = () => onDelete({ index });

  return (
    <ItemFormStyled>
      <TextInput
        name="item-description"
        label="Description"
        changeValue={handleChange}
        initValue={initValue}
      />
      <IconButton icon="remove" error onClick={handleDelete} />
    </ItemFormStyled>
  );
};

ItemForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  index: PropTypes.number.isRequired,
  initValue: PropTypes.string,
};

ItemForm.defaultProps = {
  initValue: '',
};

export default ItemForm;
