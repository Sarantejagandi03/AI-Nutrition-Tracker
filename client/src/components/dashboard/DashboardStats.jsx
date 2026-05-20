import { Activity, Beef, Flame, Wheat } from "lucide-react";
import StatCard from "../StatCard.jsx";

const DashboardStats = ({ mealsCount, status, totals = {}, goals = {} }) => {
  return (
    <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      <StatCard
        label="Calories"
        value={Math.round(totals.calories || 0)}
        helper={`${Math.round(goals.calories || 0)} kcal target`}
        icon={Flame}
        accent="bg-orange-50 text-coral"
      />
      <StatCard
        label="Protein"
        value={`${Math.round(totals.protein || 0)}g`}
        helper={`${Math.round(goals.protein || 0)}g target`}
        icon={Beef}
      />
      <StatCard
        label="Carbs"
        value={`${Math.round(totals.carbs || 0)}g`}
        helper={`${Math.round(goals.carbs || 0)}g target`}
        icon={Wheat}
        accent="bg-skywash text-sky-700"
      />
      <StatCard
        label="Meals"
        value={totals.count || mealsCount || 0}
        helper={status === "loading" ? "Syncing" : "Logged today"}
        icon={Activity}
        accent="bg-slate-100 text-slate-700"
      />
    </section>
  );
};

export default DashboardStats;
