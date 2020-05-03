import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import ErrorIcon from '@material-ui/icons/Error';

const ErrorMessageStyled = styled.div`
  border: 1px solid ${({ theme }) => theme.errorColorHover};
  background-color: ${({ theme }) => theme.errorColor};
  color: white;
  padding: 10px;
  border-radius: 10px;
  display: flex;
  align-items: center;
`;

const TextStyled = styled.span`
  margin-left: 10px;
`;

const ErrorMessage = ({ text }) => (
  <ErrorMessageStyled>
    <ErrorIcon />
    <TextStyled>{text}</TextStyled>
  </ErrorMessageStyled>
);

ErrorMessage.propTypes = {
  text: PropTypes.string.isRequired,
};

export default ErrorMessage;
