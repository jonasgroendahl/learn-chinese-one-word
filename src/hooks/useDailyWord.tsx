import {isSameDay} from 'date-fns';
import {useQuery} from 'react-query';
import {apiGetWords} from '../api/apiWords';

export const useDailyWord = (date: Date) => {
  return useQuery('words', apiGetWords, {
    select: (words) =>
      words?.find((word) => isSameDay(new Date(word.date), date)),
  });
};
