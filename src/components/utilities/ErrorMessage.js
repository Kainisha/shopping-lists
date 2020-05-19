import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';
import { connect } from 'react-redux';

const errorShow = keyframes`
    to {
        opacity: 1;
    }
`;

const ErrorWrapperStyled = styled.div`
  height: ${({ height }) => height};
  margin: 1rem 0;
`;

const ErrorMessageStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.errorColorHover};
  background-color: ${({ theme }) => theme.errorColor};
  color: white;
  font-weight: 600;
  padding: 5px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  box-shadow: 0 5px 5px lightgrey;
  opacity: 0;
  transform-origin: top;
  animation: ${errorShow} 300ms linear forwards;

  svg {
    font-size: 20px;
  }
`;

const TextStyled = styled.span`
  margin-left: 10px;
`;

const ErrorMessage = ({ errorText, isError, height }) => (
  <ErrorWrapperStyled height={height}>
    {isError && (
      <ErrorMessageStyled>
        <ErrorIcon />
        <TextStyled>{errorText}</TextStyled>
      </ErrorMessageStyled>
    )}
  </ErrorWrapperStyled>
);

ErrorMessage.propTypes = {
  errorText: PropTypes.string,
  isError: PropTypes.bool,
  height: PropTypes.string,
};

ErrorMessage.defaultProps = {
  errorText: '',
  isError: false,
  height: 'auto',
};

const mapStateToProps = (state) => {
  return {
    isError: state.auth.isError,
    errorText: state.auth.errorText,
  };
};

export default connect(mapStateToProps)(ErrorMessage);
