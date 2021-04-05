import React, {useEffect, useState} from 'react';
import {Div, Input, Text} from 'react-native-magnus';
import Button from '../Button';
import Step from './Step';

type Props = {
  pinyin: string;
  onChange: () => void;
  keyword?: string;
};

type Pinyin = {
  correctWord: string;
  tone: string;
  value: string;
};

const PinyinStep: React.FC<Props> = ({onChange, pinyin, keyword}) => {
  const [syllable, setSyllable] = useState(0);
  const [values, setValues] = useState<Pinyin[]>();

  useEffect(() => {
    const regex = /[1-9]/g;

    const matchesIterator = pinyin.matchAll(regex);

    const matches = Array.from(matchesIterator);

    setValues(
      matches.map((match, index) => {
        if (match.index) {
          const wordIndex = index === 0 ? 0 : matches[index - 1].index + 1;
          return {
            correctWord: pinyin.substring(wordIndex, match.index),
            tone: pinyin[match.index],
            value: '',
          };
        }

        return {
          correctWord: 'error',
          tone: '1',
          value: '',
        };
      }),
    );
  }, [pinyin]);

  const isDone = syllable > values?.length - 1;

  return (
    <Div mt={30}>
      <Div>
        {values && !isDone ? (
          <Step
            keyword={
              keyword
                ? values[syllable].correctWord + `(${values[syllable].tone})`
                : ''
            }
            correctWord={values[syllable].correctWord}
            onChange={() => {
              if (syllable === values.length - 1) {
                onChange();
              }
              setSyllable((prev) => prev + 1);
            }}
          />
        ) : null}
      </Div>
    </Div>
  );
};

export default PinyinStep;
