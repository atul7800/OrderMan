import React, {useEffect, useState, useRef} from "react";
import {IoIosArrowDropdownCircle, IoIosArrowDropupCircle} from "react-icons/io";

const PAGE_SIZE = 5;

export default function SKUSelect({value, onChange}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [options, setOptions] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [showDropdown, setShowDropdown] = useState(false);
  const listRef = useRef();
  const selectedLabel = options.find((opt) => opt.id === value);

  useEffect(() => {
    const fetchOptions = async () => {
      const res = await fetch(
        `http://localhost:3000/skus?_page=${page}&_limit=${PAGE_SIZE}&q=${search}&active=true`
      );
      const data = await res.json();

      setOptions((prev) => (page === 1 ? data : [...prev, ...data]));
      setHasMore(data.length === PAGE_SIZE);
    };

    fetchOptions();
  }, [page, search]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!listRef.current?.contains(e.target)) {
        setShowDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleScroll = () => {
    const el = listRef.current;
    if (
      el &&
      el.scrollTop + el.clientHeight >= el.scrollHeight - 10 &&
      hasMore
    ) {
      setPage((prev) => prev + 1);
    }
  };

  const handleSelect = (id) => {
    onChange(id);
    setShowDropdown(false);
  };

  return (
    <div className="relative w-full max-w-md">
      <input
        value={search}
        onChange={(e) => {
          setSearch(e.target.value);
          setPage(1);
          setShowDropdown(true);
        }}
        onFocus={() => setShowDropdown(true)}
        placeholder={
          selectedLabel
            ? `${selectedLabel.name} (${selectedLabel.code})`
            : "Search SKU"
        }
        className="w-full p-3 border border-gray-300 rounded-lg"
      />

      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 pointer-events-none">
        {showDropdown ? (
          <IoIosArrowDropupCircle size={18} />
        ) : (
          <IoIosArrowDropdownCircle size={18} />
        )}
      </span>

      {showDropdown && (
        <ul
          ref={listRef}
          onScroll={handleScroll}
          className="absolute top-full left-0 mt-1 w-full border rounded bg-white shadow z-10 max-h-50 overflow-y-auto"
        >
          {options.map((item) => (
            <li
              key={item.id}
              onClick={() => handleSelect(item.id)}
              className="p-2 hover:bg-gray-100 cursor-pointer flex justify-center items-center gap-3"
            >
              <div className="font-medium">{item.name}</div>
              <div className="text-sm text-gray-500">({item.code})</div>
            </li>
          ))}
          {options.length === 0 && (
            <li className="p-2 text-gray-400">No results found</li>
          )}
        </ul>
      )}
    </div>
  );
}
