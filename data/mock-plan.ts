export interface Meal {
  id: string
  name: string
  time: string
  calories: number
  protein: number
  carbs: number
  fat: number
  image: string
  ingredients: string[]
}

export interface DailyPlan {
  date: string
  targetCalories: number
  targetProtein: number
  targetCarbs: number
  targetFat: number
  waterGoal: number
  meals: Meal[]
}

export const mockPlan: DailyPlan = {
  date: new Date().toISOString().split('T')[0],
  targetCalories: 2200,
  targetProtein: 150,
  targetCarbs: 220,
  targetFat: 80,
  waterGoal: 8,
  meals: [
    {
      id: '1',
      name: 'Power Breakfast Bowl',
      time: '7:30 AM',
      calories: 450,
      protein: 35,
      carbs: 45,
      fat: 15,
      image: '/meals/breakfast.jpg',
      ingredients: ['Eggs', 'Avocado', 'Quinoa', 'Spinach', 'Cherry Tomatoes'],
    },
    {
      id: '2',
      name: 'Mediterranean Lunch',
      time: '12:30 PM',
      calories: 650,
      protein: 45,
      carbs: 55,
      fat: 28,
      image: '/meals/lunch.jpg',
      ingredients: ['Grilled Chicken', 'Hummus', 'Falafel', 'Mixed Greens', 'Olive Oil'],
    },
    {
      id: '3',
      name: 'Pre-Workout Snack',
      time: '4:00 PM',
      calories: 250,
      protein: 20,
      carbs: 30,
      fat: 8,
      image: '/meals/snack.jpg',
      ingredients: ['Greek Yogurt', 'Berries', 'Honey', 'Almonds'],
    },
    {
      id: '4',
      name: 'Lean Dinner',
      time: '7:30 PM',
      calories: 550,
      protein: 50,
      carbs: 40,
      fat: 22,
      image: '/meals/dinner.jpg',
      ingredients: ['Salmon', 'Brown Rice', 'Broccoli', 'Lemon', 'Herbs'],
    },
  ],
}

export const goals = [
  {
    id: 'weight-loss',
    title: 'Weight Loss',
    description: 'Burn fat and get lean',
    icon: '🔥',
    calories: -500,
  },
  {
    id: 'muscle-gain',
    title: 'Muscle Gain',
    description: 'Build strength and mass',
    icon: '💪',
    calories: +300,
  },
  {
    id: 'maintain',
    title: 'Maintain',
    description: 'Keep your current physique',
    icon: '⚖️',
    calories: 0,
  },
  {
    id: 'performance',
    title: 'Performance',
    description: 'Optimize for athletics',
    icon: '🏃',
    calories: +200,
  },
]

export const dietaryPreferences = [
  { id: 'none', label: 'No Restrictions' },
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'keto', label: 'Keto' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'gluten-free', label: 'Gluten Free' },
]

