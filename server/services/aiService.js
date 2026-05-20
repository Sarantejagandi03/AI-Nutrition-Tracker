const fallbackFoods = [
  { pattern: /egg/i, singular: "egg", calories: 78, protein: 6.3, carbs: 0.6, fats: 5.3 },
  { pattern: /banana/i, singular: "banana", calories: 105, protein: 1.3, carbs: 27, fats: 0.3 },
  { pattern: /apple/i, singular: "apple", calories: 95, protein: 0.5, carbs: 25, fats: 0.3 },
  { pattern: /rice/i, singular: "cup rice", calories: 206, protein: 4.3, carbs: 45, fats: 0.4 },
  { pattern: /chicken/i, singular: "serving chicken", calories: 231, protein: 43, carbs: 0, fats: 5 },
  { pattern: /bread/i, singular: "slice bread", calories: 80, protein: 3, carbs: 15, fats: 1 },
  { pattern: /milk/i, singular: "cup milk", calories: 122, protein: 8, carbs: 12, fats: 4.8 },
  { pattern: /oats|oatmeal/i, singular: "bowl oats", calories: 154, protein: 6, carbs: 27, fats: 3 },
  { pattern: /dal|lentil/i, singular: "cup dal", calories: 230, protein: 18, carbs: 40, fats: 1 },
  { pattern: /paneer/i, singular: "100g paneer", calories: 265, protein: 18, carbs: 6, fats: 20 }
];

const numberWords = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10
};

const roundMacro = (value) => Math.round(value * 10) / 10;

const extractJson = (text) => {
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}");

  if (start === -1 || end === -1 || end <= start) {
    throw new Error("AI response did not include JSON");
  }

  return JSON.parse(text.slice(start, end + 1));
};

const parseQuantity = (description, keyword) => {
  const quantityPattern = new RegExp(`(\\d+(?:\\.\\d+)?|one|two|three|four|five|six|seven|eight|nine|ten)\\s+[^,.]*${keyword}`, "i");
  const match = description.match(quantityPattern);

  if (!match) {
    return 1;
  }

  const value = match[1].toLowerCase();
  return Number(value) || numberWords[value] || 1;
};

const fallbackAnalyzeMeal = (description) => {
  const normalizedMeal = description.trim();
  const matchedItems = [];
  const macroTotals = { calories: 0, protein: 0, carbs: 0, fats: 0 };

  fallbackFoods.forEach((food) => {
    if (!food.pattern.test(normalizedMeal)) {
      return;
    }

    const keyword = food.pattern.source.replace("\\", "").split("|")[0];
    const quantity = parseQuantity(normalizedMeal, keyword);

    matchedItems.push({
      name: food.singular,
      quantity,
      calories: Math.round(food.calories * quantity),
      protein: roundMacro(food.protein * quantity),
      carbs: roundMacro(food.carbs * quantity),
      fats: roundMacro(food.fats * quantity)
    });

    macroTotals.calories += food.calories * quantity;
    macroTotals.protein += food.protein * quantity;
    macroTotals.carbs += food.carbs * quantity;
    macroTotals.fats += food.fats * quantity;
  });

  if (matchedItems.length === 0) {
    return {
      name: normalizedMeal || "Manual meal",
      calories: 450,
      protein: 20,
      carbs: 50,
      fats: 15,
      servingSize: "estimated serving",
      confidence: "low",
      items: []
    };
  }

  return {
    name: matchedItems.map((foodItem) => `${foodItem.quantity} ${foodItem.name}`).join(", "),
    calories: Math.round(macroTotals.calories),
    protein: roundMacro(macroTotals.protein),
    carbs: roundMacro(macroTotals.carbs),
    fats: roundMacro(macroTotals.fats),
    servingSize: "AI estimated serving",
    confidence: "estimated",
    items: matchedItems
  };
};

export const analyzeMealWithAI = async (description) => {
  if (!description || !description.trim()) {
    const error = new Error("Meal description is required");
    error.statusCode = 400;
    throw error;
  }

  const apiKey = process.env.GEMINI_API_KEY;
  const model = process.env.GEMINI_MODEL || "gemini-1.5-flash";

  if (!apiKey) {
    return fallbackAnalyzeMeal(description);
  }

  const prompt = `
Analyze this meal and return only JSON with this shape:
{
  "name": "short meal name",
  "calories": number,
  "protein": number,
  "carbs": number,
  "fats": number,
  "servingSize": "short serving text",
  "confidence": "low|medium|high",
  "items": [{"name": "food", "quantity": number, "calories": number, "protein": number, "carbs": number, "fats": number}]
}
Meal: ${description}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
        generationConfig: { temperature: 0.2, responseMimeType: "application/json" }
      })
    }
  );

  if (!response.ok) {
    return fallbackAnalyzeMeal(description);
  }

  const geminiPayload = await response.json();
  const modelText = geminiPayload.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!modelText) {
    return fallbackAnalyzeMeal(description);
  }

  try {
    const mealEstimate = extractJson(modelText);

    return {
      name: mealEstimate.name || description,
      calories: Math.max(0, Math.round(Number(mealEstimate.calories) || 0)),
      protein: roundMacro(Number(mealEstimate.protein) || 0),
      carbs: roundMacro(Number(mealEstimate.carbs) || 0),
      fats: roundMacro(Number(mealEstimate.fats) || 0),
      servingSize: mealEstimate.servingSize || "AI estimated serving",
      confidence: mealEstimate.confidence || "medium",
      items: Array.isArray(mealEstimate.items) ? mealEstimate.items : []
    };
  } catch (_error) {
    return fallbackAnalyzeMeal(description);
  }
};
