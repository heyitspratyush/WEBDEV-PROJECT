import React, { useState, useEffect } from 'react';
import HealthForm from '../components/HealthForm';
import SummaryCards from '../components/SummaryCards';
import RecommendationBox from '../components/RecommendationBox';
import CalorieChart from '../components/CalorieChart';

import {
  calculateBMI,
  calculateDailyCaloriesNeeded,
  calculateCaloriesBurned,
  parseMealsAndCalculateCalories
} from '../utils/calculations';

import { generateRecommendations } from '../utils/recommendations';
import { saveToStorage, loadFromStorage } from '../utils/storage';

const Home = () => {
  const [userData, setUserData] = useState(null);
  const [metrics, setMetrics] = useState(null);

  // Load from storage on mount
  useEffect(() => {
    const savedData = loadFromStorage();
    if (savedData && savedData.userData) {
      setUserData(savedData.userData);
      recalculateMetrics(savedData.userData);
    }
  }, []);

  const recalculateMetrics = (data) => {
    const weight = parseFloat(data.weight);
    const height = parseFloat(data.height);
    const age = parseInt(data.age, 10);
    const steps = parseInt(data.steps || 0, 10);
    const targetSteps = parseInt(data.targetSteps || 10000, 10);
    const workoutMinutes = parseInt(data.workoutMinutes || 0, 10);
    const targetCalories = parseInt(data.targetCalories || 0, 10);

    const bmi = calculateBMI(weight, height);
    const caloriesNeeded = calculateDailyCaloriesNeeded(data.gender, weight, height, age, data.activityLevel);
    const caloriesBurned = calculateCaloriesBurned(steps, workoutMinutes, weight);
    const caloriesConsumed = parseMealsAndCalculateCalories(data.meals);

    const recommendations = generateRecommendations(
      bmi,
      caloriesConsumed,
      caloriesNeeded,
      caloriesBurned,
      steps,
      targetSteps,
      targetCalories
    );

    const newMetrics = {
      bmi,
      caloriesNeeded,
      caloriesBurned,
      caloriesConsumed,
      targetCalories,
      steps,
      targetSteps,
      recommendations
    };

    setMetrics(newMetrics);
    
    // Save state
    saveToStorage({ userData: data, metrics: newMetrics });
  };

  const handleFormSubmit = (formData) => {
    setUserData(formData);
    recalculateMetrics(formData);
  };

  return (
    <div className="home-page container">
      <div className="layout-grid">
        <div className="sidebar">
          <HealthForm initialData={userData} onSubmit={handleFormSubmit} />
        </div>
        
        <div className="main-content">
          {metrics ? (
            <div className="dashboard-view">
              <h2>Your Dashboard</h2>
              <SummaryCards 
                bmi={metrics.bmi}
                caloriesNeeded={metrics.caloriesNeeded}
                caloriesConsumed={metrics.caloriesConsumed}
                caloriesBurned={metrics.caloriesBurned}
                targetCalories={metrics.targetCalories}
                steps={metrics.steps}
                targetSteps={metrics.targetSteps}
              />

              <div className="visualization-section">
                <CalorieChart 
                  caloriesNeeded={metrics.caloriesNeeded}
                  caloriesConsumed={metrics.caloriesConsumed}
                  caloriesBurned={metrics.caloriesBurned}
                  targetCalories={metrics.targetCalories}
                />
              </div>

              <RecommendationBox recommendations={metrics.recommendations} />
            </div>
          ) : (
            <div className="empty-state card">
              <div className="empty-state-content">
                <h2>Welcome to Smart Health & Lifestyle Tracker</h2>
                <p>Please enter your details in the form to generate your personal health dashboard, track your meals, and receive helpful recommendations.</p>
                <div className="empty-icon">🌱</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
