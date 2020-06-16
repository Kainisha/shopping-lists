import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import TextInput from 'components/inputs/Text';
import IconButton from 'components/buttons/IconButton';

const opacity = keyframes`
  to {
    opacity: 1;
  }
`;

const ItemFormStyled = styled.div`
  display: grid;
  grid-template-columns: 1fr 2rem;
  grid-column-gap: 2rem;
  align-items: center;
  opacity: 0;
  animation: ${opacity} 300ms linear forwards;
`;

interface OnChange {
  id: string;
  description: string;
}

interface OnDelete {
  id: string;
}

interface ItemFormProps {
  onChange: ({ id, description }: OnChange) => void;
  onDelete: ({ id }: OnDelete) => void;
  id: string;
  initValue: string | undefined;
}

const ItemForm: FunctionComponent<ItemFormProps> = ({ onChange, onDelete, id, initValue }) => {
  const handleChange = ({ value }: { value: string }) => onChange({ id, description: value });
  const handleDelete = () => onDelete({ id });

  return (
    <ItemFormStyled>
      <TextInput
        name="item-description"
        label="Description"
        changeValue={handleChange}
        initValue={initValue}
      />
      <IconButton icon="remove" error onClick={handleDelete} sm />
    </ItemFormStyled>
  );
};

ItemForm.propTypes = {
  onChange: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  id: PropTypes.oneOfType([PropTypes.string]).isRequired,
  initValue: PropTypes.string,
};

ItemForm.defaultProps = {
  initValue: '',
};

export default ItemForm;
