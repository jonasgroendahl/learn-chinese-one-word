import {useQuery} from 'react-query';
import {apiGetWords} from '../api/apiWords';

export const useWord = (dateString: string) => {
  return useQuery('words', apiGetWords, {
    select: (words) => words.find((word) => word.date === dateString),
    refetchOnMount: false,
  });
};
