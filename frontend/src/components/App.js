import React from "react";
import Meals from "./Meals"; // Import Meals component

function App() {
  return (
    <div>
      <h1>Meal Planner</h1>
      <Meals /> {/* This component fetches meals from the backend */}
    </div>
  );
}

export default App;
