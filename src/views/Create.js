import React from 'react';
// import { useParams } from 'react-router-dom';
import MainTemplate from 'layout/MainTemplate';
import Form from 'components/create/Form';

const Create = () => {
  // const { id } = useParams();

  return (
    <MainTemplate>
      <Form />
    </MainTemplate>
  );
};

export default Create;
