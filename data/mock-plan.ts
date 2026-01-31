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
