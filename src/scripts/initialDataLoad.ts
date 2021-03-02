import data from './data_.json';
import firestore from '@react-native-firebase/firestore';
import {addDays, format} from 'date-fns';

export const initiallyPopulateDatabase = async (startDate: Date) => {
  let index = 0;

  for (const word of data) {
    const date = addDays(startDate, index);
    try {
      const res = await firestore()
        .collection('word')
        .add({
          ...word,
          date: format(date, 'yyyy-MM-dd'),
        });

      console.log(res.id);
    } catch (e) {
      console.log(e);
    }
    index++;
  }
};

//initiallyPopulateDatabase(new Date());

// setup firebase for ios
// create firebase folder
// create function
// npx ts-node initialDataLoad
