import React, { useEffect, useState } from "react";
import { createProduct, deleteProduct, getProduct, updateProduct } from "../services/adminServices";

function AdminProduct() {
  // =========================
  // CATEGORIES
  // =========================
  const categories = [
    "Electronics",
    "Clothing",
    "Shoes",
    "Accessories",
    "Home",
    "Beauty",
    "Sports",
    "Books",
  ];

  // =========================
  // PRODUCTS STATE
  // =========================
  const [products, setProducts] = useState([]);

  // =========================
  // FORM STATE
  // =========================
  const [form, setForm] = useState({
    title: "",
    description: "",
    price: "",
    category: "",
    image: null,
  });

  // =========================
  // EDIT STATE
  // =========================
  const [editId, setEditId] = useState(null);

  // =========================
  // HANDLE INPUT
  // =========================
  // const handleChange = (e) => {
  //   const { name, value } = e.target;

  //   setForm((prev) => ({
  //     ...prev,
  //     [name]: value,
  //   }));
  // };

//   const handleChange = (e) => {
//   const { name, files, value } = e.target;

//   if (name === "image") {
//     setForm({
//       ...form,
//       image: files[0],
//     });
//     console.log(form.image)
//   } else {
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   }
// };

const handleChange = (e) => {
  const { name, files, value } = e.target;

  if (name === "image") {
    // Safely extract the file asset
    const selectedFile = files[0];
    
    setForm((prev) => ({
      ...prev,
      image: selectedFile, // Directly updating through functional state
    }));
  } else {
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  }
};

  // =========================
  // RESET FORM
  // =========================
  const resetForm = () => {
    setForm({
      title: "",
      description: "",
      price: "",
      category: "",
      image: null,
    });

    setEditId(null);
  };

  // =========================
  // ADD / UPDATE PRODUCT
  // =========================
//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     // Validation
//     if (
//       !form.title.trim() ||
//       !form.description.trim() ||
//       !form.price ||
//       !form.category ||
//       !form.image
//     ) {
//       alert("Please fill all fields");
//       return;
//     }

//     // UPDATE PRODUCT
//     // update editID
//     if (editId !== null) {
//    try{
//     let response=await updateProduct(editId,form)
//     console.log(response)
//     if(response.message=='post updated'){
// setProducts((prev) =>
//         prev.map((product) =>
//           product.id === editId
//             ? {
//                 ...product,
//                 title: form.title,
//                 description: form.description,
//                 price: Number(form.price),
//                 category: form.category,
//                 image: form.image,
//               }
//             : product
//         )
//       );

//       alert("Product updated successfully!");

//       resetForm();
//     }else{
//       alert(response.message)
//     }
     
//    }catch(e){
//     console.log("error :",e)
//    }
       
     
//       return;
//     }

//     // // CREATE PRODUCT
//     // const newProduct = {
//     //   // id: Date.now(),
//     //   title: form.title,
//     //   description: form.description,
//     //   price: Number(form.price),
//     //   category: form.category,
//     //   image: form.image,
//     // };


//     try{

      
//      const formData = new FormData();

//   formData.append("image", form.image);
//   formData.append("title", form.title);
//   formData.append("description", form.description);
//   formData.append("price", form.price);
//   formData.append("category", form.category);

//   console.log("formData     :",formData)
//       let response=await createProduct(formData)
//       console.log(response)
//       if(response.message="success"){
//         alert("Product added successfully!");
        
//       }else{
      
//         alert(response.message);
//       }
      
//     }catch(e){
//       console.log("error :",e)
//       alert(`error  : ${e}`);

//     }


//     // setProducts((prev) => [...prev, newProduct]);


//     resetForm();
//   };


