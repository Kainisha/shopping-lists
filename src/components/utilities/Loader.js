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
  height: 100%;
  width: 100%;
  position: relative;
  z-index: 10;
  background: rgba(0, 0, 0, 0.15);
  position: absolute;
  top: 0;
  left: 0;
  align-items: center;

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
