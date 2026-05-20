const MacroProgress = ({ label, value = 0, goal = 0, unit = "g", color = "bg-leaf" }) => {
  const progress = goal ? Math.min(100, Math.round((Number(value) / Number(goal)) * 100)) : 0;

  return (
    <div>
      <div className="mb-2 flex items-center justify-between gap-3 text-sm">
        <span className="font-semibold text-slate-800">{label}</span>
        <span className="text-slate-500">
          {Math.round(Number(value) || 0)} / {Math.round(Number(goal) || 0)} {unit}
        </span>
      </div>
      <div className="h-2 overflow-hidden rounded-full bg-slate-100">
        <div className={`h-full rounded-full ${color}`} style={{ width: `${progress}%` }} />
      </div>
    </div>
  );
};

export default MacroProgress;
