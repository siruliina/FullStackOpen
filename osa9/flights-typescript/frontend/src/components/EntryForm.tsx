import React, { useState } from 'react';
import { DiaryEntry, Visibility, Weather } from '../../../flight-diary/src/types';
import { createEntry } from '../diaryService';

interface EntryProps {
  entries: DiaryEntry[];
  setEntries: React.Dispatch<React.SetStateAction<DiaryEntry[]>>;
}

const EntryForm = ({ entries, setEntries }: EntryProps): JSX.Element => {
  const [date, setDate] = useState('');
  const [visibility, setVisibility] = useState<Visibility>(Visibility.Great);
  const [weather, setWeather] = useState<Weather>(Weather.Sunny);
  const [comment, setComment] = useState('');

  const entryCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();
    createEntry({
      date: date,
      visibility: visibility,
      weather: weather,
      comment: comment,
    }).then((data) => {
      setEntries(entries.concat(data));
    });

    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };

  return (
    <div>
      <h2>Add new entry</h2>
      <form onSubmit={entryCreation}>
        <div>
          Date
          <input value={date} onChange={({ target }) => setDate(target.value)} />
        </div>
        <div>
          Visibility
          <input value={visibility} onChange={({ target }) => setVisibility(target.value as Visibility)} />
        </div>
        <div>
          Weather
          <input value={weather} onChange={({ target }) => setWeather(target.value as Weather)} />
        </div>
        <div>
          Comment
          <input value={comment} onChange={({ target }) => setComment(target.value)} />
        </div>
        <button type='submit'>add</button>
      </form>
    </div>
  );
};

export default EntryForm;
