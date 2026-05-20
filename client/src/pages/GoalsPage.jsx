import { Save } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { fetchGoal, saveGoal } from "../redux/goalsSlice.js";
import { fetchSummary } from "../redux/mealsSlice.js";

const initialGoal = {
  calories: 2200,
  protein: 120,
  carbs: 250,
  fats: 70,
  waterMl: 2500,
  weightKg: "",
  targetWeightKg: "",
  activityLevel: "moderate"
};

const goalNumberFields = [
  ["calories", "Calories", "kcal"],
  ["protein", "Protein", "g"],
  ["carbs", "Carbs", "g"],
  ["fats", "Fats", "g"],
  ["waterMl", "Water", "ml"],
  ["weightKg", "Weight", "kg"],
  ["targetWeightKg", "Target weight", "kg"]
];

const activityLevels = ["sedentary", "light", "moderate", "active", "athlete"];

const GoalsPage = () => {
  const dispatch = useDispatch();
  const { item: savedGoal, status, error } = useSelector((state) => state.goals);
  const [goalForm, setGoalForm] = useState(initialGoal);

  useEffect(() => {
    dispatch(fetchGoal());
  }, [dispatch]);

  useEffect(() => {
    if (savedGoal) {
      setGoalForm({
        calories: savedGoal.calories ?? initialGoal.calories,
        protein: savedGoal.protein ?? initialGoal.protein,
        carbs: savedGoal.carbs ?? initialGoal.carbs,
        fats: savedGoal.fats ?? initialGoal.fats,
        waterMl: savedGoal.waterMl ?? initialGoal.waterMl,
        weightKg: savedGoal.weightKg ?? "",
        targetWeightKg: savedGoal.targetWeightKg ?? "",
        activityLevel: savedGoal.activityLevel ?? "moderate"
      });
    }
  }, [savedGoal]);

  const updateField = (field, value) => {
    setGoalForm((currentGoal) => ({ ...currentGoal, [field]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const saveAttempt = await dispatch(saveGoal(goalForm));

    if (saveGoal.fulfilled.match(saveAttempt)) {
      dispatch(fetchSummary());
    }
  };

  return (
    <>
      <PageHeader title="Goal Management" eyebrow="Targets" />

      <ErrorMessage message={error} className="mb-4" />

      <form className="panel max-w-4xl p-5" onSubmit={handleSubmit}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {goalNumberFields.map(([field, label, unit]) => (
            <label key={field}>
              <span className="mb-1 block text-sm font-semibold text-slate-700">
                {label} <span className="font-normal text-slate-400">({unit})</span>
              </span>
              <input
                className="field"
                type="number"
                min="0"
                step="0.1"
                value={goalForm[field]}
                onChange={(event) => updateField(field, event.target.value)}
              />
            </label>
          ))}

          <label>
            <span className="mb-1 block text-sm font-semibold text-slate-700">Activity</span>
            <select className="field" value={goalForm.activityLevel} onChange={(event) => updateField("activityLevel", event.target.value)}>
              {activityLevels.map((level) => (
                <option key={level} value={level}>
                  {level.charAt(0).toUpperCase() + level.slice(1)}
                </option>
              ))}
            </select>
          </label>
        </div>

        <button type="submit" className="btn-primary mt-5" disabled={status === "loading"}>
          <Save size={17} />
          Save goals
        </button>
      </form>
    </>
  );
};

export default GoalsPage;
