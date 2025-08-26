import React, { useState, useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";

const TransactionModal = ({
  isOpen,
  onClose,
  onTransactionAdded,
  transaction,
}) => {
  const { token } = useAuth();
  const [form, setForm] = useState({
    title: "",
    type: "income",
    amount: "",
    date: "",
    description: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (transaction) {
      setForm({
        title: transaction.title || "",
        type: transaction.type || "income",
        amount: transaction.amount || "",
        date: transaction.date || "",
        description: transaction.description || "",
      });
    }
  }, [transaction]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});
    setLoading(true);

    const method = transaction ? "PUT" : "POST";
    const url = transaction
      ? `/api/transactions/${transaction.id}`
      : "/api/transactions/";

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();
      console.log(data)
      if (!res.ok) {
        setErrors(data.errors || {});
      } else {
        onTransactionAdded(data.transaction);
        onClose();
      }
    } catch (err) {
      console.error("Error saving transaction:", err);
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="absolute inset-0 bg-opacity-20 backdrop-blur-sm"
        onClick={onClose}
      ></div>

      <div className="relative bg-white/90 rounded-2xl p-6 w-full max-w-md shadow-lg">
        <h2 className="text-2xl font-bold mb-4">
          {transaction ? "Edit Transaction" : "Add New Transaction"}
        </h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-700">Title</label>
            <input
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.title && (
              <p className="text-red-500 text-sm">{errors.title[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Type</label>
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            >
              <option value="income">Income</option>
              <option value="expense">Expense</option>
            </select>
            {errors.type && (
              <p className="text-red-500 text-sm">{errors.type[0]}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700">Amount</label>
            <input
              type="number"
              name="amount"
              value={form.amount}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.amount && (
              <p className="text-red-500 text-sm">{errors.amount[0]}</p>
            )}
          </div>

          {/* Date */}
          <div>
            <label className="block text-gray-700">Date</label>
            <input
              type="date"
              name="date"
              value={form.date}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
            {errors.date && (
              <p className="text-red-500 text-sm">{errors.date[0]}</p>
            )}
          </div>

          {/* Description */}
          <div>
            <label className="block text-gray-700">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-green-300"
            />
          </div>

          {/* Buttons */}
          <div className="flex justify-end gap-4 mt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-md border hover:bg-gray-100 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-md bg-green-500 text-white hover:bg-green-600 transition"
            >
              {loading
                ? transaction
                  ? "Saving..."
                  : "Adding..."
                : transaction
                ? "Save Changes"
                : "Add Transaction"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TransactionModal;
