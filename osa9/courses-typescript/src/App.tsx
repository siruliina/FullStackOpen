import Header from "./components/Header";
import Total from "./components/Total";
import Content from "./components/Content";
import { courseParts } from "./types";

const App = () => {
  const courseName = "Half Stack application development";
  
  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header name={courseName} />
      <Content content={courseParts} />
      <Total total={totalExercises} />
    </div>
  );
};

export default App;