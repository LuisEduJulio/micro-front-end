import React from 'react';
import Table from './components/tableList/index.jsx';

export default (props) => {
  return (
    <div>
      <Table {...props.pokemon} />
    </div>
  );
}