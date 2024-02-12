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
  const [error, setError] = useState('');

  const entryCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();
  
    try {
      const data = await createEntry({
        date: date,
        visibility: visibility,
        weather: weather,
        comment: comment,
      });

      if (data) {
        setEntries(entries.concat(data));
      } 
    } catch (error) {
      setError(`${error}`);
      setTimeout(() => {
        setError('');
      }, 5000);
    }
    setDate('');
    setVisibility(Visibility.Great);
    setWeather(Weather.Sunny);
    setComment('');
  };
  

  return (
    <div>
      <h2>Add new entry</h2>
      {error? <div style={{color: 'red'}}>{error}</div> : null}
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
