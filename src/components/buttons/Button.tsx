import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled, { css, keyframes } from 'styled-components';
import CachedIcon from '@material-ui/icons/Cached';

interface ButtonProps extends React.HTMLProps<HTMLButtonElement> {
  success: boolean | undefined;
  error: boolean | undefined;
}

const ButtonStyled = styled.button<ButtonProps>`
  width: 9rem;
  height: 2rem;
  transition: background-color 300ms ease-in-out;
  border: 2px solid ${({ theme }) => theme.mainColorHover};
  background-color: ${({ theme }) => theme.mainColor};
  border-radius: 5px;
  text-weight: 600;
  font-size: 16px;
  box-shadow: 0 4px 4px lightgray;

  &:hover {
    background-color: ${({ theme }) => theme.mainColorHover};
  }

  &:disabled {
    background-color: lightgray;
    border-color: darkgray;
  }

  ${({ success }) =>
    success &&
    css`
      border-color: ${({ theme }) => theme.successColorHover};
      background-color: ${({ theme }) => theme.successColor};

      &:hover {
        background-color: ${({ theme }) => theme.successColorHover};
      }
    `}

  ${({ error }) =>
    error &&
    css`
      border-color: ${({ theme }) => theme.errorColorHover};
      background-color: ${({ theme }) => theme.errorColor};

      &:hover {
        background-color: ${({ theme }) => theme.errorColorHover};
      }
    `}
`;

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(-360deg);
    }
`;

const IconWrapper = styled.span`
  svg {
    animation: ${rotate} 1s linear infinite;
  }
`;

type Props = {
  text: string;
  success?: boolean | undefined;
  error?: boolean | undefined;
  onClick: () => void;
  isFetching?: boolean | undefined;
  disabled?: boolean;
  submit?: boolean | undefined;
};

const Button: FunctionComponent<Props> = ({
  text,
  success,
  error,
  onClick,
  isFetching,
  disabled,
  submit,
}) => {
  const handleClick = () => onClick();

  return (
    <>
      {submit ? (
        <ButtonStyled
          onClick={handleClick}
          className=""
          error={error}
          success={success}
          disabled={disabled}
          type="submit"
        >
          {isFetching ? (
            <IconWrapper>
              <CachedIcon />
            </IconWrapper>
          ) : (
            <span>{text}</span>
          )}
        </ButtonStyled>
      ) : (
        <ButtonStyled
          onClick={handleClick}
          className=""
          error={error}
          success={success}
          disabled={disabled}
          type="button"
        >
          {isFetching ? (
            <IconWrapper>
              <CachedIcon />
            </IconWrapper>
          ) : (
            <span>{text}</span>
          )}
        </ButtonStyled>
      )}
    </>
  );
};

Button.propTypes = {
  text: PropTypes.string.isRequired,
  success: PropTypes.bool,
  error: PropTypes.bool,
  onClick: PropTypes.func.isRequired,
  isFetching: PropTypes.bool,
  disabled: PropTypes.bool,
  submit: PropTypes.bool,
};

Button.defaultProps = {
  success: false,
  error: false,
  isFetching: false,
  disabled: false,
  submit: false,
};

export default Button;