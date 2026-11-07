import { Link } from "react-router-dom";
import { dashboard } from "../services/adminServices";

export default function AdminHome() {

  async function getDashboard(){
    try{
      let response=await dashboard()
      console.log(response)

    }catch(e){
      console.log('error :',e)
    }
  }

  getDashboard()
  return (
    <div className="space-y-6">

      {/* Welcome */}
      <div>
        <h2 className="text-2xl font-bold text-slate-800">
          Welcome back, Admin 👋
        </h2>

        <p className="mt-1 text-sm text-slate-500">
          Here's what's happening with your store today.
        </p>
      </div>


      {/* Stats */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

        <Stat
          title="Total Sales"
          value="$24,500"
          change="+12.5%"
          icon="💰"
        />

        <Stat
          title="Orders"
          value="1,248"
          change="+8.2%"
          icon="📦"
        />

        <Stat
          title="Products"
          value="356"
          change="+4.3%"
          icon="🛍️"
        />

        <Stat
          title="Customers"
          value="8,420"
          change="+15.1%"
          icon="👥"
        />

      </div>


      {/* Quick Actions */}
      <div className="grid gap-6 md:grid-cols-2">

        {/* Create Post */}
        <div className="rounded-xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">
                Create Post
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Publish something new for customers.
              </p>
            </div>

            <span className="rounded-lg bg-blue-50 p-3 text-xl">
              📝
            </span>
          </div>

          <div className="mt-5">
            <Link
              to="/admin/posts"
              className="inline-flex rounded-lg bg-blue-600 px-5 py-3 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Create New Post
            </Link>
          </div>

        </div>


        {/* Track Order */}
        <div className="rounded-xl bg-white p-6 shadow-sm">

          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold">
                Track Order
              </h3>

              <p className="mt-1 text-sm text-slate-500">
                Check your customer's order.
              </p>
            </div>

            <span className="rounded-lg bg-green-50 p-3 text-xl">
              📦
            </span>
          </div>

          <div className="mt-5 flex gap-3">
            <input
              type="text"
              placeholder="#ORD-1024"
              className="min-w-0 flex-1 rounded-lg border border-slate-200 px-4 py-3 text-sm outline-none focus:border-blue-500"
            />

            <Link
              to="/admin/orders"
              className="rounded-lg bg-slate-900 px-5 py-3 text-sm font-semibold text-white hover:bg-slate-800"
            >
              Track
            </Link>
          </div>

        </div>

      </div>


      {/* Recent Orders */}
      <div className="overflow-hidden rounded-xl bg-white shadow-sm">

        <div className="flex items-center justify-between border-b p-6">
          <div>
            <h3 className="font-bold">
              Recent Orders
            </h3>

            <p className="text-sm text-slate-500">
              Latest orders from your store.
            </p>
          </div>

          <Link
            to="/admin/orders"
            className="text-sm font-semibold text-blue-600"
          >
            View All
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">

            <thead className="bg-slate-50">
              <tr className="text-left text-xs uppercase text-slate-500">
                <th className="px-6 py-4">Order</th>
                <th className="px-6 py-4">Customer</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              <OrderRow
                id="#ORD-1024"
                customer="Ali Khan"
                product="Nike Air Max"
                amount="$120"
                status="Delivered"
              />

              <OrderRow
                id="#ORD-1025"
                customer="Sarah Ahmed"
                product="Apple Watch"
                amount="$299"
                status="Processing"
              />

              <OrderRow
                id="#ORD-1026"
                customer="John Smith"
                product="AirPods Pro"
                amount="$199"
                status="Shipped"
              />
            </tbody>

          </table>
        </div>
      </div>

    </div>
  );
}


function Stat({ title, value, change, icon }) {
  return (
    <div className="rounded-xl bg-white p-5 shadow-sm">

      <div className="flex items-center justify-between">
        <div className="rounded-lg bg-blue-50 p-3 text-xl">
          {icon}
        </div>

        <span className="text-xs font-semibold text-green-600">
          {change}
        </span>
      </div>

      <p className="mt-5 text-sm text-slate-500">
        {title}
      </p>

      <h3 className="mt-1 text-2xl font-bold">
        {value}
      </h3>

    </div>
  );
}


function OrderRow({
  id,
  customer,
  product,
  amount,
  status,
}) {
  const styles = {
    Delivered: "bg-green-100 text-green-700",
    Processing: "bg-yellow-100 text-yellow-700",
    Shipped: "bg-blue-100 text-blue-700",
  };

  return (
    <tr className="border-t hover:bg-slate-50">

      <td className="px-6 py-4 text-sm font-semibold">
        {id}
      </td>

      <td className="px-6 py-4 text-sm">
        {customer}
      </td>

      <td className="px-6 py-4 text-sm text-slate-500">
        {product}
      </td>

      <td className="px-6 py-4 text-sm font-semibold">
        {amount}
      </td>

      <td className="px-6 py-4">
        <span
          className={`rounded-full px-3 py-1 text-xs font-semibold ${styles[status]}`}
        >
          {status}
        </span>
      </td>

    </tr>
  );
}
