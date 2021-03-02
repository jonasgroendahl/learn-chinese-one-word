import {useQuery} from 'react-query';
import {apiGetWords} from '../api/apiWords';

export const useWords = () => {
  return useQuery('words', apiGetWords, {
    enabled: false,
  });
};
