import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert} from 'react-native';
import {Div, Input, Text} from 'react-native-magnus';
import {useQueryClient} from 'react-query';
import {apiUpdateWordGuessed} from '../api/apiWords';
import Button from '../Button';
import Surface from '../components/Surface';
import {RootStackProps} from '../router/RootNavigation';
import {WordStackProps} from '../router/WordStack';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<WordStackProps, 'LearnWord'>,
    StackNavigationProp<RootStackProps, 'WordStack'>
  >;
  route: RouteProp<WordStackProps, 'LearnWord'>;
};

const LearnWord: React.FC<Props> = ({route}) => {
  const [step, setStep] = useState(0);
  const [wordGuess, setWordGuess] = useState('');
  const [translationGuess, setTranslationGuess] = useState('');

  const queryClient = useQueryClient();

  const isCorrect = (): boolean => {
    const {translation, word} = route.params;
    return translation === translationGuess && word === wordGuess;
  };

  const handleFinish = async () => {
    if (!isCorrect()) {
      try {
        await apiUpdateWordGuessed();
        queryClient.invalidateQueries('words');
      } catch (e) {
        Alert.alert('Error', e);
      }
    }
    setStep(2);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <Surface>
            <Text fontSize="4xl" fontWeight="bold">
              Write the word.
            </Text>
            <Input
              focusBorderColor="blue700"
              autoFocus={true}
              placeholder="Word"
              value={wordGuess}
              onChangeText={setWordGuess}
            />
            <Button onPress={() => setStep(1)}>Next</Button>
          </Surface>
        );
      case 1:
        return (
          <Surface>
            <Text fontSize="4xl" fontWeight="bold">
              Write the translation
            </Text>
            <Input
              focusBorderColor="blue700"
              autoFocus={true}
              placeholder="Translation"
              value={translationGuess}
              onChangeText={setTranslationGuess}
            />
            <Button onPress={handleFinish}>Next</Button>
          </Surface>
        );
      case 2:
        const correct = isCorrect();
        return (
          <Surface>
            <Text>{correct ? 'Good job.' : 'Too bad. Try again.'}</Text>
          </Surface>
        );
    }
  };

  return (
    <Div m={15} rounded="md" shadow="md">
      {renderStep()}
    </Div>
  );
};

export default LearnWord;
