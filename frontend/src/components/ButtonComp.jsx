import React from 'react';
import Button from '@mui/material/Button';

const ButtonComp = ({ text, img }) => {
  // console.log(isActive, text);

  return (
    <Button
      variant="text"
      className='w-full hover:bg-gray-500 rounded-none h-10'
      startIcon={<img src={img} alt="icon" className="w-5 h-5" />}
    >
      <span className="ml-auto">{text}</span>
    </Button>
  );
};

export default ButtonComp;
