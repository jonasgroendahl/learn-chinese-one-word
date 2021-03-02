import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {TouchableOpacity} from 'react-native';
import {Div, Text} from 'react-native-magnus';
import {useDailyWord} from './hooks/useDailyWord';
import {RootStackProps, TabsProps} from './router/RootNavigation';

type HomeProps = CompositeNavigationProp<
  BottomTabNavigationProp<TabsProps, 'Home'>,
  StackNavigationProp<RootStackProps>
>;

const Home: React.FC<{navigation: HomeProps}> = ({navigation}) => {
  const {data} = useDailyWord(new Date());

  return (
    <Div flex={1} justifyContent="center" alignItems="center">
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('WordStack', {
            screen: 'WordDetails',
            params: {
              date: data!.date,
            },
          })
        }>
        <Div shadow="md" bg="white" rounded="md" p="2xl" alignItems="center">
          <Text mb="sm" color="gray">
            Word of the day
          </Text>
          <Text fontSize="6xl" mb={5}>
            {data?.word}
          </Text>
          <Text fontSize="4xl">{data?.translation}</Text>
        </Div>
      </TouchableOpacity>
    </Div>
  );
};

export default Home;
