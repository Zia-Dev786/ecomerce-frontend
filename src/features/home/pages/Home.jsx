import { Link } from "react-router-dom";
import { getProduct } from "../services/homeServices";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import { cartContext } from "../../../core/hooks/cartHook";
import { MdAssistant } from "react-icons/md";
import { motion } from "framer-motion";

export default function UserHome() {
  const categories = [
  { icon: "💻", title: "Electronics" },
  { icon: "👕", title: "Clothing" },
  { icon: "👟", title: "Shoes" },
  { icon: "👜", title: "Accessories" },
  { icon: "🏠", title: "Home" },
  { icon: "💄", title: "Beauty" },
  { icon: "⚽", title: "Sports" },
  { icon: "📚", title: "Books" },
];
const {addProduct}=useContext(cartContext)
let [products,setProducts]=useState([])
let navigate=useNavigate()

  async function getProducts(){
  try{
    let response=await getProduct()
    console.log(response)
    if(response.message=="success"){
      setProducts(response.posts)
    }else{
      console.log(response.message)
    }
  }catch(e){
    console.log(`error : ${e}`)

  }
}

function productDetial(id){
  navigate(`/products/productDetial/${id}`)
}

useEffect(()=>{
  getProducts()
},[])



  return (
    <div>

      {/* Hero */}
      <section className="bg-slate-900 text-white">

        <div className="mx-auto grid max-w-7xl items-center gap-10 px-4 py-20 md:grid-cols-2">

          <div>
            <span className="rounded-full bg-blue-600/20 px-4 py-2 text-sm text-blue-300">
              New Collection
            </span>

            <h1 className="mt-6 text-4xl font-bold leading-tight sm:text-5xl">
              Discover Products
              <span className="text-blue-500">
                {" "}You’ll Love
              </span>
            </h1>

            <p className="mt-5 max-w-lg text-slate-400">
              Shop the latest products at great prices.
              Fast delivery and secure checkout.
            </p>

            <div className="mt-8 flex gap-3">
              <Link
                to="/products"
                className="rounded-lg bg-blue-600 px-6 py-3 font-semibold hover:bg-blue-700"
              >
                Shop Now
              </Link>

              <Link
                to="/products"
                className="rounded-lg border border-slate-600 px-6 py-3 font-semibold hover:bg-slate-800"
              >
                View Products
              </Link>
            </div>
          </div>


          {/* Hero image placeholder */}
          <div className="flex h-80 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 text-8xl">
            🛍️
          </div>

        </div>
      </section>


     <section className="mx-auto max-w-7xl px-4 py-16">
  <div className="text-center">
    <h2 className="text-3xl font-bold">
      Shop by Category
    </h2>

    <p className="mt-2 text-slate-500">
      Find exactly what you're looking for.
    </p>
  </div>

  <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
    {categories.map((category) => (
      <Category
        key={category.title}
        icon={category.icon}
        title={category.title}
      />
    ))}
  </div>
</section>

      {/* Products */}
      <section className="bg-slate-50 py-16">

        <div className="mx-auto max-w-7xl px-4">

          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-3xl font-bold">
                Featured Products
              </h2>

              <p className="mt-2 text-slate-500">
                Popular products selected for you.
              </p>
            </div>

            <Link
              to="/products"
              className="font-semibold text-blue-600"
            >
              View All
            </Link>
          </div>


          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">

           {products.map((product)=>{
            return  <Product
            key={product._id}
              productDetial={productDetial}
              addProduct={addProduct}
              id={product._id}
              name={product.title}
              price={product.price}
              image={product.image}
            />
           })}

          
          </div>

         <motion.div
  className="fixed right-[50px] bottom-[50px] cursor-pointer rounded-full bg-blue-600 p-3 text-white shadow-lg"
  animate={{
    rotate: [0, -10, 10, -10, 10, 0],
    scale: [1, 1.05, 1],
  }}
  transition={{
    duration: 0.5,
    repeat: Infinity,
    repeatDelay: 1,
    ease: "easeInOut",
  }}
  whileHover={{ scale: 1.2 }}
  onClick={() => navigate("/chatbot")}
>
  <MdAssistant className="text-4xl" />
</motion.div>

        </div>
      </section>

    </div>
  );
}


function Category({ icon, title }) {
  return (
    <Link
      to={`/products/${title}`}
      className="rounded-xl border bg-white p-8 text-center transition hover:-translate-y-1 hover:border-blue-500 hover:shadow-lg"
    >
      <div className="text-5xl">
        {icon}
      </div>

      <h3 className="mt-4 font-bold">
        {title}
      </h3>
    </Link>
  );
}


function Product({id, name, price, image,productDetial,addProduct }) {
 
  function addToCart(){
    let productObj={_id:id,title:name,price,image}
    console.log(productObj)
    addProduct(productObj)
  }
  
  return (
    <div   className="overflow-hidden rounded-xl bg-white shadow-sm transition hover:-translate-y-1 hover:shadow-lg">

     
       <img className="h-52 w-full" src={image} alt="" />
     

      <div className="p-5">

        <h3 className="font-semibold">
          {name}
        </h3>

        <div className="mt-3 flex items-center justify-between">

          <span className="text-lg font-bold">
            {price}
          </span>

          <button onClick={()=>productDetial(id)} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
            view
          </button>
          <button onClick={()=>addToCart()} className="rounded-lg bg-blue-600 px-3 py-2 text-sm font-semibold text-white hover:bg-blue-700">
          +
          </button>

        </div>

      </div>
    </div>
  );
}
