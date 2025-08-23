"use client";

import { useState, useEffect } from "react";

export default function Dashboard() {
  const [serviceData, setServiceData] = useState(null);
  const [transactionData, setTransactionData] = useState([]);
  const [note, setNote] = useState("");

  useEffect(() => {
    // Fetch service data
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/customer/dashboard`)
      .then((res) => res.json())
      .then((data) => setServiceData(data.data))
      .catch((error) => console.error("Error fetching service data:", error));

    // Fetch transaction history
    fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/transaction/history/detail`)
      .then((res) => res.json())
      .then((data) => setTransactionData(data.data))
      .catch((error) => console.error("Error fetching transaction history:", error));
  }, []);

  const submitNote = async () => {
    const payload = {
      task_id: "16003715",
      note: note,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/request-du`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error submitting note:", error);
    }
  };

  return (
    <div className="container mx-auto p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Layanan yang dipakai Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Layanan yang dipakai:</h3>
          {serviceData ? (
            <div>
              <p><strong>Product Name:</strong> {serviceData.Product_Name}</p>
              <p><strong>Status:</strong> {serviceData.Status}</p>
              <p><strong>Bill Status:</strong> {serviceData.Bill_Status}</p>
              <p><strong>Total Payment:</strong> {serviceData.Total_Payment}</p>
              <p><strong>Due Date:</strong> {serviceData.Due_Date}</p>
            </div>
          ) : (
            <p>Loading...</p>
          )}
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Note"
              rows="3"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded"
              onClick={submitNote}
            >
              Submit
            </button>
          </div>
        </div>

        {/* Cek Kecepatan Internet Card */}
        <div className="bg-white p-4 rounded-lg shadow text-center">
          <h3 className="text-lg font-semibold mb-2">Cek Kecepatan Internet</h3>
          <p>Speed: 25 Mbps</p>
          <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded">
            Speed Test
          </button>
          <script src="https://cdn.jsdelivr.net/npm/speedtest-net@0.0.2/dist/speedtest.min.js"></script>
        </div>

        {/* Average Data Usage Card */}
        <div className="bg-white p-4 rounded-lg shadow text-right">
          <h3 className="text-lg font-semibold mb-2">Average Data Usage</h3>
          <p>{serviceData ? `${serviceData.GB_in} GB` : "0 GB"} / Bulan</p>
        </div>
      </div>

      {/* Histori Transaksi Card */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Histori Transaksi</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-gray-200">
              <th className="border p-2">Tanggal Pembayaran</th>
              <th className="border p-2">Paket / Layanan</th>
              <th className="border p-2">Metode Pembayaran</th>
              <th className="border p-2">Total</th>
              <th className="border p-2">Status</th>
            </tr>
          </thead>
          <tbody>
            {transactionData.map((transaction, index) => (
              <tr key={index} className="border">
                <td className="border p-2">{transaction.Payment_Date}</td>
                <td className="border p-2">{transaction.Sub_Product}</td>
                <td className="border p-2">{transaction.Payment_Method}</td>
                <td className="border p-2">Rp {transaction.Total}</td>
                <td className="border p-2">{transaction.AR_Status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}