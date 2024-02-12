interface CoursePart {
  name: string,
  exerciseCount: number
}

interface ContentProps {
  content: CoursePart[] 
}

const Content = (props: ContentProps): JSX.Element => {
  return <p>{props.content.map((course) => ( <div>{course.name} {course.exerciseCount}</div>))}</p>;
};

export default Content;