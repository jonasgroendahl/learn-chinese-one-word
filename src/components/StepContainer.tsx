import React from 'react';
import {Div, Text} from 'react-native-magnus';

type Props = {
  label: string;
};

const StepContainer: React.FC<Props> = ({label, children}) => {
  return (
    <Div mt={20}>
      <Text fontSize="2xl" color="gray500" textAlign="center">
        {label}
      </Text>
      {children}
    </Div>
  );
};

export default StepContainer;
