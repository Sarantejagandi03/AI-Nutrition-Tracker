import { Database, Plus } from "lucide-react";
import { useState } from "react";

const initialForm = {
  name: "",
  description: "",
  mealType: "breakfast",
  servingSize: "1 serving",
  calories: "",
  protein: "",
  carbs: "",
  fats: ""
};

const macroFields = ["calories", "protein", "carbs", "fats"];
const mealTypes = ["breakfast", "lunch", "dinner", "snack"];

const ManualMealForm = ({ onSubmit, busy }) => {
  const [mealForm, setMealForm] = useState(initialForm);

  const updateField = (field, value) => {
    setMealForm((currentMeal) => ({ ...currentMeal, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit(mealForm);
    setMealForm(initialForm);
  };

  const hasFullMacros = macroFields.every((field) => mealForm[field] !== "");
  const ButtonIcon = hasFullMacros ? Plus : Database;

  return (
    <form className="panel p-4" onSubmit={handleSubmit}>
      <div className="mb-4 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Manual meal</h2>
          <p className="text-sm text-slate-500">Enter macros or leave them blank for nutrition database lookup.</p>
        </div>
      </div>

      <div className="grid gap-3 sm:grid-cols-2">
        <label className="sm:col-span-2">
          <span className="mb-1 block text-sm font-semibold text-slate-700">Meal name</span>
          <input className="field" value={mealForm.name} onChange={(event) => updateField("name", event.target.value)} required />
        </label>
        <label className="sm:col-span-2">
          <span className="mb-1 block text-sm font-semibold text-slate-700">Description</span>
          <textarea
            className="field min-h-20 resize-y"
            value={mealForm.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="Rice, dal, salad"
          />
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold text-slate-700">Meal type</span>
          <select className="field" value={mealForm.mealType} onChange={(event) => updateField("mealType", event.target.value)}>
            {mealTypes.map((mealType) => (
              <option key={mealType} value={mealType}>
                {mealType.charAt(0).toUpperCase() + mealType.slice(1)}
              </option>
            ))}
          </select>
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold text-slate-700">Serving</span>
          <input className="field" value={mealForm.servingSize} onChange={(event) => updateField("servingSize", event.target.value)} />
        </label>
        {macroFields.map((field) => (
          <label key={field}>
            <span className="mb-1 block text-sm font-semibold capitalize text-slate-700">{field}</span>
            <input
              className="field"
              type="number"
              min="0"
              step="0.1"
              value={mealForm[field]}
              onChange={(event) => updateField(field, event.target.value)}
            />
          </label>
        ))}
      </div>

      <button type="submit" className="btn-primary mt-4 w-full sm:w-auto" disabled={busy}>
        <ButtonIcon size={17} />
        {hasFullMacros ? "Save meal" : "Lookup and save"}
      </button>
    </form>
  );
};

export default ManualMealForm;
