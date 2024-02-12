import Entry from "./Entry";
import { DiaryEntry } from "../../../flight-diary/src/types";

interface EntriesProps {
  entries: DiaryEntry[] 
}

const Entries = (props: EntriesProps): JSX.Element => {
  return(
    <div>
      <h2>Diary entries</h2>
      {props.entries.map((entry) => {
        return <Entry key={entry.id} entry={entry} />
      })}
    </div>
  )
}

export default Entries;