import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import WordDetails from '../screens/WordDetails';
import LearnWord from '../screens/LearnWord';
import {Button, Icon} from 'react-native-magnus';

export type WordStackProps = {
  WordDetails: {
    date: string;
  };
  LearnWord: {
    translation: string;
    word: string;
  };
};

const Stack = createStackNavigator<WordStackProps>();

const WordStack = () => {
  return (
    <Stack.Navigator screenOptions={{title: ''}}>
      <Stack.Screen
        name="WordDetails"
        component={WordDetails}
        options={() => {
          return {
            headerLeft: ({onPress}) => (
              <Button bg="transparent" onPress={onPress}>
                <Icon fontSize="2xl" color="black" name="close" />
              </Button>
            ),
          };
        }}
      />
      <Stack.Screen name="LearnWord" component={LearnWord} />
    </Stack.Navigator>
  );
};

export default WordStack;
