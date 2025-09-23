"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Loading } from "@/components/ui/loading";
import { Alert } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import TransactionTable from "./_components/TransactionTable";
import ProductCarousel from "./_components/ProductCarousel";
import SpeedTest from "./_components/SpeedTest";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

interface TransactionData {
  Payment_Date: string;
  Sub_Product: string;
  Payment_Method: string;
  Total: number;
  AR_Status: string;
}

interface CustomerDashboardData {
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

interface Product {
  ID: number;
  Product_Group: string;
  Product_Category: string;
  Product_Code: string;
  Product_Name: string;
  Region: string;
  Price: number;
}

const defaultData = {
  ID: 3066,
  Task_ID: "16090367",
  Customer_Name: "test",
  Product_Code: "RTL863",
  Product_Name: "idPlAy Home Up To 10 Mbps",
  Status: "CREATED_IDMALL",
  Bill_Status: "Tidak ada tagihan",
  Notification_Message:
    "Registrasi pelanggan berhasil, mohon cek secara berkala untuk update nomor pelanggan!",
  Due_Date: "2025-08-27",
  Inv_Date: "2025-08-27",
  Total_Payment: 0,
  AR_Remain: 0,
  AR_Paid: 0,
  Period: "2025-08",
  Points: 0,
  GB_in: 0,
};

const dummy_products: Product[] = [
  {
    ID: 3773,
    Product_Group: "Retail",
    Product_Category: "Retail",
    Product_Code: "RTL1065",
    Product_Name: "idPlAy Home Up To 15 Mbps",
    Region: "NATION",
    Price: 150000,
  },
  {
    ID: 3774,
    Product_Group: "Retail",
    Product_Category: "Retail",
    Product_Code: "RTL1025",
    Product_Name: "idPlAy Home Up To 25 Mbps",
    Region: "NATION",
    Price: 150000,
  },
];

export default function Dashboard() {
  const router = useRouter();
  const { user, isLoggedIn, isLoading: isAuthLoading, logout } = useAuth();
  const [transactionData, setTransactionData] = useState<TransactionData[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [note, setNote] = useState("");
  const [selectedTaskId, setSelectedTaskId] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isLoadingCustomerDashboard, setIsLoadingCustomerDashboard] = useState(true);
  const [isLoadingProducts, setIsLoadingProducts] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [customerDashboard, setCustomerDashboard] = useState<CustomerDashboardData | null>(null);
  const [speedTestResult, setSpeedTestResult] = useState<number | null>(null);
  const [isSpeedTesting, setIsSpeedTesting] = useState(false);
  const [billingTasks, setBillingTasks] = useState<{ task_id: string; status: string }[]>([]);
  const [isLoadingBilling, setIsLoadingBilling] = useState(false);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      maximumFractionDigits: 0,
    }).format(value);
  };

  const extractSpeed = (productName: string) => {
    const match = productName.match(/(\d+)\s*Mbps/i);
    return match ? `${match[1]} Mbps` : "N/A";
  };

  useEffect(() => {
    if (isAuthLoading) return;

    if (!isLoggedIn || !user) {
      router.push("/login");
      return;
    }

    if (user.task_id && user.task_id.length > 0) {
      setSelectedTaskId(user.task_id[0]);
      fetchBillingDetail(user.task_id[0], user.token);
      fetchProducts(user.token);
      fetchCustomerDashboard(user.task_id[0], user.token); // Initial fetch
    }

    fetchBillingList(user.token);
  }, [isLoggedIn, user, isAuthLoading, router]);

  // Fetch customer dashboard data
  const fetchCustomerDashboard = async (taskId: string, token: string) => {
    setIsLoadingCustomerDashboard(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}web/dashboard?task_id=${taskId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.status === "success" && data.data) {
        setCustomerDashboard(data.data);
      } else {
        setCustomerDashboard(defaultData);
      }
    } catch (error) {
      console.error("Error fetching customer dashboard:", error);
      setCustomerDashboard(defaultData);
    } finally {
      setIsLoadingCustomerDashboard(false);
    }
  };

  const fetchBillingList = async (token: string) => {
    setIsLoadingBilling(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}customer/billing/list`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        setBillingTasks(data.data);
        if (!selectedTaskId && data.data.length > 0) {
          setSelectedTaskId(data.data[0].task_id);
          fetchCustomerDashboard(data.data[0].task_id, token); // Fetch dashboard for first task
        }
      } else {
        setBillingTasks([]);
      }
    } catch (error) {
      console.error("Error fetching billing list:", error);
      setBillingTasks([]);
    } finally {
      setIsLoadingBilling(false);
    }
  };

  const fetchTransactionData = async (taskId: string, token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}transaction/ca/${taskId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        const mapped = data.data.map((item: any) => ({
          Payment_Date: item.Inv_Date || item.Due_Date || "-",
          Sub_Product: item.Sub_Product,
          Payment_Method: item.Bank_Acc || "-",
          Total: item.Total ?? item.total ?? 0,
          AR_Status:
            (typeof item.AR_Remain === "number"
              ? item.AR_Remain
              : parseFloat(item.AR_Remain)) > 0
              ? "Belum Lunas"
              : "Lunas",
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

  const fetchBillingDetail = async (taskId: string, token: string) => {
    setIsLoading(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}customer/billing/detail/${taskId}`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();
      if (data.status === "success" && Array.isArray(data.data)) {
        const mapped = data.data.map((item: any) => ({
          Payment_Date: item.Inv_Date || "-",
          Sub_Product: item.Sub_Product,
          Payment_Method: "-",
          Total: item.Total ?? 0,
          AR_Status:
            item.Bill_Status === "Terbayar" ? "Lunas" : "Belum Lunas",
        }));
        setTransactionData(mapped);
      } else {
        setTransactionData([]);
      }
    } catch (error) {
      console.error("Error fetching billing detail:", error);
      setTransactionData([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async (token: string) => {
    setIsLoadingProducts(true);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}common/products`,
        {
          method: "GET",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      const data = await response.json();

      if (data.status === "success") {
        setProducts(data.data.length > 0 ? data.data : dummy_products);
      } else {
        setProducts(dummy_products);
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]);
    } finally {
      setIsLoadingProducts(false);
    }
  };

  const handleTaskIdChange = async (taskId: string) => {
    setSelectedTaskId(taskId);
    if (user?.token) {
      setIsLoadingCustomerDashboard(true); // Mulai loading saat ganti Task ID
      await fetchBillingDetail(taskId, user.token);
      await fetchCustomerDashboard(taskId, user.token); // Pastikan fetch selesai
    }
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
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user?.token}`,
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

  if (isAuthLoading || !user) {
    return (
      <div className="container mx-auto p-4 flex items-center justify-center min-h-[50vh]">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="container mx-auto p-4">
      {error && (
        <Alert type="error" message={error} onClose={() => setError(null)} />
      )}
      {successMessage && (
        <Alert
          type="success"
          message={successMessage}
          onClose={() => setSuccessMessage(null)}
        />
      )}

      <div className="flex flex-col md:flex-row gap-6 mt-6">
        <div className="space-y-6 md:min-w-[500px] max-w-[500px]">
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Pilih Task ID</h3>
            <Select
              value={selectedTaskId}
              onValueChange={handleTaskIdChange}
              disabled={isLoadingBilling || billingTasks.length === 0}
            >
              <SelectTrigger className="border-orange-500">
                <SelectValue
                  placeholder={
                    isLoadingBilling ? "Memuat daftar..." : "Pilih Task ID"
                  }
                />
              </SelectTrigger>
              <SelectContent className="bg-white max-h-60 overflow-y-auto border-orange-500">
                {billingTasks.map((item: { task_id: string; status: string }) => (
                  <SelectItem
                    key={item.task_id}
                    value={item.task_id}
                    className="hover:bg-gray-100 focus:bg-gray-200 transition-colors duration-150"
                  >
                    {item.task_id}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          {/* Customer Dashboard Section */}
          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-3">Layanan yang dipakai</h3>
            {isLoadingCustomerDashboard ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-gray-50 p-4 max-w-[400px]">
                  <Skeleton
                    className="h-8 w-24 mb-2 bg-gray-200 animate-pulse"
                  />
                  <Skeleton
                    className="h-6 w-32 bg-gray-200 animate-pulse"
                  />
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <Skeleton
                      className="h-5 w-16 bg-gray-200 animate-pulse"
                    />
                    <div className="flex items-center gap-2">
                      <Skeleton
                        className="w-2 h-2 rounded-full bg-gray-200 animate-pulse"
                      />
                      <Skeleton
                        className="h-5 w-16 bg-gray-200 animate-pulse"
                      />
                    </div>
                  </div>

                  <Skeleton
                    className="h-5 w-32 bg-gray-200 animate-pulse"
                  />

                  {[...Array(4)].map((_, index) => (
                    <div
                      key={index}
                      className="flex items-center justify-between"
                    >
                      <Skeleton
                        className="h-4 w-40 bg-gray-200 animate-pulse"
                      />
                      <Skeleton
                        className="h-4 w-20 bg-gray-200 animate-pulse"
                      />
                    </div>
                  ))}

                  <div className="flex items-center justify-between pt-2 border-t">
                    <Skeleton
                      className="h-5 w-24 bg-gray-200 animate-pulse"
                    />
                    <Skeleton
                      className="h-5 w-20 bg-gray-200 animate-pulse"
                    />
                  </div>
                </div>
              </div>
            ) : customerDashboard ? (
              <div className="space-y-4">
                <div className="rounded-lg bg-[#008443] text-white p-4 max-w-[400px]">
                  <div className="text-2xl font-bold">
                    {extractSpeed(customerDashboard?.Product_Name || "") ||
                      "10 Mbps"}
                  </div>
                  <div className="text-emerald-100 mt-1">
                    {formatCurrency(customerDashboard.Total_Payment || 1700000)}
                    /Tahun
                  </div>
                </div>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-600 font-medium">Status</span>
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          customerDashboard.Status === "CREATED_IDMALL"
                            ? "bg-emerald-500"
                            : "bg-gray-400"
                        }`}
                      ></div>
                      <span className="text-gray-800 font-medium">
                        {customerDashboard.Status === "CREATED_IDMALL"
                          ? "Active"
                          : customerDashboard.Status}
                      </span>
                    </div>
                  </div>

                  <div className="text-gray-600 font-medium">
                    Tagihan Mendatang
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">
                      Total Tagihan yang Belum Dibayar
                    </span>
                    <span className="text-gray-800 font-medium">
                      {formatCurrency(customerDashboard.AR_Remain)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Tagihan Bulan Ini</span>
                    <span className="text-gray-800 font-medium">
                      {formatCurrency(customerDashboard.Total_Payment)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-gray-500">Dibayar</span>
                    <span className="text-gray-800 font-medium">
                      {formatCurrency(customerDashboard.AR_Paid)}
                    </span>
                  </div>

                  <div className="flex items-center justify-between pt-2 border-t border-t-slate-300">
                    <span className="text-gray-600 font-medium">
                      Berlaku Sampai
                    </span>
                    <span className="text-gray-800 font-medium">
                      {new Date(customerDashboard.Due_Date).toLocaleDateString(
                        "id-ID",
                        {
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Tidak ada data</p>
            )}
          </div>

          {/* <div className="bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-4">Upgrade Paket Internet</h3>
            {isLoadingProducts ? (
              <div className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {[...Array(2)].map((_, index) => (
                    <div key={index} className="rounded-lg p-4">
                      <Skeleton
                        className="h-4 w-24 mb-2 bg-gray-200 animate-pulse"
                      />
                      <Skeleton
                        className="h-8 w-32 mb-2 bg-gray-200 animate-pulse"
                      />
                      <Skeleton
                        className="h-3 w-36 mb-3 bg-gray-200 animate-pulse"
                      />
                      <Skeleton
                        className="h-10 w-full mb-2 bg-gray-200 animate-pulse"
                      />
                      <Skeleton
                        className="h-10 w-full mb-3 bg-gray-200 animate-pulse"
                      />
                      <div className="space-y-1">
                        <Skeleton
                          className="h-3 w-full bg-gray-200 animate-pulse"
                        />
                        <Skeleton
                          className="h-3 w-full bg-gray-200 animate-pulse"
                        />
                        <Skeleton
                          className="h-3 w-3/4 bg-gray-200 animate-pulse"
                        />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4">
                  <Skeleton
                    className="h-20 w-full mb-2 bg-gray-200 animate-pulse"
                  />
                  <Skeleton
                    className="h-10 w-20 bg-gray-200 animate-pulse"
                  />
                </div>
              </div>
            ) : products.length > 0 ? (
              <ProductCarousel
                products={products}
                note={note}
                setNote={setNote}
                onSubmit={submitNote}
              />
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500 mb-4">
                  Tidak ada paket upgrade tersedia
                </p>
                <div className="mt-4">
                  <textarea
                    className="w-full p-2 rounded"
                    placeholder="Note"
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                  />
                  <button
                    className="mt-2 bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                    onClick={submitNote}
                  >
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div> */}
        </div>

        {/* Right Column */}
        <div className="space-y-6 flex-1">
          <div className="">
            <SpeedTest customerDashboard={customerDashboard} />

            {/* <div className="bg-white p-4 rounded-xl shadow-lg">
              <h3 className="text-lg font-semibold mb-2 text-center">Average Data Usage</h3>
              {isLoadingCustomerDashboard ? (
                <div className="space-y-4">
                  <Skeleton className="h-12 w-48" />
                  <Skeleton className="h-4 w-16" />
                  <div className="mt-4 space-y-2">
                    {[...Array(3)].map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center justify-between"
                      >
                        <Skeleton className="h-4 w-24" />
                        <Skeleton className="h-4 w-16" />
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <>
                  <p className="text-3xl font-bold text-center">
                    {customerDashboard?.GB_in
                      ? `${(customerDashboard.GB_in / 1000).toFixed(1)} Terabytes`
                      : '0 Terabytes'}
                  </p>
                  <p className="text-gray-500 text-center">/ Bulan</p>
                  <div className="mt-9 space-y-2 text-sm">
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
                </>
              )}
            </div> */}
          </div>

          <div className="bg-white p-4 rounded-xl shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Histori Billing</h3>
            {isLoading ? (
              <div className="space-y-2">
                <div className="grid grid-cols-5 gap-2 bg-gray-100 p-2 rounded">
                  <Skeleton
                    className="h-4 w-full bg-gray-200 animate-pulse"
                  />
                  <Skeleton
                    className="h-4 w-full bg-gray-200 animate-pulse"
                  />
                  <Skeleton
                    className="h-4 w-full bg-gray-200 animate-pulse"
                  />
                  <Skeleton
                    className="h-4 w-full bg-gray-200 animate-pulse"
                  />
                  <Skeleton
                    className="h-4 w-full bg-gray-200 animate-pulse"
                  />
                </div>
                {[...Array(3)].map((_, index) => (
                  <div
                    key={index}
                    className="grid grid-cols-5 gap-2 p-2 rounded"
                  >
                    <Skeleton
                      className="h-4 w-full bg-gray-200 animate-pulse"
                    />
                    <Skeleton
                      className="h-4 w-full bg-gray-200 animate-pulse"
                    />
                    <Skeleton
                      className="h-4 w-full bg-gray-200 animate-pulse"
                    />
                    <Skeleton
                      className="h-4 w-full bg-gray-200 animate-pulse"
                    />
                    <Skeleton
                      className="h-6 w-16 rounded-full bg-gray-200 animate-pulse"
                    />
                  </div>
                ))}
              </div>
            ) : transactionData.length > 0 ? (
              <TransactionTable transactions={transactionData} />
            ) : (
              <p className="text-gray-500">Belum ada data transaksi</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}