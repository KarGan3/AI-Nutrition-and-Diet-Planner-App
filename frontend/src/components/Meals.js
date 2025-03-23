import React, { useEffect, useState } from "react";

function Meals() {
  const [meals, setMeals] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/meals")  // Adjust the endpoint as per MealRoutes.js
      .then((response) => response.json())
      .then((data) => setMeals(data))
      .catch((error) => console.error("Error fetching meals:", error));
  }, []);

  return (
    <div>
      <h2>Available Meals</h2>
      <ul>
        {meals.map((meal, index) => (
          <li key={index}>{meal.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default Meals;
