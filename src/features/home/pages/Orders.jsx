import React, { useState, useEffect } from "react";
import { getUserOrders } from "../services/homeServices";
import { useNavigate } from "react-router-dom";

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let navigate=useNavigate()

  async function getorder() {
    try {
      setLoading(true);
      setError("");

      const response = await getUserOrders();
      if(response.success){
        setOrders(response.orders || []);

      }else{
      setError('500 server Error')
      }
      console.log(response)
    } catch (e) {
      console.error("Error fetching orders:", e);
      setError("Unable to load your orders. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getorder();
  }, []);

  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-PK", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
  };
  function orderDetial(id){
   navigate(`/order/${id}`)
  }

  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-amber-100 text-amber-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
          <p className="mt-4 text-gray-500">Loading your orders...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-[50vh] flex flex-col items-center justify-center px-4">
        <p className="mb-4 text-center text-red-600">{error}</p>
        <button
          onClick={getorder}
          className="rounded-lg bg-indigo-600 px-6 py-2.5 font-medium text-white hover:bg-indigo-700"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 sm:px-6 lg:px-10">
      <div className="mx-auto max-w-6xl">

        {/* Page Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-indigo-600">
              My Account
            </p>
            <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              My Orders
            </h1>
            <p className="mt-2 text-gray-500">
              Track your orders and view your purchase details.
            </p>
          </div>

          <div className="w-fit rounded-xl border border-gray-200 bg-white px-5 py-3 shadow-sm">
            <p className="text-sm text-gray-500">Total Orders</p>
            <p className="text-2xl font-bold text-gray-900">
              {orders.length}
            </p>
          </div>
        </div>

        {/* Empty State */}
        {orders.length === 0 ? (
          <div className="rounded-2xl border border-gray-200 bg-white px-6 py-16 text-center shadow-sm">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-indigo-50 text-3xl">
              🛍️
            </div>
            <h2 className="mt-5 text-xl font-bold text-gray-900">
              No orders yet
            </h2>
            <p className="mx-auto mt-2 max-w-md text-gray-500">
              You haven't placed any orders yet. Your purchases will appear here.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {orders.map((order) => (
              <div
                key={order._id}
                onClick={()=>orderDetial(order._id)}
                className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
              >
                {/* Order Header */}
                <div className="flex flex-col gap-4 border-b border-gray-100 bg-gray-50/80 p-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                  <div className="grid grid-cols-2 gap-x-8 gap-y-4 sm:grid-cols-3">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Order ID
                      </p>
                      <p className="mt-1 font-semibold text-gray-900">
                        #{order._id.slice(-8).toUpperCase()}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Order Date
                      </p>
                      <p className="mt-1 font-medium text-gray-800">
                        {formatDate(order.date || order.createdAt)}
                      </p>
                    </div>

                    <div className="col-span-2 sm:col-span-1">
                      <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                        Payment Method
                      </p>
                      <p className="mt-1 font-medium text-gray-800">
                        {order.paymentType || "N/A"}
                      </p>
                    </div>
                  </div>

                  <span
                    className={`w-fit rounded-full px-3 py-1.5 text-xs font-bold capitalize ${getStatusStyle(
                      order.status
                    )}`}
                  >
                    {order.status || "Unknown"}
                  </span>
                </div>

                {/* Products */}
                <div className="p-5 sm:p-6">
                  <h2 className="mb-4 text-sm font-bold uppercase tracking-wide text-gray-700">
                    Order Items ({order.items?.length || 0})
                  </h2>

                  <div className="space-y-4">
                    {order.items?.map((item, index) => (
                      <div
                        key={item.productId || index}
                        className="flex flex-col gap-4 rounded-xl border border-gray-100 p-3 sm:flex-row sm:items-center"
                      >
                        <div className="h-24 w-full shrink-0 overflow-hidden rounded-lg bg-gray-100 sm:h-24 sm:w-24">
                          <img
                            src={item.image}
                            alt={item.title}
                            className="h-full w-full object-contain p-2"
                            onError={(e) => {
                              e.currentTarget.style.display = "none";
                            }}
                          />
                        </div>

                        <div className="min-w-0 flex-1">
                          <h3 className="font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <p className="mt-1 text-sm text-gray-500">
                            Product ID: {item.productId || "N/A"}
                          </p>
                          <p className="mt-2 text-sm text-gray-600">
                            Quantity:{" "}
                            <span className="font-semibold text-gray-900">
                              {item.quantity}
                            </span>
                          </p>
                        </div>

                        <div className="sm:text-right">
                          <p className="text-sm text-gray-500">Unit Price</p>
                          <p className="mt-1 font-medium text-gray-800">
                            Rs. {Number(item.price || 0).toLocaleString("en-PK")}
                          </p>
                          <p className="mt-2 font-bold text-indigo-600">
                            Rs.{" "}
                            {(
                              Number(item.price || 0) *
                              Number(item.quantity || 0)
                            ).toLocaleString("en-PK")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Order Footer */}
                <div className="border-t border-gray-100 p-5 sm:px-6 sm:py-5">
                  <div className="flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-gray-700">
                        Delivery Address
                      </p>
                      <p className="mt-1 text-sm text-gray-500">
                        📍 {order.address || "Address not provided"}
                      </p>
                    </div>

                    <div className="rounded-xl bg-indigo-50 px-5 py-4 sm:min-w-56 sm:text-right">
                      <p className="text-sm font-medium text-gray-600">
                        Total Amount
                      </p>
                      <p className="mt-1 text-2xl font-bold text-indigo-700">
                        Rs.{" "}
                        {Number(order.totalAmount || 0).toLocaleString("en-PK")}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Orders;

