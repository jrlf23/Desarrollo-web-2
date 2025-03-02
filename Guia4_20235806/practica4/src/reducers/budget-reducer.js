const initialBudget = () => {
  const localStorageBudget = localStorage.getItem("budget");
  return localStorageBudget ? parseFloat(localStorageBudget) : 0;
};

const localStorageExpenses = () => {
  const localStorageExpenses = localStorage.getItem("expenses");
  return localStorageExpenses ? JSON.parse(localStorageExpenses) : [];
};

export const initialState = {
  budget: initialBudget(),
  modal: false,
  expenses: localStorageExpenses(),
  editingId: "",
  currentCategory: "",
};

export const budgetReducer = (state, action) => {
  switch (action.type) {
    case "add-budget":
      localStorage.setItem("budget", action.payload.budget);
      return { ...state, budget: action.payload.budget };

    case "show-modal":
      return { ...state, modal: true };

    case "close-modal":
      return { ...state, modal: false, editingId: "" };

    case "remove-expense": {
      const updatedExpenses = state.expenses.filter(
        (expense) => expense.id !== action.payload.id
      );
      localStorage.setItem("expenses", JSON.stringify(updatedExpenses));
      return { ...state, expenses: updatedExpenses };
    }

    case "get-expense-by-id":
      return { ...state, editingId: action.payload.id, modal: true };

    case "update-expense": {
      const updatedExpenses = state.expenses.map(expense =>
        expense.id === action.payload.expense.id ? action.payload.expense : expense
      );
      const newTotalExpenses = updatedExpenses.reduce((total, expense) => total + expense.amount, 0);

      if (newTotalExpenses > state.budget) {
        return { ...state, error: "El gasto actualizado excede el presupuesto disponible." };
      }

      return {
        ...state,
        expenses: updatedExpenses,
        modal: false,
        editingId: "",
        error: "" 
      };
    }


    case "add-filter-category":
      return { ...state, currentCategory: action.payload.categoryId };

    case "add-expense": {
      const newTotalExpenses = state.expenses.reduce((total, expense) => total + expense.amount, 0) + action.payload.expense.amount;

      if (newTotalExpenses > state.budget) {
        return { ...state, error: "El gasto excede el presupuesto disponible." };
      }

      return {
        ...state,
        expenses: [...state.expenses, { ...action.payload.expense, id: new Date().getTime() }],
        modal: false,
        error: ""
      };
    }

    case "reset-app":
      localStorage.removeItem("budget");
      localStorage.removeItem("expenses");
      return {
        budget: 0,
        modal: false,
        expenses: [],
        editingId: "",
        currentCategory: ""
      };

    default:
      return state;
  }
};
