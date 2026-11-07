import React, { useEffect, useState } from "react";
import { getProductByCategory } from "../services/homeServices";
import { useParams,useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../../core/hooks/cartHook";

function ProductbyCategroy() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  let {addProduct}=useContext(cartContext)
  let {category}=useParams()
  let navigate=useNavigate()
  console.log(category)


    function addToCart(product){
    console.log(product)
    let {_id,title,price,image}=product
    let productObj={_id,title,price,image}
    console.log(productObj)
    addProduct(productObj)
  }


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");
        
        let response=await getProductByCategory(category)

        console.log(response)
        if(response.message=="success"){
          setProducts(response.post)
        }

      } catch (err) {
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  function productDetial(id){
    navigate(`/products/productDetial/${id}`)
  }

  // Loading UI
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 px-6 py-10">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Products
        </h1>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-xl bg-white p-4 shadow"
            >
              <div className="mb-4 h-56 rounded-lg bg-gray-200"></div>
              <div className="mb-3 h-5 rounded bg-gray-200"></div>
              <div className="h-4 w-1/2 rounded bg-gray-200"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // Error UI
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100 px-6">
        <div className="rounded-xl bg-white p-8 text-center shadow-md">
          <h2 className="mb-2 text-2xl font-bold text-red-600">
            Something went wrong
          </h2>

          <p className="text-gray-600">{error}</p>

          <button
            onClick={() => window.location.reload()}
            className="mt-5 rounded-lg bg-blue-600 px-5 py-2 text-white transition hover:bg-blue-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 px-6 py-10">
      <div className="mx-auto max-w-7xl">
        <h1 className="mb-8 text-3xl font-bold text-gray-800">
          Products
        </h1>

        {products.length === 0 ? (
          <div className="rounded-xl bg-white p-10 text-center shadow">
            <p className="text-gray-500">No products found.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {products.map((product) => (
              <div 
                key={product._id}
                className="overflow-hidden rounded-xl bg-white shadow-md transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex h-64 items-center justify-center bg-white p-5">
                  <img 
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover"
                  />
                </div>

                <div className="p-5">
                  <p className="mb-2 text-sm capitalize text-blue-600">
                    {product.category}
                  </p>

                  <h2 className="mb-3 line-clamp-2 text-lg font-semibold text-gray-800">
                    {product.title}
                  </h2>

                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold text-green-600">
                      ${product.price}
                    </span>

                    <button onClick={()=>productDetial(product._id)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                     view
                    </button>
                    <button onClick={()=>addToCart(product)} className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700">
                      +
                    </button>
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

export default ProductbyCategroy;
