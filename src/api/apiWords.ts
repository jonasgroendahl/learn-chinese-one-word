import firestore, {
  FirebaseFirestoreTypes,
} from '@react-native-firebase/firestore';
import {format} from 'date-fns';
import {IWord} from '../types';

const WORD_COLLECTION = 'word';

const mapData = <T>(
  data: FirebaseFirestoreTypes.QuerySnapshot<FirebaseFirestoreTypes.DocumentData>,
): T => {
  const mapped: unknown = data.docs.map((item) => {
    return item.data();
  });
  return mapped as T;
};

export const apiGetWords = async () => {
  console.log('querying firebase');
  const data = await firestore()
    .collection(WORD_COLLECTION)
    .orderBy('date', 'asc')
    .get();

  const mapped = mapData<IWord[]>(data);

  return mapped;
};

export const apiUpdateWordGuessed = async () => {
  const today = format(new Date(), 'yyyy-MM-dd');

  const document = await firestore()
    .collection(WORD_COLLECTION)
    .where('date', '==', today)
    .get();

  if (!document.empty) {
    console.log('id', document.docs[0].id);
    const data = await firestore()
      .collection(WORD_COLLECTION)
      .doc(document.docs[0].id)
      .update({
        guessed: true,
      });

    return data;
  }

  throw new Error('Something went bad');
};
