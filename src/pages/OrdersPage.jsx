import React, {useState, useEffect, useMemo} from "react";
import Button from "../components/Button";
import {useToast} from "../context/ToastContext";
import {FcSearch} from "react-icons/fc";
import Pagination from "../components/Pagination";
import ConfirmModal from "../components/ConfirmModal";

export default function OrdersPage() {
  const {showToast} = useToast();
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("All");
  const [search, setSearch] = useState("");
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [sortAsc, setSortAsc] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [nextStatus, setNextStatus] = useState("");
  const ORDERS_PER_PAGE = 10;

  const fetchOrders = async () => {
    const res = await fetch(`${import.meta.env.VITE_API_URL}/orders`);
    const data = await res.json();

    setOrders(data);
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const filteredOrders = useMemo(() => {
    return orders
      .filter((order) => {
        const matchesStatus = filter === "All" || order.status === filter;
        const matchesSearch =
          order.name.toLowerCase().includes(search.toLowerCase()) ||
          order.id?.toString().includes(search);
        return matchesStatus && matchesSearch;
      })
      .sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortAsc ? dateA - dateB : dateB - dateA;
      });
  }, [orders, filter, search, sortAsc]);

  const totalPages = Math.ceil(filteredOrders.length / ORDERS_PER_PAGE);
  const currentData = filteredOrders.slice(
    (currentPage - 1) * ORDERS_PER_PAGE,
    currentPage * ORDERS_PER_PAGE
  );

  const handleBulkUpdate = (status) => {
    if (selectedOrders.length === 0) {
      showToast("No order selected", "error");
      return;
    }
    setNextStatus(status);
    setShowModal(true);
  };

  const confirmUpdate = () => {
    const updated = orders.map((order) =>
      selectedOrders.includes(order.id) ? {...order, status: nextStatus} : order
    );
    setOrders(updated);
    setSelectedOrders([]);
    showToast(`Updated to ${nextStatus}`, "success");
    setShowModal(false);
  };

  const toggleSelection = (id) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  return (
    <div className="p-6 md:p-10  min-h-screen orderDashboard">
      <div className="max-w-7xl mx-auto">
        <div className="mb-10">
          <h1 className="text-4xl font-bold text-gray-800">Orders Dashboard</h1>
          <p className="text-gray-600 mt-2">
            Manage and track customer orders efficiently.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          {["All", "New", "Delivered", "Cancelled"].map((status) => (
            <button
              key={status}
              onClick={() => {
                setFilter(status);
                setCurrentPage(1);
              }}
              className={`rounded-lg py-3 px-4 text-sm font-medium shadow transition-all duration-200 cursor-pointer ${
                filter === status
                  ? "bg-black text-white"
                  : "bg-white text-gray-700 hover:bg-gray-300"
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        <div className="flex flex-col lg:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center border-gray-300 border rounded-lg p-2 pl-3 shadow w-full md:w-[350px] lg:w-[400px] sm:w-auto focus-within:border-black ">
            <FcSearch size={18} />
            <input
              type="text"
              placeholder="Search by name or ID"
              className="pl-3 w-full border-none rounded-lg focus:outline-none "
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="flex gap-2 flex-wrap">
            <Button
              onClick={() => handleBulkUpdate("Delivered")}
              className="bg-green-600 hover:bg-green-700 cursor-pointer btn-responsive"
            >
              Mark Delivered
            </Button>
            <Button
              onClick={() => handleBulkUpdate("Cancelled")}
              className="bg-red-600 hover:bg-red-700 cursor-pointer btn-responsive"
            >
              Mark Cancelled
            </Button>
            <Button
              onClick={() => setSortAsc(!sortAsc)}
              className="bg-gray-700 hover:bg-gray-800 cursor-pointer btn-responsive"
            >
              Sort by Date {sortAsc ? "↑" : "↓"}
            </Button>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-gray-300 text-gray-700 uppercase text-xs tracking-wider">
              <tr>
                <th className="px-6 py-3">Select</th>
                <th className="px-6 py-3">Order ID</th>
                <th className="px-6 py-3">Customer</th>
                <th className="px-6 py-3">Total (₹)</th>
                <th className="px-6 py-3">Created</th>
                <th className="px-6 py-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {currentData.map((order, i) => (
                <tr
                  key={order.id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200`}
                >
                  <td className="px-6 py-4">
                    <input
                      type="checkbox"
                      className="cursor-pointer"
                      checked={selectedOrders.includes(order.id)}
                      onChange={() => toggleSelection(order.id)}
                    />
                  </td>
                  <td className="px-6 py-4">{order.id}</td>
                  <td className="px-6 py-4">{order.name}</td>
                  <td className="px-6 py-4">{order.total}</td>
                  <td className="px-6 py-4">
                    {new Date(order.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 capitalize">{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={setCurrentPage}
        />

        <ConfirmModal
          show={showModal}
          title="Confirm Status Update"
          message={`Are you sure you want to mark the selected orders as `}
          nextStatus={nextStatus}
          confirmLabel="Confirm"
          cancelLabel="Cancel"
          onConfirm={confirmUpdate}
          onCancel={() => setShowModal(false)}
        />
      </div>
    </div>
  );
}
