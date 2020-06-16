import React, { FunctionComponent, ReactNode, ReactNodeArray } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import Header from 'components/header/Header';

const PageContentStyled = styled.div`
  padding: 1rem;
`;

type MainTemplateProps = {
  children: ReactNode | ReactNodeArray;
};

const MainTemplate: FunctionComponent<MainTemplateProps> = ({ children }) => (
  <>
    <Header />
    <PageContentStyled>{children}</PageContentStyled>
  </>
);

MainTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default MainTemplate;
