import express, { Request, Response } from "express";
const app = express();
app.use(express.json());

import { runBmiCalculator } from "./bmiCalculator";
import { calculateExercises, ExerciseInput } from "./exerciseCalculator";

app.get("/hello", (_req, res) => {
  res.send("Hello Full Stack!");
});

app.get("/bmi", (req, res) => {
  const { height, weight } = req.query;

  if (!height || !weight || isNaN(Number(height)) || isNaN(Number(weight))) {
    return res.status(400).json({ error: "malformatted parameters" });
  }

  const bmiResult = runBmiCalculator([String(height), String(weight)]);

  return res.json({
    height: Number(height),
    weight: Number(weight),
    bmi: bmiResult,
  });
});

app.post('/exercises', (req: Request, res: Response) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const { daily_exercises, target }: ExerciseInput = req.body;

  if (!daily_exercises || !target) {
    return res.status(400).json({ error: 'parameters missing' });
  }

  if (!Array.isArray(daily_exercises) || daily_exercises.some(isNaN) || isNaN(target)) {
    return res.status(400).json({ error: 'malformatted parameters' });
  }

  const result = calculateExercises(daily_exercises, target);
  return res.json(result);
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
