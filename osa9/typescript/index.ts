import express from "express";
const app = express();
import { runBmiCalculator } from "./bmiCalculator";

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

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
