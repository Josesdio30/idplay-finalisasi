"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

interface ServiceData {
  ID: number;
  Task_ID: string;
  Customer_Name: string;
  Product_Code: string;
  Product_Name: string;
  Status: string;
  Bill_Status: string;
  Notification_Message: string;
  Due_Date: string;
  Inv_Date: string;
  Total_Payment: number;
  AR_Remain: number;
  AR_Paid: number;
  Period: string;
  Points: number;
  GB_in: number;
}

interface TransactionData {
  Payment_Date: string;
  Sub_Product: string;
  Payment_Method: string;
  Total: number;
  AR_Status: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoggedIn, logout } = useAuth();
  const [serviceData, setServiceData] = useState<ServiceData | null>(null);
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [note, setNote] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    // Cek apakah user sudah login
    if (!isLoggedIn || !user) {
      router.push("/login");
      return;
    }
    
    // Ambil task_id pertama sebagai default
    if (user.task_id && user.task_id.length > 0) {
      setSelectedTaskId(user.task_id[0]);
      fetchDashboardData(user.task_id[0], user.token);
    }
  }, [isLoggedIn, user, router]);

  const fetchDashboardData = async (taskId: string, token: string) => {
    setIsLoading(true);
    setError(null);
    try {
      // Gunakan GET method dengan query parameters
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}customer/dashboard?task_id=${taskId}`, {
        method: "GET",
        headers: {
          "Authorization": `Bearer ${token}`
        }
        // Tidak ada body untuk GET request
      });

      const data = await response.json();
      if (data.status === "success") {
        setServiceData(data.data);
      } else {
        setError(data.message || "Gagal mengambil data dashboard");
      }
    } catch (error) {
      console.error("Error fetching dashboard data:", error);
      setError("Terjadi kesalahan jaringan");
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskIdChange = (taskId: string) => {
    setSelectedTaskId(taskId);
    if (user?.token) {
      fetchDashboardData(taskId, user.token);
    }
  };

  const submitNote = async () => {
    if (!note.trim()) {
      setError("Note tidak boleh kosong");
      return;
    }

    const payload = {
      task_id: selectedTaskId,
      note: note,
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}request-du`, {
        method: "POST",
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${user?.token}`
        },
        body: JSON.stringify(payload),
      });
      const data = await response.json();
      
      if (data.status === "success") {
        setSuccessMessage("Note berhasil dikirim");
        setNote("");
        setTimeout(() => setSuccessMessage(null), 3000);
      } else {
        setError(data.message || "Gagal mengirim note");
      }
    } catch (error) {
      console.error("Error submitting note:", error);
      setError("Terjadi kesalahan jaringan");
    }
  };

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  if (!user) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[50vh]">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {/* Alert Messages */}
      {error && (
        <div className="mb-4">
          <Alert
            type="error"
            message={error}
            onClose={() => setError(null)}
          />
        </div>
      )}
      
      {successMessage && (
        <div className="mb-4">
          <Alert
            type="success"
            message={successMessage}
            onClose={() => setSuccessMessage(null)}
          />
        </div>
      )}

      {/* Header dengan info user */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Dashboard</h1>
            <p className="text-gray-600">Selamat datang, {user.full_name}</p>
            <p className="text-sm text-gray-500">Total Points: {user.total_points}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>

      {/* Task ID Selector */}
      <div className="bg-white p-4 rounded-lg shadow mb-4">
        <h3 className="text-lg font-semibold mb-2">Pilih Task ID:</h3>
        <select
          value={selectedTaskId}
          onChange={(e) => handleTaskIdChange(e.target.value)}
          className="w-full p-2 border rounded-lg"
        >
          {user.task_id && user.task_id.map((taskId: string) => (
            <option key={taskId} value={taskId}>
              {taskId}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Layanan yang dipakai Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Layanan yang dipakai:</h3>
          {isLoading ? (
            <div className="flex items-center justify-center py-8">
              <Loading size="md" />
            </div>
          ) : serviceData ? (
            <div className="space-y-2">
              <p><strong>Product Name:</strong> {serviceData.Product_Name}</p>
              <p><strong>Product Code:</strong> {serviceData.Product_Code}</p>
              <p><strong>Status:</strong> {serviceData.Status}</p>
              <p><strong>Bill Status:</strong> {serviceData.Bill_Status}</p>
              <p><strong>Total Payment:</strong> Rp {serviceData.Total_Payment?.toLocaleString()}</p>
              <p><strong>Due Date:</strong> {serviceData.Due_Date}</p>
              <p><strong>Period:</strong> {serviceData.Period}</p>
              <p><strong>Points:</strong> {serviceData.Points}</p>
              <p><strong>GB Usage:</strong> {serviceData.GB_in} GB</p>
            </div>
          ) : (
            <p>No data available</p>
          )}
          <div className="mt-4">
            <textarea
              className="w-full p-2 border rounded"
              placeholder="Note"
              value={note}
              onChange={(e) => setNote(e.target.value)}
            />
            <button
              className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
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
          <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors">
            Speed Test
          </button>
        </div>

        {/* User Stats Card */}
        <div className="bg-white p-4 rounded-lg shadow">
          <h3 className="text-lg font-semibold mb-2">Statistik User</h3>
          <div className="space-y-2">
            <p><strong>Total Points:</strong> {user.total_points}</p>
            <p><strong>Total Ads Watched:</strong> {user.total_ads_watched}</p>
            <p><strong>Login Day Streak:</strong> {user.login_day_streak}</p>
            <p><strong>Subscription Status:</strong> {user.subscription_status || "Tidak ada"}</p>
          </div>
        </div>
      </div>

      {/* Histori Transaksi Card */}
      <div className="mt-4 bg-white p-4 rounded-lg shadow">
        <h3 className="text-lg font-semibold mb-2">Histori Transaksi</h3>
        {transactionData.length > 0 ? (
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
        ) : (
          <p className="text-gray-500">Belum ada data transaksi</p>
        )}
      </div>
    </div>
  );
}