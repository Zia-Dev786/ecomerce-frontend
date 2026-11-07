import React from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Navbar() {
let navigate=useNavigate()

  function lougout(){
    localStorage.clear()
    navigate('/login')

  }

  return (
    <nav className="bg-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold text-blue-600">
          MyLogo
        </div>

        {/* Navigation Links */}
        <div className="hidden items-center gap-8 md:flex">
          <Link
            to="/"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Home
          </Link>

          <Link
            to="/products"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            Product
          </Link>

          <Link
            to="/addtocart"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            addtocart
          </Link>
          <Link
            to="/orders"
            className="font-medium text-gray-700 transition hover:text-blue-600"
          >
            orders
          </Link>

        </div>

        {/* Button */}
       <div className="flex">
         
        <button onClick={lougout}  className="hidden rounded-lg bg-red-600 px-5 py-2 font-medium text-white transition hover:bg-red-700 md:block">
          logout
        </button>
       </div>

        {/* Mobile Menu Button */}
        <button className="text-gray-700 md:hidden">
          ☰
        </button>
      </div>
    </nav>
  );
}

export default Navbar;
