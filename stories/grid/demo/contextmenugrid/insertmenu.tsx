import React, { useRef, useState, useEffect } from 'react';
import { InputNumber } from 'antd';

const InsertMenu = ({ title, desc, onChange }: any) => {
  const onClick = (event) => {
    event.stopPropagation();
  };

  return (
    <div key={title}>
      <span>{title}</span>
      <span onClick={onClick}>
        <InputNumber
          size="small"
          style={{ width: '60px', margin: '0 5px' }}
          onChange={onChange}
          defaultValue={1}
          precision={0}
          min={1}
          max={100}
        />
      </span>
      <span>{desc}</span>
    </div>
  );
};

export default InsertMenu;