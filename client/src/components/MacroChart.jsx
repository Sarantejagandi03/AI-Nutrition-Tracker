import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";
import { macroDataFromTotals } from "../utils/formatters.js";

const MacroChart = ({ totals }) => {
  const macroSlices = macroDataFromTotals(totals);
  const hasLoggedMacros = macroSlices.some((macro) => macro.value > 0);

  return (
    <div className="panel p-4">
      <div className="mb-3">
        <h2 className="text-lg font-bold text-slate-950">Macro split</h2>
        <p className="text-sm text-slate-500">Protein, carbs, and fats consumed today.</p>
      </div>

      <div className="h-64">
        {hasLoggedMacros ? (
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie data={macroSlices} dataKey="value" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={4}>
                {macroSlices.map((slice) => (
                  <Cell key={slice.name} fill={slice.fill} />
                ))}
              </Pie>
              <Tooltip formatter={(value) => [`${value} g`, ""]} />
            </PieChart>
          </ResponsiveContainer>
        ) : (
          <div className="flex h-full items-center justify-center rounded-lg border border-dashed border-slate-300 text-sm font-medium text-slate-500">
            Add meals to chart macros
          </div>
        )}
      </div>
    </div>
  );
};

export default MacroChart;
