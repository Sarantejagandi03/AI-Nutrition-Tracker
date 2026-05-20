import { CheckCircle2 } from "lucide-react";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import BarcodeScanner from "../components/BarcodeScanner.jsx";
import ErrorMessage from "../components/common/ErrorMessage.jsx";
import MealList from "../components/MealList.jsx";
import PageHeader from "../components/PageHeader.jsx";
import { createBarcodeMeal, fetchMeals, fetchSummary } from "../redux/mealsSlice.js";

const ScannerPage = () => {
  const dispatch = useDispatch();
  const { items: meals, actionStatus, error } = useSelector((state) => state.meals);
  const [scanMessage, setScanMessage] = useState("");
  const busy = actionStatus === "loading";

  useEffect(() => {
    dispatch(fetchMeals());
  }, [dispatch]);

  const handleDetected = async (barcode) => {
    setScanMessage("");
    const scanAttempt = await dispatch(createBarcodeMeal({ barcode }));

    if (createBarcodeMeal.fulfilled.match(scanAttempt)) {
      setScanMessage(`${scanAttempt.payload.name} saved from barcode ${barcode}`);
      dispatch(fetchSummary());
      dispatch(fetchMeals());
    }
  };

  return (
    <>
      <PageHeader title="Barcode Scanner" eyebrow="OpenFoodFacts" />

      {scanMessage ? (
        <p className="mb-4 flex items-center gap-2 rounded-md bg-emerald-50 p-3 text-sm font-semibold text-emerald-700">
          <CheckCircle2 size={17} />
          {scanMessage}
        </p>
      ) : null}
      <ErrorMessage message={error} className="mb-4" />

      <BarcodeScanner onDetected={handleDetected} busy={busy} />

      <section className="mt-6">
        <h2 className="mb-3 text-lg font-bold text-slate-950">Latest scans</h2>
        <MealList meals={meals.filter((meal) => meal.source === "barcode").slice(0, 5)} compact />
      </section>
    </>
  );
};

export default ScannerPage;
