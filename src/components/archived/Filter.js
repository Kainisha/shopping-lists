import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/inputs/Text';
import IconButton from 'components/buttons/IconButton';

const FilterWrapperStyled = styled.div`
  padding: 1rem;
  border: 1px solid lightgray;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

const Filter = ({ onFilter }) => {
  const [name, setName] = useState('');

  const handleChangeValue = (value) => {
    setName(value.value);
  };

  const handleFilter = () => {
    const filters = {
      name,
    };

    onFilter(filters);
  };

  return (
    <FilterWrapperStyled>
      <TextInput name="filter" label="Filter" changeValue={handleChangeValue} />
      <IconButton icon="search" onClick={handleFilter} />
    </FilterWrapperStyled>
  );
};

Filter.propTypes = {
  onFilter: PropTypes.func.isRequired,
};

export default Filter;
