import { useEffect, useState } from "react";

import Header from "./components/Header";
import Entries from "./components/Entries";
import EntryForm from "./components/EntryForm";
import { getAllEntries } from "./diaryService";
import { DiaryEntry } from "../../flight-diary/src/types";

const App = () => {

  const [entries, setEntries] = useState<DiaryEntry[]>([]);

  useEffect(() => {
    getAllEntries().then(data => {
      setEntries(data)
    })
  }, [])

  return (
    <div>    
      <Header />
      <EntryForm entries={entries} setEntries={setEntries} />
      <Entries entries={entries}/>
    </div>
  )
};

export default App;
