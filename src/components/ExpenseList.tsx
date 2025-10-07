"use client";

import React from "react";

import { Expense } from "@/types";

type ExpenseListProps = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit?: (expense: Expense) => void; // make optional
};



export default function ExpenseList({ expenses, onDelete }: ExpenseListProps) {
  if (expenses.length === 0)
    return <p className="text-center text-gray-500">No expenses yet...</p>;

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h2 className="text-xl font-semibold mb-3 text-indigo-700">All Expenses</h2>
      <ul className="space-y-3">
        {expenses.map((e) => (
          <li
            key={e.id}
            className="flex justify-between items-center border-b pb-2"
          >
            <div>
              <p className="font-medium">{e.title}</p>
              <p className="text-sm text-gray-500">
                {e.category} • {e.date}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="font-semibold text-indigo-700">₦{e.amount}</span>
              <button
                onClick={() => onDelete(e.id)}
                className="text-red-500 hover:text-red-700 text-sm"
              >
                Delete
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
