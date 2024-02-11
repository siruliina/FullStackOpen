export interface ExerciseInput {
  daily_exercises: number[];
  target: number;
}

export interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (daily_exercises: number[], target: number): Result => {
  const days = daily_exercises.length;
  let trainingDays = 0;
  let averageTime = 0;
  let reachedTarget = false;
  let ratingNum = 0;
  let description = "";

  for (let i = 0; i < days; i++) {
    if (daily_exercises[i] > 0) {
      trainingDays += 1;
    }
    averageTime += daily_exercises[i];
  }

  averageTime /= days;

  if (averageTime >= target) {
    reachedTarget = true;
  }

  const targetMetPercentage = (averageTime / target) * 100;
  console.log(targetMetPercentage);

  if (targetMetPercentage < 50) {
    ratingNum = 1;
    description = "the amount of exercise was far from target amount...";
  } else if (targetMetPercentage < 100) {
    ratingNum = 2;
    description = "not too bad but could be better";
  } else if (targetMetPercentage >= 100) {
    ratingNum = 3;
    description = "you met your goals, way to go!";
  }

  return {
    periodLength: days,
    trainingDays: trainingDays,
    success: reachedTarget,
    rating: ratingNum,
    ratingDescription: description,
    target: target,
    average: averageTime,
  };
};

export const parseArgs = (
  args: Array<string>
): { target: number; hours: number[] } => {
  if (args.length < 4) throw new Error("Not enough arguments");

  const target = Number(args[2]);
  const hours = args.slice(3).map((arg) => {
    const parsed = Number(arg);
    if (isNaN(parsed)) {
      throw new Error("Provided values must be numbers");
    }
    return parsed;
  });

  return {
    target: target,
    hours: hours,
  };
};


try {
  const { target, hours } = parseArgs(process.argv);
  console.log(calculateExercises(hours, target));
} catch (e) {
  console.log("Error:", e);
}
