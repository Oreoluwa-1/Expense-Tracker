"use client";

import React, { useState } from "react";
import { Expense } from "@/types";
import { v4 as uuidv4 } from "uuid";

type Props = {
  onAdd: (expense: Expense) => void;
};

export default function ExpenseForm({ onAdd }: Props) {
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !amount || !category) return;

    const newExpense: Expense = {
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
      className="bg-white p-5 rounded-lg shadow-md border border-[#FED7AA]"
    >
      <h2 className="text-lg font-semibold mb-4 text-[#D97706]">
        Add New Expense
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#F97316] text-black"
        />
        <input
          type="number"
          placeholder="Amount (₦)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#F97316] text-black"
        />
        <input
          type="text"
          placeholder="Category (e.g. Food, Transport)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
          className="border border-gray-300 rounded-lg p-2 text-sm focus:outline-none focus:border-[#F97316] text-black"
        />
      </div>
      <button
        type="submit"
        className="mt-4 bg-[#F97316] hover:bg-[#EA580C] text-white px-5 py-2 rounded-lg w-full sm:w-auto text-sm font-medium"
      >
        Add Expense
      </button>
    </form>
  );
}
