import { Sparkles } from "lucide-react";
import { useState } from "react";

const AIMealForm = ({ onSubmit, busy }) => {
  const [description, setDescription] = useState("I ate 2 eggs and 1 banana");
  const [mealType, setMealType] = useState("snack");

  const handleSubmit = async (event) => {
    event.preventDefault();
    await onSubmit({ description, mealType });
  };

  return (
    <form className="panel p-4" onSubmit={handleSubmit}>
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-950">AI meal analysis</h2>
        <p className="text-sm text-slate-500">Describe what you ate and let the API estimate calories and macros.</p>
      </div>

      <div className="grid gap-3">
        <label>
          <span className="mb-1 block text-sm font-semibold text-slate-700">Meal description</span>
          <textarea
            className="field min-h-24 resize-y"
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            required
          />
        </label>
        <label>
          <span className="mb-1 block text-sm font-semibold text-slate-700">Meal type</span>
          <select className="field" value={mealType} onChange={(event) => setMealType(event.target.value)}>
            <option value="breakfast">Breakfast</option>
            <option value="lunch">Lunch</option>
            <option value="dinner">Dinner</option>
            <option value="snack">Snack</option>
          </select>
        </label>
      </div>

      <button type="submit" className="btn-primary mt-4 w-full" disabled={busy}>
        <Sparkles size={17} />
        Analyze and save
      </button>
    </form>
  );
};

export default AIMealForm;
