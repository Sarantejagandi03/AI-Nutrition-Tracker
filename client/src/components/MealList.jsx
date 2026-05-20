import { Trash2 } from "lucide-react";
import { formatDateTime } from "../utils/formatters.js";

const mealSourceLabels = {
  ai: "AI",
  barcode: "Barcode",
  database: "Database",
  manual: "Manual"
};

const MealMacroGrid = ({ meal, compact }) => (
  <div className={`grid ${compact ? "grid-cols-2" : "grid-cols-4"} gap-2 text-right`}>
    <div>
      <p className="text-sm font-bold text-slate-950">{Math.round(meal.calories)}</p>
      <p className="text-xs text-slate-500">kcal</p>
    </div>
    <div>
      <p className="text-sm font-bold text-slate-950">{Math.round(meal.protein)}g</p>
      <p className="text-xs text-slate-500">protein</p>
    </div>
    {!compact ? (
      <>
        <div>
          <p className="text-sm font-bold text-slate-950">{Math.round(meal.carbs)}g</p>
          <p className="text-xs text-slate-500">carbs</p>
        </div>
        <div>
          <p className="text-sm font-bold text-slate-950">{Math.round(meal.fats)}g</p>
          <p className="text-xs text-slate-500">fats</p>
        </div>
      </>
    ) : null}
  </div>
);

const MealList = ({ meals = [], onDelete, compact = false }) => {
  if (!meals.length) {
    return (
      <div className="rounded-lg border border-dashed border-slate-300 bg-white p-6 text-center">
        <p className="text-sm font-semibold text-slate-700">No meals yet</p>
        <p className="mt-1 text-sm text-slate-500">Add a meal, scan a barcode, or use AI analysis to start tracking.</p>
      </div>
    );
  }

  return (
    <div className="divide-y divide-slate-100 overflow-hidden rounded-lg border border-slate-200 bg-white">
      {meals.map((meal) => (
        <div key={meal._id} className="flex flex-col gap-3 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <h3 className="truncate text-sm font-bold text-slate-950">{meal.name}</h3>
              <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold text-slate-600">
                {mealSourceLabels[meal.source] || meal.source}
              </span>
              <span className="rounded-full bg-limewash px-2 py-0.5 text-xs font-semibold text-leaf">{meal.mealType}</span>
            </div>
            <p className="mt-1 text-xs text-slate-500">
              {formatDateTime(meal.consumedAt)} · {meal.servingSize}
            </p>
          </div>

          <div className="flex items-center justify-between gap-3 sm:justify-end">
            <MealMacroGrid meal={meal} compact={compact} />

            {onDelete ? (
              <button type="button" className="icon-button" onClick={() => onDelete(meal._id)} aria-label={`Delete ${meal.name}`}>
                <Trash2 size={17} />
              </button>
            ) : null}
          </div>
        </div>
      ))}
    </div>
  );
};

export default MealList;
