import React, { useState } from "react";
import { spicyFoods, getNewRandomSpicyFood } from "../data";


function SpicyFoodList() {
  const [foods, setFoods] = useState(spicyFoods);
  const [selectedOpt, setSelectedOpt] = useState("All")


  function handleAddFood() {
    const newFood = getNewRandomSpicyFood();
    console.log(newFood);
    const foodsCopy = [...foods, newFood]
    setFoods(foodsCopy)

  }
  function handleRemoveClick(id) {
    const keptFoods = foods.filter(food => food.id !== id)
    setFoods(keptFoods)

  }

  function handleIncreaseClick(id) {

    const increasedHeatFoods = foods.map(food => {
      if (food.id === id) {
        return {
          ...food,
          heatLevel: food.heatLevel + 1
        }
      } else {
        return food
      }
    })
    setFoods(increasedHeatFoods)
  }
  

  function handleFilterOption(event) {
    console.log(event)
    setSelectedOpt(event.target.value)
    // setFoods(foodsChosenToDisplay)

  }

  const foodsChosenToDisplay = foods.filter((food) => {
    if (selectedOpt === "All") {
      return true;
    } else {
      return food.cuisine === selectedOpt
    }
  })

const foodList = foodsChosenToDisplay.map((food) => (
    <li key={food.id} >
      {food.name} | Heat: {food.heatLevel} | Cuisine: {food.cuisine}
      <div className="button-container" style={{display:"flex",gap:"em"}}>
        <button style={{ display: "inline-block", marginRight: "2px", textAlign: "right" }} onClick={() => handleRemoveClick(food.id)} >remove</button>

        <button onClick={() => handleIncreaseClick(food.id)}> increase the heat level</button>
      </div>

    </li>
  ));



  return (
    <div>
      <button onClick={handleAddFood}>Add New Food</button>
      <ul>{foodList}</ul>
      <select name="filter" onClick={handleFilterOption}>
        <option value="All">All</option>
        <option value="American">American</option>
        <option value="Sichuan">Sichuan</option>
        <option value="Thai">Thai</option>
        <option value="Mexican">Mexican</option>
      </select>
    </div>
  );
}

export default SpicyFoodList;
