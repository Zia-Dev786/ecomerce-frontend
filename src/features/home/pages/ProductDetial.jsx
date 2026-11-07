import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getDetialProduct } from "../services/homeServices";
import { cartContext } from "../../../core/hooks/cartHook";
import { useContext } from "react";

function ProductDetial() {
  const [productData, setProductData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let {addProduct}=useContext(cartContext)

  const { id } = useParams();

  async function getProduct() {
    try {
      setLoading(true);

      const response = await getDetialProduct(id);

      console.log("Product Response:", response);

      if (response.message === "success") {
        setProductData(response.post);
      } else {
        setError(response.message);
      }
    } catch (e) {
      console.log("error:", e);
      setError("Something went wrong while loading product.");
    } finally {
      setLoading(false);
    }
  }

  function addToCart(product){
    console.log(product)
    let {_id,title,price,image}=product
    let productObj={_id,title,price,image}
    console.log(productObj)
    addProduct(productObj)
  }

  useEffect(() => {
    getProduct();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading product...</p>
        </div>
      </div>
    );
  }

  // Error
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="bg-white p-8 rounded-xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-red-500 mb-3">
            Error
          </h2>

          <p className="text-gray-600 mb-5">{error}</p>

          <Link
            to="/"
            className="inline-block bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
          >
            Back Home
          </Link>
        </div>
      </div>
    );
  }

  // No product
  if (!productData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">

      <div className="max-w-6xl mx-auto">

        {/* Back Button */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-800 mb-6"
        >
          ← Back to Products
        </Link>

        {/* Product Card */}
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

          <div className="grid grid-cols-1 md:grid-cols-2">

            {/* Product Image */}
            <div className="bg-gray-100 flex items-center justify-center p-8 min-h-[400px]">

              <img
                src={productData.image}
                alt={productData.title}
                className="w-full max-w-md h-[400px] object-contain rounded-xl"
                onError={(e) => {
                  e.target.src =
                    "https://via.placeholder.com/500x500?text=No+Image";
                }}
              />

            </div>

            {/* Product Information */}
            <div className="p-8 md:p-12">

              {/* Category */}
              <span className="inline-block bg-blue-100 text-blue-700 text-sm font-semibold px-4 py-2 rounded-full mb-5">
                {productData.category}
              </span>

              {/* Title */}
              <h1 className="text-4xl font-bold text-gray-900 mb-4">
                {productData.title}
              </h1>

              {/* Price */}
              <div className="mb-6">
                <span className="text-4xl font-bold text-green-600">
                  ${productData.price}
                </span>
              </div>

              {/* Description */}
              <div className="mb-8">
                <h2 className="text-lg font-semibold text-gray-900 mb-2">
                  Description
                </h2>

                <p className="text-gray-600 leading-7">
                  {productData.description}
                </p>
              </div>

              {/* Product Info */}
              <div className="border-t border-gray-200 pt-6 mb-8">

                <div className="flex justify-between py-3">
                  <span className="text-gray-500">
                    Category
                  </span>

                  <span className="font-medium text-gray-900">
                    {productData.category}
                  </span>
                </div>

                <div className="flex justify-between py-3">
                  <span className="text-gray-500">
                    Product ID
                  </span>

                  <span className="font-medium text-gray-900 text-sm">
                    {productData._id}
                  </span>
                </div>

              </div>

              {/* Buttons */}
              <div className="flex gap-4">

                <button
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition"
                  onClick={() => addToCart(productData)}
              
              >
                  Add to Cart
                </button>

                <button
                  className="flex-1 border border-gray-300 hover:bg-gray-100 text-gray-900 font-semibold py-3 px-6 rounded-lg transition"
                >
                  Buy Now
                </button>

              </div>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductDetial;

