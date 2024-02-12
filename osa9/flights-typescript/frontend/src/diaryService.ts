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
}