import React, { useState, useEffect } from 'react';

const HealthForm = ({ initialData, onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    age: '',
    gender: 'male',
    weight: '',
    height: '',
    steps: '',
    workoutMinutes: '',
    activityLevel: 'sedentary',
    targetCalories: '',
    targetSteps: '10000',
    meals: ''
  });

  useEffect(() => {
    if (initialData) {
      setFormData(prev => ({ ...prev, ...initialData }));
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <div className="health-form-container card">
      <h2>Your Health Profile</h2>
      <form onSubmit={handleSubmit} className="health-form">
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} placeholder="John Doe" required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="age">Age</label>
            <input type="number" id="age" name="age" value={formData.age} onChange={handleChange} min="1" required />
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender</label>
            <select id="gender" name="gender" value={formData.gender} onChange={handleChange}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="weight">Weight (kg)</label>
            <input type="number" id="weight" name="weight" value={formData.weight} onChange={handleChange} step="0.1" min="1" required />
          </div>
          <div className="form-group">
            <label htmlFor="height">Height (cm)</label>
            <input type="number" id="height" name="height" value={formData.height} onChange={handleChange} min="50" required />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="steps">Steps Walked Today</label>
            <input type="number" id="steps" name="steps" value={formData.steps} onChange={handleChange} min="0" />
          </div>
          <div className="form-group">
            <label htmlFor="workoutMinutes">Workout (Minutes)</label>
            <input type="number" id="workoutMinutes" name="workoutMinutes" value={formData.workoutMinutes} onChange={handleChange} min="0" />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="activityLevel">Daily Activity Level</label>
          <select id="activityLevel" name="activityLevel" value={formData.activityLevel} onChange={handleChange}>
            <option value="sedentary">Sedentary (Little to no exercise)</option>
            <option value="light">Light (Light exercise 1-3 days/week)</option>
            <option value="moderate">Moderate (Moderate exercise 3-5 days/week)</option>
            <option value="active">Active (Hard exercise 6-7 days/week)</option>
            <option value="very_active">Very Active (Very hard exercise/sports & physical job)</option>
          </select>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="targetCalories">Daily Calorie Goal (Optional)</label>
            <input type="number" id="targetCalories" name="targetCalories" value={formData.targetCalories} onChange={handleChange} min="500" placeholder="e.g. 2000" />
          </div>
          <div className="form-group">
            <label htmlFor="targetSteps">Target Steps</label>
            <input type="number" id="targetSteps" name="targetSteps" value={formData.targetSteps} onChange={handleChange} min="1000" required />
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="meals">Meals Consumed Today (Comma-separated)</label>
          <textarea 
            id="meals" 
            name="meals" 
            value={formData.meals} 
            onChange={handleChange} 
            placeholder="e.g. apple, rice, dal, chicken curry"
            rows="3"
          ></textarea>
        </div>

        <button type="submit" className="submit-btn">Calculate Health Metrics</button>
      </form>
    </div>
  );
};

export default HealthForm;
