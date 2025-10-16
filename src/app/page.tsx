"use client";

import React, { useEffect, useState } from "react";
import ExpenseForm from "@/components/ExpenseForm";
import ExpenseList from "@/components/ExpenseList";
import Charts from "@/components/Charts";
import { Expense } from "@/types";
import jsPDF from "jspdf";

export default function HomePage() {
  const [expenses, setExpenses] = useState<Expense[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("");
  const [months, setMonths] = useState<string[]>([]);

  // Load data from localStorage
  useEffect(() => {
    const stored = localStorage.getItem("monthlyExpenses");
    if (stored) {
      const parsed = JSON.parse(stored);
      const allMonths = Object.keys(parsed);
      setMonths(allMonths);
      const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
      setSelectedMonth(currentMonth);
      setExpenses(parsed[currentMonth] || []);
    } else {
      const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
      setSelectedMonth(currentMonth);
      setMonths([currentMonth]);
    }
  }, []);

  // Save to localStorage whenever expenses change
  useEffect(() => {
    const stored = localStorage.getItem("monthlyExpenses");
    const parsed = stored ? JSON.parse(stored) : {};
    parsed[selectedMonth] = expenses;
    localStorage.setItem("monthlyExpenses", JSON.stringify(parsed));
  }, [expenses, selectedMonth]);

  // Add new expense
  const addExpense = (expense: Expense) => {
    setExpenses([...expenses, expense]);
  };

  // Delete expense
  const deleteExpense = (id: string) => {
    setExpenses(expenses.filter((e) => e.id !== id));
  };

  // Edit expense
  const editExpense = (updated: Expense) => {
    setExpenses(expenses.map((e) => (e.id === updated.id ? updated : e)));
  };

  // Switch month
  const handleMonthChange = (month: string) => {
    const stored = JSON.parse(localStorage.getItem("monthlyExpenses") || "{}");
    setSelectedMonth(month);
    setExpenses(stored[month] || []);
  };

  // Export to PDF
  const exportToPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(18);
    doc.text(`Expense Report - ${selectedMonth}`, 20, 20);
    doc.setFontSize(12);
    let y = 40;
    expenses.forEach((exp, index) => {
      doc.text(`${index + 1}. ${exp.title} - ₦${exp.amount} (${exp.category}) on ${exp.date}`, 20, y);
      y += 10;
    });
    doc.text(`Total: ₦${totalExpense.toLocaleString()}`, 20, y + 10);
    doc.save(`Expense_${selectedMonth}.pdf`);
  };

  // Total
  const totalExpense = expenses.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);

  const currentMonth = new Date().toLocaleString("default", { month: "long", year: "numeric" });
  if (!months.includes(currentMonth)) setMonths([...months, currentMonth]);

  return (
    <main className="min-h-screen bg-[#FFF9F3] p-6">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-center mb-4 text-[#D97706]">
           Expenses Tracker
        </h1>

        
       {/* Month Selector */}
<div className="flex flex-col sm:flex-row justify-between items-center bg-white p-4 rounded-lg shadow-md border border-[#FED7AA] mb-6">
  <h2 className="text-lg font-semibold text-[#D97706] mb-3 sm:mb-0">
    Monthly Expenses
  </h2>
  <div className="flex items-center gap-2">
    <span className="text-sm font-medium text-gray-700">Viewing:</span>
    <select
      className="border border-[#F97316] bg-[#FFF7ED] rounded-lg px-3 py-2 text-sm text-[#D97706] font-semibold cursor-pointer transition-all hover:bg-[#F97316] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#F97316]"
      value={selectedMonth}
      onChange={(e) => handleMonthChange(e.target.value)}
    >
      {months.map((month) => (
        <option key={month} className="bg-white text-[#D97706]">
          {month}
        </option>
      ))}
    </select>
  </div>
</div>


        {/* Expense Form */}
        <ExpenseForm onAdd={addExpense} />

        {/* Total Expense */}
        <div className="bg-white shadow rounded-lg p-4 mt-6 text-center border border-[#FED7AA]">
          <h2 className="text-xl font-semibold text-gray-700 mb-1">
            Total Spent
          </h2>
          <p className="text-3xl font-bold text-[#EA580C]">
            ₦{totalExpense.toLocaleString()}
          </p>
          <button
            onClick={exportToPDF}
            className="mt-3 bg-[#F97316] hover:bg-[#EA580C] text-white px-4 py-2 rounded-lg text-sm"
          >
            Export as PDF
          </button>
        </div>

        {/* Expense List */}
        <div className="mt-6">
          <ExpenseList expenses={expenses} onDelete={deleteExpense} onEdit={editExpense} />
        </div>

        {/* Charts Section */}
        <div className="mt-10">
          <Charts expenses={expenses} />
        </div>
      </div>
    </main>
  );
}
