interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const calculateExercises = (hours: number[], target: number): Result => {
  const days = hours.length;
  let trainingDays = 0;
  let averageTime = 0;
  let reachedTarget = false;
  let rating: number;
  let description;

  for (let i = 0; i < days; i++) {
    if (hours[i] > 0) {
      trainingDays += 1;
    }
    averageTime += hours[i];
  }

  averageTime /= days;

  if (averageTime >= target) {
    reachedTarget = true;
  }

  let targetMetPercentage = (averageTime / target) * 100;
  console.log(targetMetPercentage);

  if (targetMetPercentage < 50) {
    rating = 1;
    description = "the amount of exercise was far from target amount...";
  } else if (targetMetPercentage < 100) {
    rating = 2;
    description = "not too bad but could be better";
  } else if (targetMetPercentage >= 100) {
    rating = 3;
    description = "you met your goals, way to go!";
  }

  return {
    periodLength: days,
    trainingDays: trainingDays,
    success: reachedTarget,
    rating: rating,
    ratingDescription: description,
    target: target,
    average: averageTime,
  };
};

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 4));
