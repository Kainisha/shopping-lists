import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

const WrapperStyled = styled.div`
  position: relative;
  height: 40px;
  overflow: hidden;

  ${({ rowGap }) =>
    rowGap &&
    css`
      margin-top: 1rem;
      margin-bottom: 1rem;
    `}
`;

const InputStyled = styled.input`
  border-left: 0;
  border-right: 0;
  border-top: 0;
  border-bottom: 0;
  outline: 0;
  width: 100%;
  position: absolute;
  bottom: 0;
  left: 0;
  font-size: 16px;

  &:focus,
  &:valid {
    border-bottom-color: lightgray;

    + label span {
      transform: translateY(-100%) scale(0.5);
    }

    + label {
      border-bottom: 0;
    }

    + label:after {
      opacity: 1;
      transform: translateX(0);
    }
  }
`;

const LabelStyled = styled.label`
  position: absolute;
  bottom: 0;
  left: 0;
  transition: transform 300ms ease-in-out;
  transform-origin: left;
  text-align: left;
  pointer-events: none;
  border-bottom: 1px solid lightgray;
  height: 100%;
  width: 100%;

  &:after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-bottom: 2px solid ${({ theme }) => theme.mainColorHover};
    transition: transform 300ms ease-in-out;
    transform: translateX(-100%);
    opacity: 0;
  }
`;

const LabelSpanStyled = styled.span`
  position: absolute;
  bottom: 0;
  left: 0;
  transition: transform 300ms ease-in-out;
  transform-origin: left;
  text-align: left;
  pointer-events: none;
  color: gray;
`;

const Text = ({ name, label, rowGap, password, changeValue, initValue, autocomplete }) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  const handleChange = (e) => {
    const { value: targetValue } = e.target;
    setValue(targetValue);
    changeValue({ name, value: targetValue });
  };

  const inputType = password ? 'password' : 'text';

  return (
    <WrapperStyled rowGap={rowGap}>
      <InputStyled
        type={inputType}
        value={value}
        name={name}
        required
        onChange={handleChange}
        autocomplete={autocomplete}
      />
      <LabelStyled>
        <LabelSpanStyled>{label}</LabelSpanStyled>
      </LabelStyled>
    </WrapperStyled>
  );
};

Text.propTypes = {
  name: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  rowGap: PropTypes.bool,
  password: PropTypes.bool,
  changeValue: PropTypes.func.isRequired,
  initValue: PropTypes.string,
  autocomplete: PropTypes.string,
};

Text.defaultProps = {
  rowGap: false,
  password: false,
  initValue: '',
  autocomplete: 'off',
};

export default Text;
