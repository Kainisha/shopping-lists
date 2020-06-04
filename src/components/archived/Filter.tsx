import React, { useState, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import TextInput from 'components/inputs/Text';
import IconButton from 'components/buttons/IconButton';

const FilterWrapperStyled = styled.div`
  padding: 1rem;
  border: 2px solid lightgray;
  display: flex;
  align-items: center;
  margin-bottom: 2rem;
`;

interface OnFilter {
  name: string;
}

interface FilterProps {
  onFilter: ({ name }: OnFilter) => void;
}

const Filter: FunctionComponent<FilterProps> = ({ onFilter }) => {
  const [name, setName] = useState('');

  const handleChangeValue = (input: { value: string }) => setName(input.value);

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
