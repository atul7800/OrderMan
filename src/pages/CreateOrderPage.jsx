import React, {useState, useEffect} from "react";
import {useToast} from "../context/ToastContext";
import Button from "../components/Button";
import Select from "react-select";
import SKUSelect from "../components/SKUSelect";

export default function CreateOrderPage() {
  const [errors, setErrors] = useState({});
  const {showToast} = useToast();
  const [skus, setSkus] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    country: "",
    items: [],
  });

  const addItem = () => {
    setForm({
      ...form,
      items: [...form.items, {skuId: "", qty: 1}],
    });
  };

  const updateItem = (index, key, value) => {
    const items = [...form.items];
    items[index][key] = value;
    setForm({...form, items});
  };

  const total = form.items.reduce((sum, item) => {
    const sku = skus.find((s) => s.id === parseInt(item.skuId));
    return sku ? sum + sku.price * item.qty : sum;
  }, 0);

  const handleSubmit = async () => {
    const newErrors = {};

    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      newErrors.email = "Invalid email format";
    if (!/^\d{10}$/.test(form.phone))
      newErrors.phone = "Phone No must be 10 digits";
    if (!form.address.trim()) newErrors.address = "Address is required";
    if (!form.city.trim()) newErrors.city = "City is required";
    if (!form.country.trim()) {
      newErrors.country = "Country is required";
    } else if (!/^[a-zA-Z\s]+$/.test(form.country)) {
      newErrors.country = "Country must contain only letters";
    }

    if (form.items.length === 0) {
      newErrors.items = "At least one SKU must be added";
    } else {
      form.items.forEach((item, index) => {
        if (!item.skuId) {
          newErrors[`skuId_${index}`] = "Please select a SKU";
        }
        if (!item.qty || item.qty < 1) {
          newErrors[`qty_${index}`] = "Quantity must be at least 1";
        }
      });
    }

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const order = {
      ...form,
      total,
      status: "New",
      createdAt: new Date().toISOString(),
    };
    await fetch(`${import.meta.env.VITE_API_URL}/orders`, {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(order),
    });
    showToast("Order Created", "success");
    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "",
      country: "",
      items: [],
    });
  };

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/skus`)
      .then((res) => res.json())
      .then((data) => setSkus(data.filter((s) => s.active)));
  }, []);

  return (
    <div className="p-8 max-w-5xl mx-auto createDashboard">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-gray-800">Create Order</h1>
        <p className="text-gray-600 mt-2">
          Manually place a customer order with accurate details and items.
        </p>
      </div>
      <div className="bg-white shadow-md rounded-xl p-6">
        {/* Customer Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <input
              placeholder="Full Name"
              value={form.name}
              onChange={(e) => setForm({...form, name: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
            {errors.name && (
              <p className="text-red-500 text-sm text-left">{errors.name}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({...form, email: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
            {errors.email && (
              <p className="text-red-500 text-sm text-left">{errors.email}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Phone"
              value={form.phone}
              onChange={(e) => setForm({...form, phone: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
            {errors.phone && (
              <p className="text-red-500 text-sm text-left">{errors.phone}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Address"
              value={form.address}
              onChange={(e) => setForm({...form, address: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg  col-span-full"
            />
            {errors.address && (
              <p className="text-red-500 text-sm text-left">{errors.address}</p>
            )}
          </div>

          <div>
            <input
              placeholder="City"
              value={form.city}
              onChange={(e) => setForm({...form, city: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
            {errors.city && (
              <p className="text-red-500 text-sm text-left">{errors.city}</p>
            )}
          </div>

          <div>
            <input
              placeholder="Country"
              value={form.country}
              onChange={(e) => setForm({...form, country: e.target.value})}
              className="w-full p-3 border border-gray-300 rounded-lg "
            />
            {errors.country && (
              <p className="text-red-500 text-sm text-left">{errors.country}</p>
            )}
          </div>
        </div>

        {/* Order Items */}
        <div className="mb-6">
          {errors.items && (
            <p className="text-red-500 text-sm text-left">{errors.items}</p>
          )}

          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Order Items
          </h3>
          {form.items.map((item, i) => (
            <div key={i} className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
              <div>
                <SKUSelect
                  value={item.skuId}
                  onChange={(val) => updateItem(i, "skuId", val)}
                />
                <div className="min-h-[20px]">
                  {errors[`skuId_${i}`] && (
                    <p className="text-red-500 text-sm mt-1 text-left">
                      {errors[`skuId_${i}`]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <input
                  type="number"
                  min={1}
                  value={item.qty}
                  onChange={(e) =>
                    updateItem(i, "qty", Math.max(1, parseInt(e.target.value)))
                  }
                  className="p-3 border border-gray-300 rounded-lg"
                />
                <div className="min-h-[20px]"></div>
              </div>

              <div>
                <div className="flex items-center p-3 border border-gray-300 rounded-lg bg-gray-100">
                  ₹
                  {(() => {
                    const sku = skus.find((s) => s.id === parseInt(item.skuId));
                    return sku ? sku.price * item.qty : 0;
                  })()}
                </div>
                <div className="min-h-[20px]"></div>
              </div>
            </div>
          ))}
          <Button onClick={addItem} className="mt-2">
            + Add Item
          </Button>
        </div>

        {/* Order Total & Submit */}
        <div className="flex justify-between items-center">
          <div className="text-lg font-bold text-gray-800">Total: ₹{total}</div>
          <Button onClick={handleSubmit}>Submit Order</Button>
        </div>
      </div>
    </div>
  );
}
