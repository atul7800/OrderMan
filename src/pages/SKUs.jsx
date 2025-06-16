import React, {useState, useEffect} from "react";
import Button from "../components/Button";
import {useToast} from "../context/ToastContext";
import {FiPlus, FiEdit, FiTrash2} from "react-icons/fi";
import {FcSearch} from "react-icons/fc";
import Toggle from "../components/StatusToggle/Toggle";
import Pagination from "../components/Pagination";
const SKUS_PER_PAGE = 10;

export default function SKUPage() {
  const [skus, setSkus] = useState([]);
  const [filteredSkus, setFilteredSkus] = useState([]);
  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  const [price, setPrice] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [statusFilter, setStatusFilter] = useState("All");
  const [search, setSearch] = useState("");
  const {showToast} = useToast();
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetch("http://localhost:3000/skus")
      .then((res) => res.json())
      .then((data) => {
        setSkus(data);
        setFilteredSkus(data);
      });
  }, []);

  useEffect(() => {
    let result = skus;
    if (statusFilter !== "All") {
      const isActive = statusFilter === "Active";
      result = result.filter((sku) => sku.active === isActive);
    }
    if (search.trim()) {
      result = result.filter(
        (sku) =>
          sku.name.toLowerCase().includes(search.toLowerCase()) ||
          sku.code.toLowerCase().includes(search.toLowerCase())
      );
    }
    setFilteredSkus(result);
  }, [statusFilter, search, skus]);

  const totalPages = Math.ceil(filteredSkus.length / SKUS_PER_PAGE);
  const currentData = filteredSkus.slice(
    (currentPage - 1) * SKUS_PER_PAGE,
    currentPage * SKUS_PER_PAGE
  );

  const handleAdd = async () => {
    if (!name || !code || price < 0) {
      showToast("Invalid input", "error");
      return;
    }

    if (editingId) {
      const res = await fetch(`http://localhost:3000/skus/${editingId}`, {
        method: "PUT",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify({name, code, price: Number(price), active: true}),
      });
      const updatedSku = await res.json();
      const updated = skus.map((sku) =>
        sku.id === editingId ? updatedSku : sku
      );
      setSkus(updated);
      showToast("SKU Updated", "success");
    } else {
      const newSKU = {name, code, price: Number(price), active: true};
      const res = await fetch("http://localhost:3000/skus", {
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(newSKU),
      });
      const added = await res.json();
      setSkus([...skus, added]);
      showToast("SKU Added", "success");
    }

    setName("");
    setCode("");
    setPrice("");
    setEditingId(null);
  };

  const handleEdit = (sku) => {
    setName(sku.name);
    setCode(sku.code);
    setPrice(sku.price);
    setEditingId(sku.id);
  };

  const handleDelete = async (skuId) => {
    await fetch(`http://localhost:3000/skus/${skuId}`, {method: "DELETE"});
    setSkus((prev) => prev.filter((sku) => sku.id !== skuId));
    showToast("SKU Deleted", "success");
  };

  const toggleStatus = async (sku, currentStatus) => {
    const updatedStatus = currentStatus ? false : true;

    try {
      const res = await fetch(`http://localhost:3000/skus/${sku.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({...sku, active: updatedStatus}),
      });

      if (res.ok) {
        setSkus((prevSkus) =>
          prevSkus.map((skuItem) =>
            skuItem.id === sku.id
              ? {...skuItem, active: updatedStatus}
              : skuItem
          )
        );
      } else {
        showToast("Error updating status", "error");
      }
    } catch (error) {
      showToast("Error updating status", "error");
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto skuDashboard">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">SKU Management</h1>
        <p className="text-gray-600 mt-2">
          Add, edit, and manage product SKUs in your catalog.
        </p>
      </div>

      <div className="grid relative grid-cols-1 sm:grid-cols-3 gap-4 mb-6 ">
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => {
              setCurrentPage(1);
              setStatusFilter(e.target.value);
            }}
            className="appearance-none w-full p-2 border border-gray-300 rounded-lg pr-10 text-gray-700 cursor-pointer shadow"
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-gray-400">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        <div className="flex items-center border-gray-300 border rounded-lg p-2 pl-3 shadow w-full md:w-[350px] lg:w-[400px] sm:w-auto focus-within:border-black">
          <FcSearch size={18} />
          <input
            type="text"
            placeholder="Search SKU name or code"
            className="pl-3 w-full border-none rounded-lg focus:outline-none "
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white p-6 rounded-xl shadow-sm mb-6">
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 ">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="SKU Name"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            value={code}
            onChange={(e) => setCode(e.target.value)}
            placeholder="SKU Code"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <input
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Price"
            className="p-2 border border-gray-300 rounded-lg"
          />
          <Button
            onClick={handleAdd}
            className="w-full flex items-center justify-center"
          >
            <FiPlus size={18} className="mr-2" />{" "}
            {editingId ? "Save" : "Add SKU"}
          </Button>
        </div>
      </div>

      <div className="bg-white shadow-md rounded-lg overflow-x-auto">
        <table className="min-w-full text-sm text-left">
          <thead className="bg-gray-300 text-gray-700 uppercase text-xs tracking-wider">
            <tr>
              <th className="p-4">#</th>
              <th className="p-4">Name</th>
              <th className="p-4">Code</th>
              <th className="p-4">Price</th>
              <th className="p-4">Status</th>
              <th className="p-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {currentData.map((sku, i) => (
              <tr
                key={sku.id}
                className={`${
                  i % 2 === 0 ? "bg-white" : "bg-gray-100"
                } hover:bg-gray-200`}
              >
                <td className="p-4">{i + 1}</td>
                <td className="p-4 font-medium text-blue-700">{sku.name}</td>
                <td className="p-4">{sku.code}</td>
                <td className="p-4">₹{sku.price}</td>
                <td className="p-4">
                  <span
                    className={`text-center inline-block px-2 py-1 text-xs font-semibold rounded-full min-w-[60px] ${
                      sku.active
                        ? "bg-green-200 text-green-800"
                        : "bg-red-200 text-red-700"
                    }`}
                  >
                    {sku.active ? "Active" : "Inactive"}
                  </span>
                </td>
                <td className="p-4 text-center flex items-center justify-center gap-4">
                  {/* Active/Inactive toggle */}
                  <Toggle
                    isActive={sku.active}
                    onToggle={() => toggleStatus(sku, sku.active)}
                  />

                  {/* Edit Icon */}
                  <button
                    onClick={() => handleEdit(sku)}
                    className="text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    <FiEdit size={18} />
                  </button>

                  {/* Delete Icon */}
                  <button
                    onClick={() => handleDelete(sku.id)}
                    className="text-red-600 hover:text-red-800 cursor-pointer"
                  >
                    <FiTrash2 size={18} />
                  </button>
                </td>
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
    </div>
  );
}
