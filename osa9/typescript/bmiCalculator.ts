interface GetBmi {
  height: number;
  weight: number;
}

const parseArguments = (args: string[]): GetBmi => {
  if (args.length < 4) throw new Error("Not enough arguments");
  if (args.length > 4) throw new Error("Too many arguments");

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3]),
    };
  } else {
    throw new Error("Provided values were not numbers!");
  }
};

const calculateBmi = (height: number, weight: number) => {
  const heightInM = height * 0.01;
  const bmi = weight / heightInM ** 2;
  let result;

  console.log(process.argv);

  if (bmi < 16) {
    result = "Underweight (Severe thinness)";
  } else if (bmi <= 16.9) {
    result = "Underweight (Moderate thinness)";
  } else if (bmi <= 18.4) {
    result = "Underweight (Mild  thinness)";
  } else if (bmi <= 24.9) {
    result = "Normal (healthy weight)";
  } else if (bmi <= 29.9) {
    result = "Overweight (Pre-obese)";
  } else if (bmi <= 34.9) {
    result = "Obese (Class I)";
  } else if (bmi <= 39.9) {
    result = "Obese (Class II)";
  } else if (bmi >= 40) {
    result = "Obese (Class III)";
  }

  return result;
};

try {
  const { height, weight } = parseArguments(process.argv);
  console.log(calculateBmi(height, weight));
} catch (error: unknown) {
  let errorMessage = "Something went wrong.";
  if (error instanceof Error) {
    errorMessage += " Error: " + error.message;
  }
  console.log(errorMessage);
}
