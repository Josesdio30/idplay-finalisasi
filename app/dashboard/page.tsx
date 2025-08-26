"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";

interface TransactionData {
  Payment_Date: string;
  Sub_Product: string;
  Payment_Method: string;
  Total: number;
  AR_Status: string;
}

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: isAuthLoading, logout } = useAuth();
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [note, setNote] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
  };

  const getStatusBadge = (status: string) => {
    const normalized = (status || "").toLowerCase();
    if (normalized.includes("lunas") || normalized.includes("berhasil")) {
      return { label: "Berhasil", className: "bg-emerald-100 text-emerald-700 border-emerald-200", dot: "bg-emerald-500" };
    }
    if (normalized.includes("pending") || normalized.includes("belum")) {
      return { label: "Pending", className: "bg-amber-100 text-amber-700 border-amber-200", dot: "bg-amber-500" };
    }
    return { label: "Gagal", className: "bg-rose-100 text-rose-700 border-rose-200", dot: "bg-rose-500" };
  };

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isLoggedIn || !user) {
      router.push("/login");
      return;
    }

    if (user.task_id && user.task_id.length > 0) {
      setSelectedTaskId(user.task_id[0]);
      fetchTransactionData(user.task_id[0], user.token);
    }
  }, [isLoggedIn, user, isAuthLoading, router]);

  const fetchTransactionData = async (taskId: string, token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}transaction/ca/${taskId}`, {
        method: "GET",
        headers: { "Authorization": `Bearer ${token}` },
      });
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        const mapped = data.data.map((item: any) => ({
          Payment_Date: item.Inv_Date || item.Due_Date || "-",
          Sub_Product: item.Sub_Product,
          Payment_Method: item.Bank_Acc || "-",
          Total: item.Total ?? item.total ?? 0,
          AR_Status: (typeof item.AR_Remain === "number" ? item.AR_Remain : parseFloat(item.AR_Remain)) > 0 ? "Belum Lunas" : "Lunas",
        }));
        setTransactionData(mapped);
      } else {
        setTransactionData([]);
      }
    } catch (error) {
      console.error("Error fetching transaction data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTaskIdChange = (taskId: string) => {
    setSelectedTaskId(taskId);
    if (user?.token) fetchTransactionData(taskId, user.token);
  };

  const submitNote = async () => {
    if (!note.trim()) {
      setError("Note tidak boleh kosong");
      return;
    }

    const payload = { task_id: selectedTaskId, note };
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}request-du`, {
        method: "POST",
        headers: { "Content-Type": "application/json", "Authorization": `Bearer ${user?.token}` },
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

  if (isAuthLoading || !user) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[50vh]">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {error && <Alert type="error" message={error} onClose={() => setError(null)} />}
      {successMessage && <Alert type="success" message={successMessage} onClose={() => setSuccessMessage(null)} />}

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* Left Column */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-3">Layanan yang dipakai</h3>
            {isLoading ? (
              <div className="flex items-center justify-center py-8"><Loading size="md" /></div>
            ) : transactionData.length > 0 ? (
              <div className="space-y-4">
                <div className="flex items-center justify-between rounded-lg bg-emerald-50 px-4 py-3">
                  <div>
                    <p className="text-sm text-emerald-700">Paket aktif</p>
                    <p className="text-xl font-semibold text-emerald-800">{transactionData[0].Sub_Product}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-emerald-700">Tagihan</p>
                    <p className="font-semibold text-emerald-800">{formatCurrency(transactionData[0].Total)}</p>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="space-y-1">
                    <p className="text-gray-500">Status</p>
                    <p className="inline-flex items-center gap-2">
                      <span className={`h-2 w-2 rounded-full ${getStatusBadge(transactionData[0].AR_Status).dot}`}></span>
                      <span>{getStatusBadge(transactionData[0].AR_Status).label}</span>
                    </p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Tagihan Mendatang</p>
                    <p className="font-medium">{formatCurrency(transactionData[0].Total)}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Belum Dibayar</p>
                    <p className="font-medium">{transactionData[0].AR_Status.toLowerCase().includes("belum") ? formatCurrency(transactionData[0].Total) : "Rp 0"}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Metode</p>
                    <p className="font-medium">{transactionData[0].Payment_Method}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-gray-500">Tanggal</p>
                    <p className="font-medium">{transactionData[0].Payment_Date}</p>
                  </div>
                </div>
              </div>
            ) : <p className="text-gray-500">Tidak ada data</p>}
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-4">Upgrade Paket Internet</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="rounded-lg border p-4">
                <p className="text-sm text-gray-500">Kecepatan 75 Mbps</p>
                <p className="mt-2 text-2xl font-bold">{formatCurrency(3490000)}</p>
                <p className="text-xs text-gray-500">10 Bulan • Lebih Hemat ~17%</p>
                <button className="mt-3 w-full rounded bg-orange-500 px-3 py-2 text-white hover:bg-orange-600">Langganan Sekarang</button>
                <button className="mt-2 w-full rounded border px-3 py-2 hover:bg-gray-50">Hubungi Kami</button>
                <div className="mt-3 space-y-1 text-sm">
                  <p>FREE Biaya Pemasangan</p>
                  <p>Gratis Sewa Modem WIFI</p>
                  <p>Cocok untuk 10+ Perangkat</p>
                </div>
              </div>
              <div className="rounded-lg border p-4">
                <p className="text-sm text-gray-500">Kecepatan 75 Mbps</p>
                <p className="mt-2 text-2xl font-bold">{formatCurrency(3490000)}</p>
                <p className="text-xs text-gray-500">10 Bulan • Lebih Hemat ~17%</p>
                <button className="mt-3 w-full rounded bg-orange-500 px-3 py-2 text-white hover:bg-orange-600">Langganan Sekarang</button>
                <button className="mt-2 w-full rounded border px-3 py-2 hover:bg-gray-50">Hubungi Kami</button>
                <div className="mt-3 space-y-1 text-sm">
                  <p>FREE Biaya Pemasangan</p>
                  <p>Gratis Sewa Modem WIFI</p>
                  <p>Cocok untuk 10+ Perangkat</p>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <textarea className="w-full p-2 border rounded" placeholder="Note" value={note} onChange={(e) => setNote(e.target.value)} />
              <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600" onClick={submitNote}>Submit</button>
            </div>
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <h3 className="text-lg font-semibold mb-2">Cek Kecepatan Internet</h3>
            <div className="mx-auto my-4 h-28 w-28 rounded-full border-8 border-emerald-200 flex items-center justify-center">
              <span className="text-xl font-bold text-emerald-700">25 Mbps</span>
            </div>
            <button className="mt-2 bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600">Speed Test</button>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Average Data Usage</h3>
            <p className="text-3xl font-bold">1.2 Terabytes</p>
            <p className="text-gray-500">/ Bulan</p>
            <div className="mt-4 space-y-2 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Streaming/music</span>
                <span className="font-medium">500 Gb</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Gaming</span>
                <span className="font-medium">50 Gb</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Downloads</span>
                <span className="font-medium">700 Gb</span>
              </div>
            </div>
          </div>

          <div className="bg-white p-4 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Histori Transaksi</h3>
            {transactionData.length > 0 ? (
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-gray-100 text-sm">
                    <th className="border p-2 text-left">Tanggal Pembayaran</th>
                    <th className="border p-2 text-left">Paket / Layanan</th>
                    <th className="border p-2 text-left">Metode Pembayaran</th>
                    <th className="border p-2 text-left">Total</th>
                    <th className="border p-2 text-left">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {transactionData.map((transaction, index) => (
                    <tr key={index} className="border text-sm">
                      <td className="border p-2">{transaction.Payment_Date}</td>
                      <td className="border p-2">{transaction.Sub_Product}</td>
                      <td className="border p-2">{transaction.Payment_Method}</td>
                      <td className="border p-2">{formatCurrency(transaction.Total)}</td>
                      <td className="border p-2">
                        <span className={`inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium ${getStatusBadge(transaction.AR_Status).className}`}>
                          <span className={`h-2 w-2 rounded-full ${getStatusBadge(transaction.AR_Status).dot}`}></span>
                          {getStatusBadge(transaction.AR_Status).label}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : <p className="text-gray-500">Belum ada data transaksi</p>}
          </div>
        </div>
      </div>
    </div>
  );
}