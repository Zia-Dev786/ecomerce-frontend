
import React, { useEffect, useState } from "react";
import {
  getOrders,
  updateOrderStatus,
  deleteOrder,
} from "../services/adminServices";

function AdminOrder() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [updatingId, setUpdatingId] = useState(null);
  const [deletingId, setDeletingId] = useState(null);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");

  const statuses = [
    "pending",
    "confirmed",
      "shipped",
      "delivered",
      "cancelled",
  ];

  // Fetch all orders
  const getOrder = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getOrders();

      if (response.success) {
        setOrders(response.orders || []);
      } else {
        setError(response.message || "Failed to fetch orders.");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "Unable to load orders."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  // Update order status
  const handleStatusChange = async (orderId, status) => {
    try {
      setUpdatingId(orderId);
      setError("");
      setMessage("");

      const response = await updateOrderStatus(orderId, status);

      if (!response.success) {
        setError(response.message || "Failed to update status.");
        return;
      }
//     state  1   1
      setOrders((prev) =>
        prev.map((order) =>
          order._id === orderId
            ? {
                ...order,
                status: response.order?.status || status,
              }
            : order
        )
      );

      setMessage("Order status updated successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to update status."
      );
    } finally {
      setUpdatingId(null);
    }
  };

  // Delete order
  const handleDeleteOrder = async (orderId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this order?"
    );

    if (!confirmed) return;

    try {
      setDeletingId(orderId);
      setError("");
      setMessage("");

      const response = await deleteOrder(orderId);

      if (!response.success) {
        setError(response.message || "Failed to delete order.");
        return;
      }

      setOrders((prev) =>
        prev.filter((order) => order._id !== orderId)
      );

      setMessage("Order deleted successfully.");
    } catch (err) {
      setError(
        err.response?.data?.message || "Failed to delete order."
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Status badge styles
  const getStatusStyle = (status) => {
    const styles = {
      pending: "bg-yellow-100 text-yellow-700",
      processing: "bg-blue-100 text-blue-700",
      shipped: "bg-purple-100 text-purple-700",
      delivered: "bg-green-100 text-green-700",
      cancelled: "bg-red-100 text-red-700",
    };

    return styles[status?.toLowerCase()] || "bg-gray-100 text-gray-700";
  };

  // Format price
  const formatPrice = (price) =>
    `Rs. ${Number(price || 0).toLocaleString("en-PK")}`;

  // Format date
  const formatDate = (date) => {
    if (!date) return "N/A";

    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) return "N/A";

    return parsedDate.toLocaleDateString("en-PK", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Loading UI
  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-gray-200 border-t-indigo-600" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 sm:p-6 lg:p-8">
      <div className="mx-auto max-w-7xl">

        {/* Header */}
        <div className="mb-8 flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              Order Management
            </h1>
            <p className="mt-2 text-sm text-gray-500">
              Manage customer orders, payment and delivery status.
            </p>
          </div>

          <button
            onClick={getOrder}
            className="rounded-lg bg-indigo-600 px-5 py-3 font-medium text-white transition hover:bg-indigo-700"
          >
            Refresh Orders
          </button>
        </div>

        {/* Feedback messages */}
        {message && (
          <div
            role="status"
            className="mb-5 rounded-lg border border-green-200 bg-green-50 p-3 text-sm text-green-700"
          >
            {message}
          </div>
        )}

        {error && (
          <div
            role="alert"
            className="mb-5 rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700"
          >
            {error}
            <button
              onClick={() => setError("")}
              className="ml-3 font-semibold underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Summary Cards */}
        <div className="mb-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Orders
            </p>
            <h2 className="mt-2 text-3xl font-bold text-gray-900">
              {orders.length}
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Pending Orders
            </p>
            <h2 className="mt-2 text-3xl font-bold text-yellow-600">
              {
                orders.filter(
                  (order) => order.status?.toLowerCase() === "pending"
                ).length
              }
            </h2>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">
              Total Order Value
            </p>
            <h2 className="mt-2 text-3xl font-bold text-indigo-600">
              {formatPrice(
                orders.reduce(
                  (total, order) =>
                    total + Number(order.totalAmount || 0),
                  0
                )
              )}
            </h2>
          </div>
        </div>

        {/* Orders Table */}
        <div className="overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm">
          <div className="border-b border-gray-200 px-5 py-4">
            <h2 className="text-lg font-semibold text-gray-900">
              All Orders
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              {orders.length} order(s) found
            </p>
          </div>

          {orders.length === 0 ? (
            <div className="px-6 py-16 text-center">
              <div className="mb-3 text-5xl">📦</div>
              <h3 className="text-lg font-semibold text-gray-800">
                No orders found
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Customer orders will appear here.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full min-w-[1250px] text-left">
                <thead className="bg-gray-50 text-xs uppercase text-gray-500">
                  <tr>
                    <th className="px-5 py-4">Order ID</th>
                    <th className="px-5 py-4">Customer</th>
                    <th className="px-5 py-4">Products</th>
                    <th className="px-5 py-4">Total</th>
                    <th className="px-5 py-4">Payment</th>
                    <th className="px-5 py-4">Status</th>
                    <th className="px-5 py-4">Date</th>
                    <th className="px-5 py-4">Address</th>
                    <th className="px-5 py-4">Actions</th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {orders.map((order) => (
                    <tr
                      key={order._id}
                      className="transition hover:bg-gray-50"
                    >
                      {/* Order ID */}
                      <td className="px-5 py-5">
                        <p className="font-semibold text-indigo-600">
                          #{order._id.slice(-6).toUpperCase()}
                        </p>
                        <p className="mt-1 text-xs text-gray-400">
                          {order._id}
                        </p>
                      </td>

                      {/* Customer */}
                      <td className="px-5 py-5">
                        <p className="font-medium text-gray-900">
                          {order.userID?.name || "Unknown"}
                        </p>
                        <p className="mt-1 text-sm text-gray-500">
                          {order.userID?.email || "No email"}
                        </p>
                      </td>

                      {/* Products */}
                      <td className="px-5 py-5">
                        <div className="space-y-3">
                          {order.items?.map((item, index) => (
                            <div
                              key={item._id || item.productId || index}
                              className="flex items-center gap-3"
                            >
                              <img
                                src={item.image}
                                alt={item.title || "Product"}
                                className="h-12 w-12 rounded-lg border border-gray-200 object-cover"
                              />

                              <div>
                                <p className="max-w-[180px] font-medium text-gray-800">
                                  {item.title}
                                </p>
                                <p className="mt-1 text-xs text-gray-500">
                                  {item.quantity} × {formatPrice(item.price)}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td className="whitespace-nowrap px-5 py-5 font-semibold text-gray-900">
                        {formatPrice(order.totalAmount)}
                      </td>

                      {/* Payment */}
                      <td className="px-5 py-5">
                        <span className="rounded-lg bg-gray-100 px-3 py-1.5 text-xs font-semibold text-gray-700">
                          {order.paymentType || "N/A"}
                        </span>
                      </td>

                      {/* Status Badge */}
                      <td className="px-5 py-5">
                        <span
                          className={`inline-flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize ${getStatusStyle(
                            order.status
                          )}`}
                        >
                          {order.status || "Unknown"}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="whitespace-nowrap px-5 py-5 text-sm text-gray-600">
                        {formatDate(order.createdAt || order.date)}
                      </td>

                      {/* Address */}
                      <td className="px-5 py-5 text-sm text-gray-600">
                        {order.address || "N/A"}
                      </td>

                      {/* Actions */}
                      <td className="min-w-[210px] space-y-3 px-5 py-5">
                        <div>
                          <label
                            htmlFor={`status-${order._id}`}
                            className="mb-1 block text-xs font-medium text-gray-500"
                          >
                            Update status
                          </label>

                          <select
                            id={`status-${order._id}`}
                            value={order.status || "pending"}
                            disabled={
                              updatingId === order._id ||
                              deletingId === order._id
                            }
                            onChange={(e) =>
                              handleStatusChange(
                                order._id,
                                e.target.value
                              )
                            }
                            className="w-full rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm capitalize outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100 disabled:opacity-50"
                          >
                            {statuses.map((status) => (
                              <option key={status} value={status}>
                                {status.charAt(0).toUpperCase() +
                                  status.slice(1)}
                              </option>
                            ))}
                          </select>

                          {updatingId === order._id && (
                            <p className="mt-1 text-xs text-indigo-600">
                              Updating...
                            </p>
                          )}
                        </div>

                        <button
                          type="button"
                          disabled={
                            deletingId === order._id ||
                            updatingId === order._id
                          }
                          onClick={() => handleDeleteOrder(order._id)}
                          className="w-full rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deletingId === order._id
                            ? "Deleting..."
                            : "Delete Order"}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminOrder;
