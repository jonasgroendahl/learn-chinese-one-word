import {
  CompositeNavigationProp,
  RouteProp,
  useFocusEffect,
} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {isSameDay} from 'date-fns';
import React from 'react';
import {Linking} from 'react-native';
import {Div, Icon, Tag, Text} from 'react-native-magnus';
import Button from '../Button';
import Surface from '../components/Surface';
import {useWord} from '../hooks/useWord';
import {RootStackProps} from '../router/RootNavigation';
import {WordStackProps} from '../router/WordStack';
import {IWord} from '../types';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<WordStackProps, 'WordDetails'>,
    StackNavigationProp<RootStackProps, 'WordStack'>
  >;
  route: RouteProp<WordStackProps, 'WordDetails'>;
};

const WordDetails: React.FC<Props> = ({navigation, route}) => {
  const {data} = useWord(route.params.date);

  const {word, examples, translation, link, guessed, date} = data as IWord;

  useFocusEffect(
    React.useCallback(() => {
      navigation.setOptions({
        headerRight: () =>
          isSameDay(new Date(), new Date(date)) ? (
            <Div>
              <Button
                disabled={guessed}
                bg="white"
                color="black"
                onPress={() =>
                  navigation.navigate('LearnWord', {
                    translation,
                    word,
                  })
                }>
                Learn
              </Button>
            </Div>
          ) : undefined,
      });
    }, [navigation, date, translation, word, guessed]),
  );

  return (
    <Div>
      <Div mx={15} my={10}>
        <Surface>
          <Div row alignItems="flex-start" justifyContent="space-between">
            <Text fontSize="6xl">{translation}</Text>
            {guessed ? (
              <Tag
                ml="md"
                bg="green400"
                color="white"
                fontSize="md"
                suffix={
                  <Icon ml={'md'} name="check" color="white" fontSize="sm" />
                }>
                Learned
              </Tag>
            ) : null}
          </Div>
          <Text fontSize="2xl">{word}</Text>
          <Div my={20}>
            <Text
              fontWeight="500"
              textTransform="uppercase"
              mb={5}
              color="gray">
              Examples
            </Text>
            {examples?.map((example) => (
              <Div key={example.translation} my={10}>
                <Text mb={5}>{example.word}</Text>
                <Text>{example.translation}</Text>
              </Div>
            ))}
          </Div>
          <Text color="blue500" onPress={() => Linking.openURL(link)}>
            {link}
          </Text>
        </Surface>
      </Div>
    </Div>
  );
};

export default WordDetails;
