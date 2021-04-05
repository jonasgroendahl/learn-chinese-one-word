import {CompositeNavigationProp, RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import React, {useState} from 'react';
import {Alert, Dimensions} from 'react-native';
import {Div, Input, Text} from 'react-native-magnus';
import {useQueryClient} from 'react-query';
import {apiUpdateWordGuessed} from '../api/apiWords';
import Button from '../Button';
import PinyinStep from '../components/PinyinStep';
import Step from '../components/Step';
import StepContainer from '../components/StepContainer';
import Surface from '../components/Surface';
import Navigation, {RootStackProps} from '../router/RootNavigation';
import {WordStackProps} from '../router/WordStack';

type Props = {
  navigation: CompositeNavigationProp<
    StackNavigationProp<WordStackProps, 'LearnWord'>,
    StackNavigationProp<RootStackProps, 'WordStack'>
  >;
  route: RouteProp<WordStackProps, 'LearnWord'>;
};

const LearnWord: React.FC<Props> = ({route, navigation}) => {
  const [step, setStep] = useState(0);

  const queryClient = useQueryClient();

  const {word} = route.params;

  const handleFinish = async () => {
    try {
      await apiUpdateWordGuessed();
      queryClient.invalidateQueries('words');
      navigation.goBack();
    } catch (e) {
      Alert.alert('Error', e);
    }
  };

  const renderStep = () => {
    console.log('step', step);
    switch (step) {
      case 0:
        return (
          <StepContainer label="Repeat chinese word">
            <Step
              correctWord={word.translation}
              keyword={word.translation}
              onChange={() => setStep(1)}
            />
          </StepContainer>
        );
      case 1:
        return (
          <StepContainer label="Repeat chinese word - no keyword">
            <Div />
            <Step correctWord={word.translation} onChange={() => setStep(2)} />
          </StepContainer>
        );
      case 2:
        return (
          <StepContainer label="Repeat pinyin">
            <PinyinStep
              pinyin={word.pinyin}
              keyword={word.pinyin}
              onChange={() => setStep(3)}
            />
          </StepContainer>
        );
      case 3:
        return (
          <StepContainer label="Repeat pinyin - no keyword">
            <Div />
            <PinyinStep pinyin={word.pinyin} onChange={() => setStep(4)} />
          </StepContainer>
        );
      case 4:
        return (
          <StepContainer label="Repeat chinese word again">
            <Step
              correctWord={word.translation}
              keyword={word.translation}
              onChange={() => setStep(5)}
            />
          </StepContainer>
        );
      case 5:
        return (
          <StepContainer label="Repeat chinese word again - no keyword">
            <Step correctWord={word.translation} onChange={() => setStep(6)} />
          </StepContainer>
        );
      case 6:
        return (
          <StepContainer label="Well done!">
            <Div justifyContent="center" row mt={30}>
              <Button onPress={handleFinish}>Done</Button>
            </Div>
          </StepContainer>
        );
    }
  };

  return (
    <Div bg="white" flex={1}>
      {renderStep()}
    </Div>
  );
};

export default LearnWord;
