import { DiaryEntry } from "../../../flight-diary/src/types";

interface EntryProps {
  entry: DiaryEntry 
}

const Entry = ({entry}: EntryProps): JSX.Element => {
  return(
    <div>
      <h3>{entry.date}</h3>
      <p>
        visibility: {entry.visibility} <br/>
        weather: {entry.weather}
      </p>
    </div>
  )
}

export default Entry;