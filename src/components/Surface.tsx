import React from 'react';
import {Div} from 'react-native-magnus';

const Surface: React.FC = ({children}) => {
  return (
    <Div bg="white" p={'lg'} rounded="md" shadow="sm">
      {children}
    </Div>
  );
};

export default Surface;
