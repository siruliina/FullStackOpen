import {assertNever} from '../help'
import { CoursePart } from '../types';

interface PartProps {
  course: CoursePart
}

const Part = ({course}: PartProps): JSX.Element => {

  let element;

  switch (course.kind) {
    case 'basic':
      element = 
        <div>
          <p><b>{course.name} {course.exerciseCount}</b><br/>
          <em>{course.description}</em></p>
        </div>
      break;  
    case 'group':
      element = 
        <div>
          <p><b>{course.name} {course.exerciseCount}</b><br/>
          project exercises {course.groupProjectCount}</p>
        </div>
      break;
    case 'background':
      element = 
        <div>
          <p><b>{course.name} {course.exerciseCount}</b><br/>
          <em>{course.description}</em><br/>
          submit to {course.backgroundMaterial}</p>
        </div>
      break;
    case 'special':
      element = 
        <div>
          <p><b>{course.name} {course.exerciseCount}</b><br/>
          <em>{course.description}</em><br/>
          required skills: {course.requirements.join(', ')}</p>
        </div>
      break;
    default:
      return assertNever(course);
  }
  return <>{element}</>
};

export default Part;