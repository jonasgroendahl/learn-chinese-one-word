import React, {useEffect, useState} from 'react';
import {Div, Input, Text} from 'react-native-magnus';
import Button from '../Button';

type Props = {
  correctWord: string;
  onChange: () => void;
  keyword?: string;
};

const Step: React.FC<Props> = ({onChange, correctWord, keyword}) => {
  const [value, setValue] = useState('');

  return (
    <Div mt={30}>
      <Div mb={30}>
        {keyword ? (
          <Text fontSize="lg" mb={30} fontWeight="bold" textAlign="center">
            {keyword}
          </Text>
        ) : null}
      </Div>
      <Div px={'lg'}>
        <Input
          focusBorderColor="blue700"
          autoFocus={true}
          placeholder="Word"
          borderColor="#eee"
          borderWidth={1}
          rounded={'lg'}
          value={value}
          onChangeText={(newValue) => setValue(newValue)}
        />
      </Div>
      <Div my={20} row justifyContent="center">
        <Button onPress={onChange} disabled={value !== correctWord}>
          Next
        </Button>
      </Div>
    </Div>
  );
};

export default Step;
