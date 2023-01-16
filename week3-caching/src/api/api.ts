import axios from 'axios';
/* eslint-disable import/extensions */
import checkCache from './check-cache';

type ResObj = {
  text: string;
  names: Promise<string>;
  exp: number;
};

const fetchApi = async (enteredNm: string) => {
  const url = process.env.REACT_APP_ASSIGNMENT_API;
  const key = process.env.REACT_APP_LOCALSTORAGE_KEY;

  const names = checkCache(enteredNm);

  if (names) {
    return names;
  } else {
    console.info('calling api');
    try {
      const response = await axios(`${url}/sick?q=${enteredNm}`);

      if (response.status !== 200) throw new Error('Request failed');

      if (response.data.length > 0) {
        const responseData: ResObj = {
          text: enteredNm,
          names: response.data,
          exp: new Date().getTime() + 5 * 60 * 1000,
        };

        localStorage.setItem(key!, JSON.stringify(responseData));
      }

      return response.data;
    } catch (err) {
      console.log(err);
    }
  }
};

export default fetchApi;
