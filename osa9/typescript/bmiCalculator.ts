const calculateBmi = (height: number, weight: number) => {
  const heightInM = height * 0.01;
  const bmi = weight / heightInM ** 2;
  let result;

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

console.log(calculateBmi(180, 150));
