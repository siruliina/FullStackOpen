export interface GetBmi {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): GetBmi => {
  if (args.length !== 2) throw new Error("Exactly two arguments are required");

  const height = Number(args[0]);
  const weight = Number(args[1]);

  if (isNaN(height) || isNaN(weight)) {
    throw new Error("Provided values were not numbers!");
  }

  return { height, weight };
};

export const calculateBmi = (height: number, weight: number): string => {
  const heightInM = height * 0.01;
  const bmi = weight / heightInM ** 2;
  let result = "";

  if (bmi < 16) {
    result = "Underweight (Severe thinness)";
  } else if (bmi <= 16.9) {
    result = "Underweight (Moderate thinness)";
  } else if (bmi <= 18.4) {
    result = "Underweight (Mild thinness)";
  } else if (bmi <= 24.9) {
    result = "Normal (healthy weight)";
  } else if (bmi <= 29.9) {
    result = "Overweight (Pre-obese)";
  } else if (bmi <= 34.9) {
    result = "Obese (Class I)";
  } else if (bmi <= 39.9) {
    result = "Obese (Class II)";
  } else {
    result = "Obese (Class III)";
  }

  return result;
};

export const runBmiCalculator = (args: string[]): string => {
  try {
    const { height, weight } = parseArguments(args);
    return calculateBmi(height, weight);
  } catch (error: unknown) {
    let errorMessage = "Something went wrong.";
    if (error instanceof Error) {
      errorMessage += " Error: " + error.message;
    }
    console.log(errorMessage);
    throw new Error(errorMessage);
  }
};
