export const formatDateTime = (value) => {
  return new Intl.DateTimeFormat("en", {
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit"
  }).format(new Date(value));
};

export const macroDataFromTotals = (totals = {}) => [
  { name: "Protein", value: Number(totals.protein || 0), fill: "#0f766e" },
  { name: "Carbs", value: Number(totals.carbs || 0), fill: "#0284c7" },
  { name: "Fats", value: Number(totals.fats || 0), fill: "#f97316" }
];

export const percentOfGoal = (value = 0, goal = 0) => {
  if (!goal) {
    return 0;
  }

  return Math.min(100, Math.round((Number(value) / Number(goal)) * 100));
};
