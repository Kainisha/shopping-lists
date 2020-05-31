import React, { FunctionComponent } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const WrapperStyled = styled.div`
  display: grid;
  grid-template-columns: 50px 300px;
  grid-column-end: 10px;
  align-items: center;
`;

const SliderStyled = styled.div`
  position: relative;
  height: 10px;
  width: 270px;
  background: ${({ theme }) => theme.defaultColor};
`;

const TextStyled = styled.div`
  display: flex;
  align-items: center;
  color: gray;
`;

interface Bar {
  barWidth: number;
  counter: number;
}

const BarStyled = styled.div<Bar>`
  position: absolute;
  top: 0;
  left: 0;
  transition: transform 300ms ease-in-out;
  width: 270px;
  transform: scaleX(${({ barWidth, counter }) => barWidth * counter});
  transform-origin: left;
  height: 100%;
  background: ${({ theme }) => theme.successColor};
`;

type Props = {
  all: number;
  counter: number;
};

const Bar: FunctionComponent<Props> = ({ all, counter }) => {
  const computePercent = () => {
    const percent = all !== 0 ? Math.round((counter / all) * 100) : 0;
    return `${percent} %`;
  };

  const computeWidth = () => {
    return all === 0 ? 0 : 1 / all;
  };

  return (
    <WrapperStyled>
      <TextStyled>{computePercent()}</TextStyled>
      <SliderStyled>
        <BarStyled barWidth={computeWidth()} counter={counter} />
      </SliderStyled>
    </WrapperStyled>
  );
};

Bar.propTypes = {
  all: PropTypes.number.isRequired,
  counter: PropTypes.number.isRequired,
};

export default Bar;
