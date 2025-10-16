"use client";

import React from "react";
import { Expense } from "@/types";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

type ChartsProps = {
  expenses: Expense[];
};

const COLORS = ["#6366f1", "#22c55e", "#ef4444", "#facc15", "#06b6d4"];

export default function Charts({ expenses }: ChartsProps) {
  type CategoryTotal = { category: string; total: number };

  // Group and sum expenses by category
  const byCategory: CategoryTotal[] = Object.values(
    expenses.reduce((acc: Record<string, CategoryTotal>, e) => {
      acc[e.category] = acc[e.category] || { category: e.category, total: 0 };
      acc[e.category].total += e.amount;
      return acc;
    }, {})
  );

  return (
    <div className="grid sm:grid-cols-2 gap-6">
      {/* Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-[#EA580C]">
          Expense by Category (Bar)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={byCategory}>
            <XAxis dataKey="category" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="total" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Pie Chart */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-3 text-[#EA580C]">
          Expense by Category (Pie)
        </h3>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={byCategory}
              dataKey="total"
              nameKey="category"
              outerRadius={80}
              label
            >
              {byCategory.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