// Alternative meals for AI regeneration
export const alternativeMeals: Record<string, Meal[]> = {
  '1': [ // Breakfast alternatives
    {
      id: '1-alt-1',
      name: 'Greek Yogurt Parfait',
      time: '7:30 AM',
      calories: 380,
      protein: 28,
      carbs: 42,
      fat: 12,
      image: '/meals/breakfast-alt1.jpg',
      ingredients: ['Greek Yogurt', 'Granola', 'Mixed Berries', 'Honey', 'Chia Seeds'],
    },
    {
      id: '1-alt-2',
      name: 'Protein Pancakes',
      time: '7:30 AM',
      calories: 420,
      protein: 32,
      carbs: 48,
      fat: 14,
      image: '/meals/breakfast-alt2.jpg',
      ingredients: ['Oat Flour', 'Whey Protein', 'Eggs', 'Banana', 'Maple Syrup'],
    },
    {
      id: '1-alt-3',
      name: 'Avocado Toast Deluxe',
      time: '7:30 AM',
      calories: 440,
      protein: 22,
      carbs: 38,
      fat: 24,
      image: '/meals/breakfast-alt3.jpg',
      ingredients: ['Sourdough Bread', 'Avocado', 'Poached Eggs', 'Cherry Tomatoes', 'Feta'],
    },
  ],
  '2': [ // Lunch alternatives
    {
      id: '2-alt-1',
      name: 'Asian Chicken Salad',
      time: '12:30 PM',
      calories: 580,
      protein: 42,
      carbs: 48,
      fat: 22,
      image: '/meals/lunch-alt1.jpg',
      ingredients: ['Grilled Chicken', 'Cabbage', 'Edamame', 'Sesame Dressing', 'Cashews'],
    },
    {
      id: '2-alt-2',
      name: 'Turkey Wrap',
      time: '12:30 PM',
      calories: 520,
      protein: 38,
      carbs: 52,
      fat: 18,
      image: '/meals/lunch-alt2.jpg',
      ingredients: ['Whole Wheat Wrap', 'Turkey Breast', 'Avocado', 'Lettuce', 'Tomato'],
    },
    {
      id: '2-alt-3',
      name: 'Buddha Bowl',
      time: '12:30 PM',
      calories: 610,
      protein: 35,
      carbs: 65,
      fat: 24,
      image: '/meals/lunch-alt3.jpg',
      ingredients: ['Quinoa', 'Roasted Chickpeas', 'Sweet Potato', 'Kale', 'Tahini'],
    },
  ],
  '3': [ // Snack alternatives
    {
      id: '3-alt-1',
      name: 'Protein Shake',
      time: '4:00 PM',
      calories: 280,
      protein: 30,
      carbs: 22,
      fat: 8,
      image: '/meals/snack-alt1.jpg',
      ingredients: ['Whey Protein', 'Almond Milk', 'Banana', 'Peanut Butter'],
    },
    {
      id: '3-alt-2',
      name: 'Energy Bites',
      time: '4:00 PM',
      calories: 220,
      protein: 12,
      carbs: 28,
      fat: 10,
      image: '/meals/snack-alt2.jpg',
      ingredients: ['Oats', 'Dark Chocolate', 'Almond Butter', 'Honey', 'Flax Seeds'],
    },
    {
      id: '3-alt-3',
      name: 'Cottage Cheese Bowl',
      time: '4:00 PM',
      calories: 240,
      protein: 24,
      carbs: 18,
      fat: 8,
      image: '/meals/snack-alt3.jpg',
      ingredients: ['Cottage Cheese', 'Pineapple', 'Walnuts', 'Cinnamon'],
    },
  ],
  '4': [ // Dinner alternatives
    {
      id: '4-alt-1',
      name: 'Grilled Steak & Veggies',
      time: '7:30 PM',
      calories: 580,
      protein: 48,
      carbs: 28,
      fat: 32,
      image: '/meals/dinner-alt1.jpg',
      ingredients: ['Sirloin Steak', 'Asparagus', 'Bell Peppers', 'Garlic Butter', 'Herbs'],
    },
    {
      id: '4-alt-2',
      name: 'Shrimp Stir Fry',
      time: '7:30 PM',
      calories: 490,
      protein: 42,
      carbs: 45,
      fat: 16,
      image: '/meals/dinner-alt2.jpg',
      ingredients: ['Shrimp', 'Brown Rice', 'Snap Peas', 'Carrots', 'Ginger Sauce'],
    },
    {
      id: '4-alt-3',
      name: 'Chicken Tikka Masala',
      time: '7:30 PM',
      calories: 560,
      protein: 45,
      carbs: 42,
      fat: 24,
      image: '/meals/dinner-alt3.jpg',
      ingredients: ['Chicken Breast', 'Basmati Rice', 'Tomato Sauce', 'Yogurt', 'Spices'],
    },
  ],
}

// Function to get a random alternative meal
export function getAlternativeMeal(mealId: string): Meal | null {
  const baseMealId = mealId.split('-')[0] // Get base ID (e.g., '1' from '1-alt-1')
  const alternatives = alternativeMeals[baseMealId]
  if (!alternatives || alternatives.length === 0) return null
  
  // Get a random alternative
  const randomIndex = Math.floor(Math.random() * alternatives.length)
  return alternatives[randomIndex]
}

// Function to regenerate all meals
export function regenerateAllMeals(): Meal[] {
  return mockPlan.meals.map(meal => {
    const alternative = getAlternativeMeal(meal.id)
    // 50% chance to swap each meal
    if (alternative && Math.random() > 0.5) {
      return { ...alternative, id: meal.id } // Keep original ID for state tracking
    }
    return meal
  })
}
