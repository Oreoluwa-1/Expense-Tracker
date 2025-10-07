"use client";

import React, { useState, useEffect } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import Charts from "@/components/Charts";

export default function HomePage() {
  const [expenses, setExpenses] = useState<any[]>([]);

  // Load from localStorage on first render
  useEffect(() => {
    const stored = localStorage.getItem("expenses");
    if (stored) setExpenses(JSON.parse(stored));
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const addExpense = (expense: any) => {
    setExpenses([...expenses, expense]);
  };

  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Calculate total expense
  const totalExpense = expenses.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0
  );

  return (
    <main className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-6 text-indigo-700">
          Expense Tracker 💸
        </h1>

        {/* Expense Form */}
        <ExpenseForm onAdd={addExpense} />

        {/* Total Expense Section */}
        <div className="bg-white shadow-md rounded-lg p-4 mt-6 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-1">
            Total Spent
          </h2>
          <p className="text-3xl font-bold text-indigo-600">
            ₦{totalExpense.toLocaleString()}
          </p>
        </div>

        {/* Expense List */}
        <div className="mt-6">
          <ExpenseList expenses={expenses} onDelete={deleteExpense} />
        </div>

        {/* Charts Section */}
        <div className="mt-10">
          <Charts expenses={expenses} />
        </div>
      </div>
    </main>
  );
}