const handleSubmit = async (e) => {
  e.preventDefault();
  if(!form.image){
    alert('image is required in b')
    return ;
  }

  // Validation
  if (
    !form.title.trim() ||
    !form.description.trim() ||
    !form.price ||
    !form.category ||
    !form.image
  ) {
    alert("Please fill all fields");
    return;
  }

  // Create FormData for both create and update
  const formData = new FormData();

  formData.append("title", form.title);
  formData.append("description", form.description);
  formData.append("price", form.price);
  formData.append("category", form.category);

  // formData.append("image", form.image);
  // if (form.image instanceof File) {
  formData.append("image", form.image);
// }

  // Only append image if it is a new File
  // if (form.image instanceof File) {
  //   formData.append("image", form.image);
  // }
  // console.log("form data    :",Object.fromEntries(formData.entries()))

  try {
    let response;

    // UPDATE PRODUCT
    if (editId !== null) {
      response = await updateProduct(editId, formData);

      console.log(response);

      if (response.message === "post updated") {
        setProducts((prev) =>
          prev.map((product) =>
            product._id === editId
              ? {
                  ...product,
                  title: form.title,
                  description: form.description,
                  price: Number(form.price),
                  category: form.category,
                  image: response.product?.image || product.image,
                }
              : product
          )
        );

        alert("Product updated successfully!");
        resetForm();
      } else {
        alert(response.message);
      }

      return;
    }

    // console.log("Is image File:", form.image instanceof File);

    console.log("FormData image:", formData.get("image"));
    // console.log('state in image',form.image)

// for (const [key, value] of formData.entries()) {
//   console.log(key, value);
// }

    // CREATE PRODUCT
    response = await createProduct(formData);

    console.log(response);

    if (response.message === "success") {
      alert("Product added successfully!");

      // Optional: reload products from API
      // getProducts();
    } else {
      alert(response.message);
    }

    resetForm();

  } catch (error) {
    console.log("Error:", error);
    alert(error.response?.data?.message || "Something went wrong");
  }
};

  // =========================
  // EDIT PRODUCT
  // =========================
  const handleEdit = (product) => {
    setEditId(product._id);

    setForm({
      title: product.title,
      description: product.description,
      price: product.price,
      category: product.category,
      image: product.image,
    });

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  // =========================
  // DELETE PRODUCT
  // =========================
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?"
    );

    if (!confirmDelete) {
      return;
    }
    try{
      let response=await deleteProduct(id)
      if(response.message=='post deleted'){
      await  getproduct()
     
        setProducts((prev) =>
       prev.filter((product) => product.id !== id)
     );

}

    }catch(e){
      console.log(e)
    }

   

    // If deleting the product currently being edited
    if (editId === id) {
      resetForm();
    }

    alert("Product deleted successfully!");
  };

  // =========================
  // CANCEL EDIT
  // =========================
  const handleCancel = () => {
    resetForm();
  };

 async function getproduct(){
  try{
  let response=await getProduct()
  console.log(response.posts)
  setProducts(response.posts)
  }catch(e){
console.log(e)
  }

 }

 useEffect(()=>{
  getproduct()
 },[])


  return (
    <div className="min-h-screen bg-gray-100 px-4 py-8 sm:px-6 lg:px-8">

      <div className="mx-auto max-w-7xl">

        {/* ======================================
            PAGE HEADER
        ====================================== */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Product Management
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Create, update and manage your products.
          </p>
        </div>

        {/* ======================================
            PRODUCT FORM
        ====================================== */}
        <div className="mb-10 rounded-xl bg-white p-6 shadow-sm ring-1 ring-gray-200">

          {/* Form Header */}
          <div className="mb-6 flex items-center justify-between">

            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {editId !== null
                  ? "Edit Product"
                  : "Add Product"}
              </h2>

              <p className="mt-1 text-sm text-gray-500">
                {editId !== null
                  ? "Update the product information."
                  : "Enter the information for a new product."}
              </p>
            </div>

            {editId !== null && (
              <span className="rounded-full bg-yellow-100 px-3 py-1 text-xs font-medium text-yellow-800">
                Editing
              </span>
            )}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>

            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

              {/* ==================================
                  TITLE
              ================================== */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Product Title
                </label>

                <input
                  type="text"
                  name="title"
                  value={form.title}
                  onChange={handleChange}
                  placeholder="Enter product title"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* ==================================
                  CATEGORY DROPDOWN
              ================================== */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Category
                </label>

                <select
                  name="category"
                  value={form.category}
                  onChange={handleChange}
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                >
                  <option value="">
                    Select Category
                  </option>

                  {categories.map((category) => (
                    <option
                      key={category}
                      value={category}
                    >
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              {/* ==================================
                  PRICE
              ================================== */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={form.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                  min="0"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* ==================================
                  IMAGE URL
              ================================== */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Image URL
                </label>

                <input
                  type="file"
                  name="image"
                  accept="image/*"
                  onChange={handleChange}
                  placeholder="https://example.com/image.jpg"
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* ==================================
                  DESCRIPTION
              ================================== */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700">
                  Description
                </label>

                <textarea
                  name="description"
                  value={form.description}
                  onChange={handleChange}
                  rows="4"
                  placeholder="Enter product description"
                  className="w-full resize-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm text-gray-900 outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* ==================================
                  IMAGE PREVIEW
              ================================== */}
              {form.image && (
                <div className="md:col-span-2">

                  <label className="mb-2 block text-sm font-medium text-gray-700">
                    Image Preview
                  </label>

                  <div className="h-40 w-40 overflow-hidden rounded-lg border border-gray-200 bg-gray-100">

                    <img
                      src={form.image}
                      alt="Product Preview"
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        e.currentTarget.style.display =
                          "none";
                      }}
                    />

                  </div>
                </div>
              )}

              {/* ==================================
                  FORM BUTTONS
              ================================== */}
              <div className="flex gap-3 md:col-span-2">

                <button
                  type="submit"
                  className={`rounded-lg px-5 py-2.5 text-sm font-medium text-white transition ${
                    editId !== null
                      ? "bg-yellow-500 hover:bg-yellow-600"
                      : "bg-blue-600 hover:bg-blue-700"
                  }`}
                >
                  {editId !== null
                    ? "Update Product"
                    : "Add Product"}
                </button>

                {editId !== null && (
                  <button
                    type="button"
                    onClick={handleCancel}
                    className="rounded-lg bg-gray-200 px-5 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-300"
                  >
                    Cancel
                  </button>
                )}

              </div>
            </div>
          </form>
        </div>

        {/* ======================================
            PRODUCT LIST HEADER
        ====================================== */}
        <div className="mb-5 flex items-center justify-between">

          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Product List
            </h2>

            <p className="text-sm text-gray-500">
              Manage your existing products.
            </p>
          </div>

          <span className="rounded-full bg-gray-900 px-4 py-1.5 text-sm font-medium text-white">
            Total: {products.length}
          </span>

        </div>

        {/* ======================================
            EMPTY STATE
        ====================================== */}
        {products.length === 0 ? (

          <div className="rounded-xl border border-dashed border-gray-300 bg-white p-10 text-center">

            <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-blue-50 text-2xl text-blue-600">
              +
            </div>

            <h3 className="text-lg font-semibold text-gray-900">
              No products yet
            </h3>

            <p className="mt-1 text-sm text-gray-500">
              Add your first product using the form above.
            </p>

          </div>

        ) : (

          /* ======================================
             PRODUCT GRID
          ====================================== */
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {products.map((product) => (

              <div
                key={product.id}
                className="group overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-gray-200 transition hover:-translate-y-1 hover:shadow-lg"
              >

                {/* ==================================
                    PRODUCT IMAGE
                ================================== */}
                <div className="relative h-56 overflow-hidden bg-gray-100">

                  <img
                    src={product.image}
                    alt={product.title}
                    className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://via.placeholder.com/400x300?text=No+Image";
                    }}
                  />

                  {/* Category */}
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-gray-700 shadow-sm backdrop-blur">
                    {product.category}
                  </span>

                </div>

                {/* ==================================
                    PRODUCT DETAILS
                ================================== */}
                <div className="flex flex-col p-5">

                  {/* Title */}
                  <h3 className="truncate text-lg font-semibold text-gray-900">
                    {product.title}
                  </h3>

                  {/* Description */}
                  <p className="mt-2 line-clamp-3 min-h-[72px] text-sm leading-6 text-gray-500">
                    {product.description}
                  </p>

                  {/* Price */}
                  <div className="mt-4">
                    <span className="text-xl font-bold text-green-600">
                      ${product.price}
                    </span>
                  </div>

                  {/* Buttons */}
                  <div className="mt-5 flex gap-2">

                    <button
                      onClick={() =>
                        handleEdit(product)
                      }
                      className="flex-1 rounded-lg bg-yellow-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-yellow-600"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(product._id)
                      }
                      className="flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-700"
                    >
                      Delete
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

export default AdminProduct;
