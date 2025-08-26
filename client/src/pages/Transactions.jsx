import React, { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";
import AddTransactionModal from "../components/AddTransactionModal";

const Transactions = () => {
  const { token, user } = useAuth();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isOpen, setIsOpen] = useState(false);

  const getTransactions = async () => {
    try {
      const res = await fetch("/api/transactions", {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      if (res.ok) {
        setTransactions(data.transactions);
      } else {
        console.error("Error fetching transactions:", data);
      }
    } catch (err) {
      console.error("Fetch failed:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getTransactions();
  }, []);

  return (
    <div className="min-h-screen w-full bg-gray-100 flex flex-col">
      <Navbar user={user} />
      <main className="flex-1 p-6">
        <h1 className="text-2xl font-bold text-gray-800 mb-4">Transactions</h1>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-500 hover:bg-blue-600 text-black px-4 py-2 rounded-lg transition"
        >
          Add new
        </button>
        {loading ? (
          <div className="flex justify-center items-center min-h-screen bg-gray-100">
            <p className="text-gray-500">Loading transactions...</p>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-xl shadow">
            {transactions.length === 0 ? (
              <p className="text-gray-500 text-center">
                No transactions found.
              </p>
            ) : (
              <ul className="space-y-4">
                {transactions.map((t) => (
                  <li
                    key={t.id}
                    className="flex justify-between items-center bg-gray-50 p-4 rounded-lg shadow-sm"
                  >
                    <div>
                      <p className="font-semibold text-gray-700">{t.title}</p>
                      <p className="text-gray-500 text-sm">{t.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold text-gray-800">${t.amount}</p>
                      <p className="text-gray-400 text-sm">{t.date}</p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        )}
      </main>
      <AddTransactionModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </div>
  );
};

export default Transactions;
