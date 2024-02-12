import axios from 'axios';
import { DiaryEntry, NewDiaryEntry } from '../../flight-diary/src/types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllEntries = () => {
  return axios
    .get<DiaryEntry[]>(baseUrl)
    .then(response => response.data)
}

export const createEntry = (entry: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, entry)
    .then(response => response.data)
    .catch((error) => {
      if (axios.isAxiosError(error)) {
        console.error(error.response);
        if (error.response) {
          throw new Error(`Failed to create diary entry: ${error.response.data}`);
        } else {
          throw new Error('An error occurred.')
        }
      } else {
        console.error(error);
      }      
    });
};
