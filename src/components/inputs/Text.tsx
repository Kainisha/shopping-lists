import React, { useState, useEffect, FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css } from 'styled-components';

interface Wrapper {
  rowGap: boolean | undefined;
}

const WrapperStyled = styled.div<Wrapper>`
  position: relative;
  height: 40px;
  overflow: hidden;
  width: 100%;

  ${({ rowGap }) =>
    rowGap &&
    css`
      margin-top: 1rem;
      margin-bottom: 1rem;
    `}
`;

interface Input {
  autocomplete: string | undefined;
}

const InputStyled = styled.input<Input>`
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

interface TextProps {
  name: string;
  label: string;
  rowGap?: boolean | undefined;
  password?: boolean | undefined;
  changeValue: ({ name, value }: { name: string; value: string }) => void;
  initValue?: string | undefined;
  autocomplete?: string | undefined;
}

const Text: FunctionComponent<TextProps> = ({
  name,
  label,
  rowGap,
  password,
  changeValue,
  initValue,
  autocomplete,
}) => {
  const [value, setValue] = useState(initValue);

  useEffect(() => {
    setValue(initValue);
  }, [initValue]);

  type Change = {
    target: { value: string };
  };

  const handleChange = ({ target }: Change) => {
    const { value: targetValue } = target;
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
