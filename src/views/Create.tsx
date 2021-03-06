import React from 'react';
import { useParams } from 'react-router-dom';
import MainTemplate from 'layout/MainTemplate';
import Form from 'components/create/Form';
import ErrorMessage from 'components/utilities/ErrorMessage';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
const Create = () => {
  const { id } = useParams();

  return (
    <MainTemplate>
      <>
        <ErrorMessage />
        <Form id={id} />
      </>
    </MainTemplate>
  );
};

export default Create;
