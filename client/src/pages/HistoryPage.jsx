import { RefreshCw } from "lucide-react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import MealList from "../components/MealList.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { fetchMeals, fetchSummary, removeMeal } from "../redux/mealsSlice.js";

const HistoryPage = () => {
  const dispatch = useDispatch();
  const { items: meals, status, actionStatus, error } = useSelector((state) => state.meals);

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const handleDelete = async (mealId) => {
    const deleteAttempt = await dispatch(removeMeal(mealId));

    if (removeMeal.fulfilled.match(deleteAttempt)) {
      dispatch(fetchSummary());
    }
  };

  return (
    <>
      <PageHeader title="Meal History" eyebrow="Records">
        <button type="button" className="btn-secondary" onClick={() => dispatch(fetchMeals())} disabled={status === "loading"}>
          <RefreshCw size={17} />
          Refresh
        </button>
      </PageHeader>

      <ErrorMessage message={error} className="mb-4" />

      <MealList meals={meals} onDelete={handleDelete} />

      {actionStatus === "loading" ? <p className="mt-3 text-sm font-medium text-slate-500">Updating history...</p> : null}
    </>
  );
};

export default HistoryPage;
