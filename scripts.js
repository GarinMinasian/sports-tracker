const form = document.getElementById('activity-form');
const activityInput = document.getElementById('activity-input');
const activityList = document.getElementById('activity-list');
const goalInput = document.getElementById('goal-input');
const setGoalButton = document.getElementById('set-goal');
const goalStatus = document.getElementById('goal-status');

let activities = [];
let dailyGoal = 0;

form.addEventListener('submit', (e) => {
  e.preventDefault();
  
  const input = activityInput.value.trim();
  if (!input) return;

  // Ensure the input has three parts: type, duration, calories
  const parts = input.split(',').map(item => item.trim());
  
  if (parts.length !== 3) {
    alert("Please enter the activity in the format: Type, Duration, Calories (e.g., Running, 30 minutes, 250 calories).");
    return;
  }

  const [type, duration, calories] = parts;

  // Ensure the calorie value is a number
  const caloriesNumber = parseInt(calories);

  if (isNaN(caloriesNumber)) {
    alert("Calories must be a valid number.");
    return;
  }

  activities.push({ type, duration, calories: caloriesNumber });
  renderActivities();

  activityInput.value = '';
});

function renderActivities() {
  activityList.innerHTML = '';
  activities.forEach((activity) => {
    const li = document.createElement('li');
    li.textContent = `${activity.type} - ${activity.duration} - ${activity.calories} calories`;
    activityList.appendChild(li);
  });

  updateGoalStatus();
}

setGoalButton.addEventListener('click', () => {
  dailyGoal = parseInt(goalInput.value);
  goalInput.value = '';
  updateGoalStatus();
});

function updateGoalStatus() {
  const totalCalories = activities.reduce((sum, activity) => sum + activity.calories, 0);
  if (dailyGoal > 0) {
    goalStatus.textContent = `Goal: ${totalCalories} / ${dailyGoal} calories`;
    if (totalCalories >= dailyGoal) {
      goalStatus.textContent += ' 🎉 Goal Reached!';
    }
  }
}

