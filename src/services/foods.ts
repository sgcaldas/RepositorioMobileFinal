export type FoodItem = {
  id: number;
  title: string;
  image: string;
  calories: number;
  price: number;
  category: string;
};

type ApiRecipe = {
  id: number;
  name: string;
  image: string;
  caloriesPerServing: number;
  mealType?: string[];
};

type ApiResponse = { recipes: ApiRecipe[] };

export async function getFoods(): Promise<FoodItem[]> {
  const res = await fetch("https://dummyjson.com/recipes?limit=30");
  const json = (await res.json()) as ApiResponse;

  return json.recipes.map((r) => {
    const category = r.mealType?.[0] ?? "Other";
    const price = Math.round((r.caloriesPerServing * 0.08 + 6) * 100) / 100;
    return {
      id: r.id,
      title: r.name,
      image: r.image,
      calories: r.caloriesPerServing,
      price,
      category,
    };
  });
}
