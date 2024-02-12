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
          <input type="date" value={date} onChange={({target}) => setDate(target.value)} />
        </div>
        <div>
          Visibility
          great <input type="radio" name="visibility" onChange={() => setVisibility('great' as Visibility)} />

          good <input type="radio" name="visibility" onChange={() => setVisibility('good' as Visibility)}/>

          ok <input type="radio" name="visibility"onChange={() => setVisibility('ok' as Visibility)}/>

          poor <input type="radio" name="visibility" onChange={() => setVisibility('poor' as Visibility)}/>
        </div>
        <div>
          Weather
          sunny <input type="radio" name="weather" onChange={() => setWeather('sunny' as Weather)} />

          rainy <input type="radio" name="weather" onChange={() => setWeather('rainy' as Weather)} />

          cloudy <input type="radio" name="weather" onChange={() => setWeather('cloudy' as Weather)} />

          stormy <input type="radio" name="weather" onChange={() => setWeather('stormy' as Weather)} />

          windy <input type="radio" name="weather" onChange={() => setWeather('windy' as Weather)} />
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
