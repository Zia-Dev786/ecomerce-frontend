import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getsearchProducts } from "../services/homeServices";

function UserProduct() {
  const navigate = useNavigate();

  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showFilters, setShowFilters] = useState(false);

  const [filters, setFilters] = useState({
    title: "",
    category: "",
    minPrice: 0,
    maxPrice: 1000,
    inStock: false,
    sort: "default",
  });

  // Fetch all products initially
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await getsearchProducts({});

        if (response.message === "success") {
          const items = response.products || [];

          setProducts(items);

          setCategories([
            ...new Set(items.map((p) => p.category).filter(Boolean)),
          ]);

          const highestPrice = Math.max(
            1000,
            ...items.map((p) => Number(p.price) || 0)
          );

          setFilters((prev) => ({
            ...prev,
            maxPrice: highestPrice,
          }));
        } else {
          setProducts([]);
        }
      } catch (err) {
        setError(
          err.response?.data?.message ||
            err.message ||
            "Unable to load products"
        );
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle all filter inputs
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;

    setFilters((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Apply search and price/category filters
  const applyFilters = async (e) => {
    e?.preventDefault();

    try {
      setLoading(true);
      setError("");

      const data = {};

      if (filters.title.trim()) {
        data.title = filters.title.trim();
      }

      if (filters.category) {
        data.category = filters.category;
      }

      if (filters.minPrice !== "" && filters.minPrice !== null) {
        data.minPrice = Number(filters.minPrice);
      }

      if (filters.maxPrice !== "" && filters.maxPrice !== null) {
        data.maxPrice = Number(filters.maxPrice);
      }

      const response = await getsearchProducts(data);

      if (response.message === "success") {
        setProducts(response.products || []);
      } else {
        setProducts([]);
      }

      setShowFilters(false);
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to filter products"
      );
    } finally {
      setLoading(false);
    }
  };

  // Reset filters and fetch all products
  const resetFilters = async () => {
    setFilters({
      title: "",
      category: "",
      minPrice: 0,
      maxPrice: Math.max(
        1000,
        ...products.map((p) => Number(p.price) || 0)
      ),
      inStock: false,
      sort: "default",
    });

    try {
      setLoading(true);
      setError("");

      const response = await getsearchProducts({});

      if (response.message === "success") {
        setProducts(response.products || []);
      } else {
        setProducts([]);
      }
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load products"
      );
    } finally {
      setLoading(false);
    }
  };

  // Sort and filter stock on the client
  const displayedProducts = useMemo(() => {
    let result = [...products];

    if (filters.inStock) {
      result = result.filter((p) => Number(p.stock) > 0);
    }

    if (filters.sort === "price-low") {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (filters.sort === "price-high") {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    } else if (filters.sort === "name") {
      result.sort((a, b) =>
        (a.title || "").localeCompare(b.title || "")
      );
    }

    return result;
  }, [products, filters.inStock, filters.sort]);

  const productDetail = (id) => {
    navigate(`/products/productDetial/${id}`);
  };

  const maxAvailablePrice = Math.max(
    1000,
    ...products.map((p) => Number(p.price) || 0)
  );

  const inputClass =
    "w-full rounded-lg border border-gray-200 bg-gray-50 px-3 py-3 text-sm text-gray-700 outline-none transition focus:border-blue-500 focus:bg-white";

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="mx-auto max-w-7xl">
          <div className="mb-8 h-9 w-52 animate-pulse rounded bg-gray-200" />

          <div className="grid grid-cols-2 gap-5 md:grid-cols-4">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <div
                key={n}
                className="animate-pulse rounded-xl bg-white p-4"
              >
                <div className="mb-4 h-44 rounded-lg bg-gray-200" />
                <div className="mb-3 h-4 rounded bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-200" />
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-8 sm:px-6">
      <div className="mx-auto max-w-7xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <p className="mb-1 text-sm font-semibold text-blue-600">
              OUR COLLECTION
            </p>

            <h1 className="text-3xl font-bold tracking-tight text-gray-900">
              Shop Products
            </h1>

            <p className="mt-2 text-sm text-gray-500">
              Discover products you'll love.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setShowFilters((prev) => !prev)}
            className="rounded-lg border border-gray-200 bg-white px-4 py-2.5 text-sm font-semibold text-gray-700 shadow-sm lg:hidden"
          >
            {showFilters ? "Hide Filters" : "☰ Filters"}
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-lg bg-red-50 p-4 text-sm text-red-700">
            {error}

            <button
              type="button"
              onClick={() => applyFilters()}
              className="ml-3 font-semibold underline"
            >
              Retry
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 items-start gap-7 lg:grid-cols-[260px_minmax(0,1fr)]">

          {/* Filter Sidebar */}
          <aside
            className={`rounded-2xl border border-gray-100 bg-white p-5 shadow-sm ${
              showFilters ? "block" : "hidden"
            } lg:sticky lg:top-5 lg:block`}
          >
            <div className="mb-6 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900">
                Filters
              </h2>

              <button
                type="button"
                onClick={resetFilters}
                className="text-sm font-medium text-blue-600 hover:text-blue-800"
              >
                Clear all
              </button>
            </div>

            <form onSubmit={applyFilters} className="space-y-6">

              {/* Search by Title */}
              <div>
                <label
                  htmlFor="title"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Search Products
                </label>

                <input
                  id="title"
                  type="text"
                  name="title"
                  value={filters.title}
                  onChange={handleChange}
                  placeholder="Search by product name..."
                  className={inputClass}
                />
              </div>

              <div className="border-t border-gray-100" />

              {/* Category Dropdown */}
              <div>
                <label
                  htmlFor="category"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Category
                </label>

                <select
                  id="category"
                  name="category"
                  value={filters.category}
                  onChange={handleChange}
                  className={inputClass}
                >
                  <option value="">All Categories</option>

                  {categories.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-gray-100" />

              {/* Price Range */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-800">
                  Price Range
                </h3>

                <div className="mb-4 flex items-center gap-2">
                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="minPrice"
                      className="mb-1 block text-xs text-gray-500"
                    >
                      Min price
                    </label>

                    <input
                      id="minPrice"
                      type="number"
                      min="0"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>

                  <span className="mt-5 text-gray-400">–</span>

                  <div className="min-w-0 flex-1">
                    <label
                      htmlFor="maxPrice"
                      className="mb-1 block text-xs text-gray-500"
                    >
                      Max price
                    </label>

                    <input
                      id="maxPrice"
                      type="number"
                      min="0"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleChange}
                      className={inputClass}
                    />
                  </div>
                </div>

                <input
                  type="range"
                  min="0"
                  max={maxAvailablePrice}
                  value={Math.min(
                    maxAvailablePrice,
                    Math.max(0, Number(filters.maxPrice) || 0)
                  )}
                  onChange={(e) =>
                    setFilters((prev) => ({
                      ...prev,
                      maxPrice: Number(e.target.value),
                    }))
                  }
                  className="w-full cursor-pointer accent-blue-600"
                />

                <div className="mt-1 flex justify-between text-xs text-gray-400">
                  <span>0</span>
                  <span>{maxAvailablePrice}</span>
                </div>
              </div>

              <div className="border-t border-gray-100" />

              {/* Stock Availability */}
              <div>
                <h3 className="mb-3 text-sm font-semibold text-gray-800">
                  Availability
                </h3>

                <label className="flex cursor-pointer items-center gap-3 text-sm text-gray-600">
                  <input
                    type="checkbox"
                    name="inStock"
                    checked={filters.inStock}
                    onChange={handleChange}
                    className="h-4 w-4 rounded accent-blue-600"
                  />
                  In stock only
                </label>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-blue-600 px-4 py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700"
              >
                Apply Filters
              </button>
            </form>
          </aside>

          {/* Products Section */}
          <section>
            <div className="mb-5 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-gray-100 bg-white p-4">
              <p className="text-sm text-gray-600">
                Showing{" "}
                <span className="font-bold text-gray-900">
                  {displayedProducts.length}
                </span>{" "}
                products
              </p>

              <div className="flex items-center gap-2">
                <label
                  htmlFor="sort"
                  className="text-sm text-gray-500"
                >
                  Sort by
                </label>

                <select
                  id="sort"
                  name="sort"
                  value={filters.sort}
                  onChange={handleChange}
                  className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm outline-none focus:border-blue-500"
                >
                  <option value="default">Recommended</option>
                  <option value="price-low">Price: Low to High</option>
                  <option value="price-high">Price: High to Low</option>
                  <option value="name">Name: A to Z</option>
                </select>
              </div>
            </div>

            {/* Product Grid */}
            {displayedProducts.length === 0 ? (
              <div className="rounded-2xl border border-gray-100 bg-white px-6 py-20 text-center">
                <div className="mb-4 text-5xl">🔎</div>

                <h2 className="text-xl font-bold text-gray-800">
                  No products found
                </h2>

                <p className="mt-2 text-sm text-gray-500">
                  Try changing your search or filters.
                </p>

                <button
                  type="button"
                  onClick={resetFilters}
                  className="mt-5 rounded-lg bg-blue-600 px-5 py-2.5 text-sm font-semibold text-white hover:bg-blue-700"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-3">
                {displayedProducts.map((product) => (
                  <article
                    key={product._id}
                    onClick={() => productDetail(product._id)}
                    className="group cursor-pointer overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  >
                    <div className="relative flex h-56 items-center justify-center overflow-hidden bg-gray-50 p-5">
                      <img
                        src={product.image}
                        alt={product.title}
                        loading="lazy"
                        className="h-full w-full object-contain transition duration-300 group-hover:scale-105"
                      />

                      {Number(product.stock) > 0 && (
                        <span className="absolute left-3 top-3 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-700">
                          In Stock
                        </span>
                      )}
                    </div>

                    <div className="p-4">
                      <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-blue-600">
                        {product.category}
                      </p>

                      <h3 className="mb-3 line-clamp-2 min-h-12 font-semibold text-gray-800 transition group-hover:text-blue-600">
                        {product.title}
                      </h3>

                      <div className="flex items-center justify-between gap-2 border-t border-gray-100 pt-4">
                        <div>
                          <p className="text-xs text-gray-400">Price</p>

                          <p className="text-xl font-bold text-gray-900">
                            ${Number(product.price).toFixed(2)}
                          </p>
                        </div>

                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            // Connect your cart context here
                          }}
                          className="rounded-lg bg-blue-600 px-3 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-700"
                        >
                          Add to Cart
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}
          </section>
        </div>
      </div>
    </div>
  );
}

export default UserProduct;