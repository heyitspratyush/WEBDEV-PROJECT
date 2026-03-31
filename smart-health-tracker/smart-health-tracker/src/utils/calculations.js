import { foodDatabase } from '../data/foodDatabase';

const ACTIVITY_MULTIPLIERS = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  active: 1.725,
  very_active: 1.9,
};

export const calculateBMI = (weight, heightCm) => {
  if (!weight || !heightCm) return 0;
  const heightM = heightCm / 100;
  return +(weight / (heightM * heightM)).toFixed(1);
};

export const calculateBMR = (gender, weight, heightCm, age) => {
  if (!weight || !heightCm || !age) return 0;
  // Mifflin-St Jeor Equation
  let bmr = 10 * weight + 6.25 * heightCm - 5 * age;
  if (gender === 'male') {
    bmr += 5;
  } else {
    bmr -= 161;
  }
  return bmr;
};

export const calculateDailyCaloriesNeeded = (gender, weight, heightCm, age, activityLevel) => {
  const bmr = calculateBMR(gender, weight, heightCm, age);
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.2;
  return Math.round(bmr * multiplier);
};

export const calculateCaloriesBurned = (steps, workoutMinutes, weight) => {
  // Rough estimate: ~0.04 calories per step for average person, scaled by weight slightly
  const stepCalories = steps * 0.04 * (weight ? weight / 70 : 1);
  // Rough estimate: ~5-10 calories per min of workout, assume moderate: 7
  const workoutCalories = workoutMinutes * 7 * (weight ? weight / 70 : 1);
  return Math.round(stepCalories + workoutCalories);
};

export const parseMealsAndCalculateCalories = (mealsText) => {
  if (!mealsText || mealsText.trim() === '') return 0;
  
  const items = mealsText.toLowerCase().split(',').map((item) => item.trim());
  let totalCalories = 0;

  items.forEach((item) => {
    // If exact match
    if (foodDatabase[item]) {
      totalCalories += foodDatabase[item];
    } else {
      // Try to find partial match
      const keys = Object.keys(foodDatabase);
      const partialMatch = keys.find((key) => key.includes(item.replace(/ /g, '_')) || item.includes(key.replace(/_/g, ' ')));
      if (partialMatch) {
        totalCalories += foodDatabase[partialMatch];
      }
    }
  });

  return totalCalories;
};
