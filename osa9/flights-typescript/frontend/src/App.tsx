import { useEffect, useState } from "react";

import Header from "./components/Header";
import Entries from "./components/Entries";
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
      <Entries entries={entries}/>
    </div>
  )
};

export default App;
