import React from 'react';
import {Button as MagnusButton, ButtonProps} from 'react-native-magnus';

const Button: React.FC<ButtonProps> = ({children, ...props}) => {
  return (
    <MagnusButton px="xl" py="lg" bg="red500" {...props}>
      {children}
    </MagnusButton>
  );
};

export default Button;
