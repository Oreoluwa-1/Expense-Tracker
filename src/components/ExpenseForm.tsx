"use client";

import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { Expense } from "@/types";

type ExpenseFormProps = {
  onAdd: (expense: Expense) => void;
};

export default function ExpenseForm({ onAdd }: ExpenseFormProps) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    const newExpense = {
      id: uuidv4(),
      title,
      amount: parseFloat(amount),
      category,
      date: new Date().toLocaleDateString(),
    };

    onAdd(newExpense);
    setTitle("");
    setAmount("");
    setCategory("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row gap-3"
    >
      <input
        type="text"
        placeholder="Expense title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="border p-2 rounded flex-1 text-black"
      />
      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="border p-2 rounded w-24 text-black"
      />
      <input
        type="text"
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border p-2 rounded flex-1 text-black"
      />
      <button
        type="submit"
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Add
      </button>
    </form>
  );
}
