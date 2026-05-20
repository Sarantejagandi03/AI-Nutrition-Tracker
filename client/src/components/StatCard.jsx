const StatCard = ({ label, value, helper, icon: Icon, accent = "bg-limewash text-leaf" }) => {
  return (
    <div className="panel p-4">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-slate-500">{label}</p>
          <p className="mt-2 text-2xl font-bold text-slate-950">{value}</p>
          {helper ? <p className="mt-1 text-xs text-slate-500">{helper}</p> : null}
        </div>
        {Icon ? (
          <span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${accent}`}>
            <Icon size={20} />
          </span>
        ) : null}
      </div>
    </div>
  );
};

export default StatCard;
