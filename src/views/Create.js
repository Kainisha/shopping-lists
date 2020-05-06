import React from 'react';
import { useParams } from 'react-router-dom';

const New = () => {
  const { id } = useParams();

  return <div>new item {id}</div>;
};

export default New;
