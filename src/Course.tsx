import {BottomTabNavigationProp} from '@react-navigation/bottom-tabs';
import {CompositeNavigationProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {FlatList} from 'react-native-gesture-handler';
import {Div, Text} from 'react-native-magnus';
import {useWords} from './hooks/useWords';
import {RootStackProps, TabsProps} from './router/RootNavigation';

type Props = CompositeNavigationProp<
  BottomTabNavigationProp<TabsProps, 'Course'>,
  StackNavigationProp<RootStackProps>
>;

const Course: React.FC<{navigation: Props}> = ({navigation}) => {
  const {data, isLoading} = useWords();

  if (isLoading) {
    return null;
  }

  return (
    <FlatList
      keyExtractor={(item, index) => item.word + index.toString()}
      data={data}
      contentContainerStyle={styles.contentContainerStyle}
      renderItem={({item}) => (
        <TouchableOpacity
          onPress={() =>
            navigation.navigate('WordStack', {
              screen: 'WordDetails',
              params: {
                date: item.date,
              },
            })
          }>
          <Div
            px={15}
            py={10}
            mb={10}
            flexDir="row"
            bg="white"
            shadow={'sm'}
            rounded="lg"
            alignItems="center">
            <Div flex={1}>
              <Text>{item.word}</Text>
              <Text>{item.translation}</Text>
            </Div>
            <Div>
              <Text>{item.date}</Text>
            </Div>
          </Div>
        </TouchableOpacity>
      )}
    />
  );
};

const styles = StyleSheet.create({
  contentContainerStyle: {
    paddingHorizontal: 10,
    paddingTop: 5,
  },
});

export default Course;
