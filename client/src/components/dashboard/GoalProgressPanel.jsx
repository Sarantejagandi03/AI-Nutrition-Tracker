import MacroProgress from "../MacroProgress.jsx";

const GoalProgressPanel = ({ goals = {}, totals = {} }) => {
  return (
    <div className="panel p-4">
      <div className="mb-4">
        <h2 className="text-lg font-bold text-slate-950">Goal progress</h2>
        <p className="text-sm text-slate-500">Daily nutrition targets update as meals are saved.</p>
      </div>
      <div className="space-y-4">
        <MacroProgress label="Calories" value={totals.calories} goal={goals.calories} unit="kcal" color="bg-coral" />
        <MacroProgress label="Protein" value={totals.protein} goal={goals.protein} color="bg-leaf" />
        <MacroProgress label="Carbs" value={totals.carbs} goal={goals.carbs} color="bg-sky-600" />
        <MacroProgress label="Fats" value={totals.fats} goal={goals.fats} color="bg-amber-500" />
        <MacroProgress label="Water" value={totals.waterMl} goal={goals.waterMl} unit="ml" color="bg-cyan-600" />
      </div>
    </div>
  );
};

export default GoalProgressPanel;
