import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AIMealForm from "../components/AIMealForm.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import DashboardStats from "../components/dashboard/DashboardStats.jsx";
import GoalProgressPanel from "../components/dashboard/GoalProgressPanel.jsx";
import MacroChart from "../components/MacroChart.jsx";
import ManualMealForm from "../components/ManualMealForm.jsx";
import MealList from "../components/MealList.jsx";
import PageHeader from "../components/PageHeader.jsx";
import WaterQuickAdd from "../components/WaterQuickAdd.jsx";
import { fetchGoal } from "../redux/goalsSlice.js";
import { createAIMeal, createDatabaseMeal, createManualMeal, fetchMeals, fetchSummary, logWater } from "../redux/mealsSlice.js";

const macroFields = ["calories", "protein", "carbs", "fats"];

const DashboardPage = () => {
  const dispatch = useDispatch();
  const { items: meals, summary, status, actionStatus, error } = useSelector((state) => state.meals);
  const { item: savedGoal } = useSelector((state) => state.goals);
  const savingMeal = actionStatus === "loading";
  const dailyTotals = summary?.totals || {};
  const dailyGoals = summary?.goals || savedGoal || {};

  const refreshDashboard = useCallback(() => {
    dispatch(fetchMeals());
    dispatch(fetchSummary());
    dispatch(fetchGoal());
  }, [dispatch]);

  useEffect(() => {
    refreshDashboard();
  }, [refreshDashboard]);

  const handleManualSubmit = async (mealPayload) => {
    const hasFullMacros = macroFields.every((field) => mealPayload[field] !== "");
    const saveAttempt = hasFullMacros ? await dispatch(createManualMeal(mealPayload)) : await dispatch(createDatabaseMeal(mealPayload));

    if (createManualMeal.fulfilled.match(saveAttempt) || createDatabaseMeal.fulfilled.match(saveAttempt)) {
      dispatch(fetchSummary());
    }
  };

  const handleAISubmit = async (mealPrompt) => {
    const aiSaveAttempt = await dispatch(createAIMeal(mealPrompt));

    if (createAIMeal.fulfilled.match(aiSaveAttempt)) {
      dispatch(fetchSummary());
    }
  };

  const handleWaterAdd = async (amountMl) => {
    const waterLogAttempt = await dispatch(logWater({ amountMl }));

    if (logWater.fulfilled.match(waterLogAttempt)) {
      dispatch(fetchSummary());
    }
  };

  return (
    <>
      <PageHeader title="Dashboard" eyebrow="Today" />

      <ErrorMessage message={error} className="mb-4" />

      <DashboardStats mealsCount={meals.length} status={status} totals={dailyTotals} goals={dailyGoals} />

      <section className="mt-6 grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(340px,0.85fr)]">
        <div className="space-y-6">
          <GoalProgressPanel totals={dailyTotals} goals={dailyGoals} />

          <div>
            <div className="mb-3 flex items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-slate-950">Recent meals</h2>
            </div>
            <MealList meals={meals.slice(0, 5)} compact />
          </div>
        </div>

        <div className="space-y-6">
          <MacroChart totals={dailyTotals} />
          <WaterQuickAdd onAdd={handleWaterAdd} busy={savingMeal} />
        </div>
      </section>

      <section className="mt-6 grid gap-6 xl:grid-cols-2">
        <AIMealForm onSubmit={handleAISubmit} busy={savingMeal} />
        <ManualMealForm onSubmit={handleManualSubmit} busy={savingMeal} />
      </section>
    </>
  );
};

export default DashboardPage;
