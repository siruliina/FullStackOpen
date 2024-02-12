import Part from "./Part"
import { CoursePart } from "../types"

interface ContentProps {
  content: CoursePart[] 
}

const Content = (props: ContentProps): JSX.Element => {
  return (
    <div>{props.content.map((course) => ( <Part key={course.name} course={course} />))}</div>
  )
};

export default Content;