import { analyzeMealWithAI } from "./aiService.js";

const asNumber = (value) => Math.max(0, Math.round((Number(value) || 0) * 10) / 10);
const productFields = "product_name,nutriments,serving_size,brands,image_front_url";

const toNutritionRecord = (product, fallbackName, barcode) => {
  const nutriments = product.nutriments || {};

  return {
    name: product.product_name || product.brands || fallbackName,
    barcode,
    servingSize: product.serving_size || "100 g",
    calories: Math.round(Number(nutriments["energy-kcal_serving"] ?? nutriments["energy-kcal_100g"]) || 0),
    protein: asNumber(nutriments.proteins_serving ?? nutriments.proteins_100g),
    carbs: asNumber(nutriments.carbohydrates_serving ?? nutriments.carbohydrates_100g),
    fats: asNumber(nutriments.fat_serving ?? nutriments.fat_100g),
    imageUrl: product.image_front_url
  };
};

export const lookupBarcodeNutrition = async (barcode) => {
  if (!barcode) {
    const error = new Error("Barcode is required");
    error.statusCode = 400;
    throw error;
  }

  const response = await fetch(
    `https://world.openfoodfacts.org/api/v2/product/${encodeURIComponent(
      barcode
    )}.json?fields=${productFields}`
  );

  if (!response.ok) {
    const error = new Error("OpenFoodFacts lookup failed");
    error.statusCode = 502;
    throw error;
  }

  const productLookup = await response.json();
  const product = productLookup.product;

  if (productLookup.status !== 1 || !product) {
    const error = new Error("Food product not found for this barcode");
    error.statusCode = 404;
    throw error;
  }

  return toNutritionRecord(product, `Barcode ${barcode}`, barcode);
};

export const lookupMealNutritionByName = async (searchText) => {
  if (!searchText || !searchText.trim()) {
    const error = new Error("Meal name is required");
    error.statusCode = 400;
    throw error;
  }

  const searchUrl = new URL("https://world.openfoodfacts.org/cgi/search.pl");
  searchUrl.searchParams.set("search_terms", searchText.trim());
  searchUrl.searchParams.set("search_simple", "1");
  searchUrl.searchParams.set("action", "process");
  searchUrl.searchParams.set("json", "1");
  searchUrl.searchParams.set("page_size", "1");
  searchUrl.searchParams.set("fields", `${productFields},code`);

  const response = await fetch(searchUrl);

  if (!response.ok) {
    const error = new Error("Nutrition database lookup failed");
    error.statusCode = 502;
    throw error;
  }

  const searchResults = await response.json();
  const product = searchResults.products?.[0];

  if (!product) {
    const error = new Error("No nutrition database match found for this meal");
    error.statusCode = 404;
    throw error;
  }

  return toNutritionRecord(product, searchText.trim(), product.code);
};

export const estimateManualMealNutrition = async ({ name, description }) => {
  const mealText = description || name;
  return analyzeMealWithAI(mealText);
};
