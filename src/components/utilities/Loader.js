import React from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes, css } from 'styled-components';
import CachedIcon from '@material-ui/icons/Cached';

const rotate = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(-360deg);
    }
`;

const LoaderStyled = styled.div`
  display: flex;
  justify-content: center;

  svg {
    animation: ${rotate} 1s linear infinite;

    ${({ big }) =>
      big &&
      css`
        font-size: 70px;
      `}
  }
`;

const Loader = ({ big }) => (
  <LoaderStyled big={big}>
    <CachedIcon />
  </LoaderStyled>
);

Loader.propTypes = {
  big: PropTypes.bool,
};

Loader.defaultProps = {
  big: false,
};

export default Loader;
