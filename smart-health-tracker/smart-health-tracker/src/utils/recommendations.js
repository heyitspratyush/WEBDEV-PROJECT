export const generateRecommendations = (
  bmi,
  caloriesConsumed,
  caloriesNeeded,
  caloriesBurned,
  steps,
  targetSteps,
  targetCaloriesFromForm
) => {
  const reps = [];

  // BMI insights
  if (bmi < 18.5) {
    reps.push('Your BMI indicates you are underweight. Consider increasing your healthy caloric intake and adding strength training.');
  } else if (bmi >= 25) {
    reps.push('Your BMI is slightly high. Focus on a balanced diet and regular cardiovascular exercise.');
  } else if (bmi >= 18.5 && bmi < 25) {
    reps.push('Great job! Your BMI is in the normal, healthy range.');
  }

  // Calorie insights
  const targetCals = targetCaloriesFromForm || caloriesNeeded;
  const netCalories = caloriesConsumed - caloriesBurned;

  if (caloriesConsumed < targetCals * 0.8) {
    reps.push('You are consuming noticeably fewer calories than your target. Ensure you are getting enough nutrients.');
  } else if (caloriesConsumed > targetCals * 1.2) {
    reps.push('Your caloric intake is exceeding your goals. Try incorporating more low-calorie, high-volume foods like vegetables.');
  } else {
    reps.push('Your caloric intake is well-aligned with your daily goals. Keep it up!');
  }

  // Step insights
  if (steps < targetSteps * 0.5) {
    reps.push(`You've achieved less than half your step goal (${targetSteps}). Try taking a brief walk!`);
  } else if (steps >= targetSteps) {
    reps.push('Fantastic! You have reached or exceeded your daily step goal.');
  } else {
    reps.push(`You are getting closer to your step target of ${targetSteps}. A short stroll will help you hit it.`);
  }

  return reps;
};
