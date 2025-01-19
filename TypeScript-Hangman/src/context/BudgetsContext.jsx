import React, { useContext, useState } from "react";
import { v4 as uuidV4 } from "uuid";
import useLocalStorage from "../hooks/useLocalStorage";

const BudgetsContext = React.createContext();

export const UNCATEGORIZED_BUDGET_ID = "Uncategorized";

export const useBudgets = () => {
  return useContext(BudgetsContext);
};

/**
 * BudgetProvider essentially takes in some sort of prop and passes value of that prop to its children and the
 * children of their children and so forth and so on
 * Everything thats wrapped within budget provider, has access to that value being passed in
 * which makes it easy to share information and manage states across components.
 */
export const BudgetProvider = ({ children }) => {
  /**
   * Using use state here to change, set, and track budget/expense values as need arises.
   * Each budget/expense is put in an array and is indentified via a unique ID.
   * The arrays are then stored in local storage.
   */
  const [budgets, setBudgets] = useLocalStorage("budgets", []);
  const [expenses, setExpenses] = useLocalStorage("expenses", []);

  /**
   * This essentially looks through the array of expenses and returns a unique expense
   * by filtering the array based on the ID thats passed through.
   */
  const getBudgetExpenses = (budgetId) => {
    return expenses.filter((expense) => expense.budgetId === budgetId);
  };

  /**
   * This adds a new budget to an array of budgets by updating our budgets state. Each budget has a name and max value.
   * If a budget already exists, return that budget, otherwise construct a new array containing all the
   * previous budgets and add the new budget object to it.
   */
  const addBudget = ({ name, max }) => {
    setBudgets((prevBudgets) => {
      if (prevBudgets.find((budget) => budget.name === name)) {
        return prevBudgets;
      }
      return [...prevBudgets, { id: uuidV4(), name, max }];
    });
  };

  /**
   * Similar to the addBudget, This adds a new expense to an array of expenses by updating our expenses state. Each budget has a desc, amount, and budgetID value.
   * It works by constructing a new array of all the previous expenses and adding a new expense object to it.
   */
  const addExpense = ({ description, amount, budgetId }) => {
    setExpenses((prevExpenses) => {
      return [...prevExpenses, { id: uuidV4(), description, amount, budgetId }];
    });
  };
  /**
   * Deletes expenses by filtering array of expenses to disinclude ID of deleted expense
   */
  const deleteExpense = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.filter((expense) => expense.id !== id);
    });
  };

  /** Deletes budgets by filtering array of budgets to disinclude ID of deleted budgets */
  const deleteBudget = ({ id }) => {
    setExpenses((prevExpenses) => {
      return prevExpenses.map((expense) => {
        if (expense.budgetId !== id) return expense;
        return { ...expense, budgetId: UNCATEGORIZED_BUDGET_ID };
      });
    });
  };

  return (
    <BudgetsContext.Provider
      value={{
        budgets,
        expenses,
        getBudgetExpenses,
        addBudget,
        deleteBudget,
        addExpense,
        deleteExpense,
      }}
    >
      {children}
    </BudgetsContext.Provider>
  );
};
