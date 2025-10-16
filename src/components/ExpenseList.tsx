"use client";

import React, { useState } from "react";
import { Expense } from "@/types";
import { Pencil, Trash2, Check, X } from "lucide-react";

type Props = {
  expenses: Expense[];
  onDelete: (id: string) => void;
  onEdit: (expense: Expense) => void;
};

export default function ExpenseList({ expenses, onDelete, onEdit }: Props) {
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editedExpense, setEditedExpense] = useState<Expense | null>(null);

  const handleEdit = (expense: Expense) => {
    setEditingId(expense.id);
    setEditedExpense({ ...expense });
  };

  const handleSave = () => {
    if (editedExpense) {
      onEdit(editedExpense);
      setEditingId(null);
      setEditedExpense(null);
    }
  };

  if (expenses.length === 0) {
    return (
      <p className="text-center text-gray-500 bg-white py-6 rounded-lg shadow border border-[#FED7AA]">
        No expenses yet for this month ✨
      </p>
    );
  }

  return (
    <div className="bg-white p-5 rounded-lg shadow-md border border-[#FED7AA]">
      <h2 className="text-lg font-semibold mb-4 text-[#D97706]">Expenses</h2>
      <ul className="space-y-3">
        {expenses.map((exp) => (
          <li
            key={exp.id}
            className="flex flex-col sm:flex-row justify-between items-start sm:items-center p-3 border rounded-lg hover:shadow transition bg-[#FFF7ED]"
          >
            {editingId === exp.id ? (
              <div className="w-full flex flex-col sm:flex-row gap-2 text-black ">
                <input
                  type="text"
                  value={editedExpense?.title || ""}
                  onChange={(e) =>
                    setEditedExpense({ ...editedExpense!, title: e.target.value })
                  }
                  className="border rounded p-2 w-full sm:w-1/3 "
                />
                <input
                  type="number"
                  value={editedExpense?.amount || ""}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense!,
                      amount: parseFloat(e.target.value),
                    })
                  }
                  className="border rounded p-2 w-full sm:w-1/4"
                />
                <input
                  type="text"
                  value={editedExpense?.category || ""}
                  onChange={(e) =>
                    setEditedExpense({
                      ...editedExpense!,
                      category: e.target.value,
                    })
                  }
                  className="border rounded p-2 w-full sm:w-1/3"
                />
                <div className="flex items-center gap-2">
                  <button
                    onClick={handleSave}
                    className="bg-green-500 text-white p-2 rounded-lg hover:bg-green-600"
                  >
                    <Check size={16} />
                  </button>
                  <button
                    onClick={() => setEditingId(null)}
                    className="bg-gray-400 text-white p-2 rounded-lg hover:bg-gray-500"
                  >
                    <X size={16} />
                  </button>
                </div>
              </div>
            ) : (
              <div className="w-full flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                <div>
                  <p className="font-semibold text-gray-800 ">{exp.title}</p>
                  <p className="text-sm text-gray-600">
                    ₦{exp.amount.toLocaleString()} • {exp.category} •{" "}
                    <span className="text-xs text-gray-500">{exp.date}</span>
                  </p>
                </div>
                <div className="flex gap-2">
                  <button
                    onClick={() => handleEdit(exp)}
                    className="text-[#F97316] hover:text-[#EA580C]"
                  >
                    <Pencil size={18} />
                  </button>
                  <button
                    onClick={() => onDelete(exp.id)}
                    className="text-red-500 hover:text-red-600"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
