# Smart Health & Lifestyle Tracker - Project Documentation & Viva Guide

## 1. Project Overview & Architecture
The Smart Health & Lifestyle Tracker is a fully frontend-based React application built to monitor personal health metrics. It follows a modular component-based architecture which makes the code readable, maintainable, and highly scalable.

**Why frontend-only initially?**
Building it frontend-first allows us to perfect the UI and user experience without server latency. It is designed such that functions in `utils/` (like storage and calculations) can be easily swapped out for backend API calls or Machine Learning models in the future.

---

## 2. Components & Logic Explanation

### `pages/Home.jsx`
- **Why it’s used:** Acts as the main container (or "Smart Component") handling the application's core state and logic. 
- **How it works:** It uses the `useState` hook to store `userData` and `metrics`, and the `useEffect` hook to automatically load saved data from local storage when the app first renders. It bridges the data from the `HealthForm` down to the display components (`SummaryCards`, `CalorieChart`, `RecommendationBox`).

### `components/HealthForm.jsx`
- **Why it’s used:** To capture all user inputs (age, weight, height, steps, meals, etc.) in a structured way.
- **How it works:** Uses a "Controlled Component" pattern in React. A single `formData` state object tracks every input field via an `onChange` handler. When the user submits, it prevents default browser reload using `e.preventDefault()` and sends the data back to `Home.jsx` via the `onSubmit` prop.

### `components/SummaryCards.jsx`
- **Why it’s used:** To display the calculated health metrics in an easy-to-read, card-based interface.
- **How it works:** It accepts calculated metrics (BMI, calories, steps) via props. It computes visual feedback classes (e.g., green for "success", red for "warning" or "danger") dynamically based on whether the goals were met.

### `components/CalorieChart.jsx`
- **Why it’s used:** To visually compare calories needed, consumed, burned, and targeted. Visual data is much easier for users to understand than raw numbers.
- **How it works:** Integrates `chart.js` and `react-chartjs-2`. It maps the metric numbers passed via props into a Bar chart configuration object.

### `components/RecommendationBox.jsx`
- **Why it’s used:** To provide actionable insights to the user based on their data.
- **How it works:** Loops through the `recommendations` array passed as a prop and dynamically renders them as list items.

---

## 3. Formulas & Utilities Used

All mathematical logic is cleanly separated into `utils/calculations.js`:

### **1. BMI (Body Mass Index)**
Calculates the body fat based on height and weight.
- **Formula:** `Weight (kg) / (Height (m) * Height (m))`
- **Logic code:** `weight / ((heightCm / 100) ** 2)`

### **2. BMR (Basal Metabolic Rate) - Mifflin-St Jeor Equation**
Used to find out how many calories the body burns at rest.
- **Male Formula:** `(10 × weight) + (6.25 × height) - (5 × age) + 5`
- **Female Formula:** `(10 × weight) + (6.25 × height) - (5 × age) - 161`

### **3. Daily Calories Needed (TDEE)**
Total Daily Energy Expenditure based on the user's activity.
- **Formula:** `BMR × Activity Multiplier`
- **Multipliers used:** Sedentary (1.2), Light (1.375), Moderate (1.55), Active (1.725), Very Active (1.9).

### **4. Calories Burned Estimate**
- **Steps:** Assumes `~0.04 calories` burned per step (scaled by weight `weight/70`).
- **Workout:** Assumes `~7 calories` burned per minute of moderate workout.
- **Formula:** `(steps × 0.04 × weight/70) + (workoutMinutes × 7 × weight/70)`

---

## 4. Expected Viva Questions & Answers

**Q1: Why did you use React.js for this project?**
**A:** React allows us to build a dynamic single-page application (SPA). Its component-based architecture allows for code reusability. The virtual DOM ensures that when a user updates their steps or meals, only the specific chart or metric card is updated, making the app extremely fast.

**Q2: What are React Hooks, and which ones did you use?**
**A:** Hooks are functions that let us "hook into" React state and lifecycle features in functional components.
- `useState`: Used to store the form inputs and calculated metrics.
- `useEffect`: Used to trigger side effects, specifically loading from `localStorage` the moment the app mounts.

**Q3: How is data passed between components?**
**A:** Data is passed downwards from parent components to child components using **props**. For example, `Home.jsx` calculates the BMI and passes it down to `SummaryCards.jsx` as a prop. To pass data upwards (like form submission), we pass a callback function as a prop (`onSubmit`).

**Q4: How did you calculate the calories consumed from the meals text input?**
**A:** I created a utility function that takes the comma-separated string, converts it to an array using the `.split(',')` method, trims whitespace, and compares each item against a static JSON key-value store (`foodDatabase.js`). If a match is found, it adds the calorie value to the total count.

**Q5: How does the application store data without a backend database like MongoDB?**
**A:** The application utilizes the browser's `localStorage` API. I wrote a wrapper function in `utils/storage.js` that serializes the JavaScript object into a JSON string using `JSON.stringify()` when saving, and parses it back using `JSON.parse()` when loading. This persists data even if the page is refreshed.

**Q6: You mentioned Future Scalability with Machine Learning. How exactly would you integrate an ML model into this specific codebase?**
**A:** Currently, the predictions (like BMI or recommendations) are handled by pure rule-based JavaScript functions in the `utils/` folder. To integrate ML, we wouldn't need to change any UI components. We would simply replace the logic in `utils/recommendations.js` to perform a `fetch()` request to a Python backend (like Flask or FastAPI) serving the ML model, and return those results to the UI.

**Q7: Why did you choose Vite instead of Create React App (CRA)?**
**A:** Vite is a modern build tool that is significantly faster than CRA. It uses native ES modules in the browser during development, which means instantaneous server starts and incredibly fast Hot Module Replacement (HMR).

**Q8: Explain the significance of the `key` prop in React lists.**
**A:** In the `RecommendationBox`, we map over an array of strings to render `<li>` elements. React requires a unique `key` prop for each item so it can optimize rendering and efficiently identify which items have changed, been added, or been removed.
