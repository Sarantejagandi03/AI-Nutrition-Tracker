import { Droplets } from "lucide-react";

const WaterQuickAdd = ({ onAdd, busy }) => {
  return (
    <div className="panel p-4">
      <div className="mb-3 flex items-center justify-between gap-3">
        <div>
          <h2 className="text-lg font-bold text-slate-950">Water</h2>
          <p className="text-sm text-slate-500">Quick log hydration.</p>
        </div>
        <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-skywash text-sky-700">
          <Droplets size={20} />
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {[250, 500, 750].map((amount) => (
          <button key={amount} type="button" className="btn-secondary px-2" onClick={() => onAdd(amount)} disabled={busy}>
            {amount} ml
          </button>
        ))}
      </div>
    </div>
  );
};

export default WaterQuickAdd;
