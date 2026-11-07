import React from 'react'
import AppRooute from './config/AppRoute'

function App() {
  return (
    <>
    <AppRooute/>
    </>
  )
}

export default App




// import React, { useState } from "react";

// export default function App() {
//   const [selectedStyle, setSelectedStyle] = useState(1);

//   const [product, setProduct] = useState({
//     name: "Premium T-Shirt",
//     price: 49.99,
//     quantity: 1,
//     discount: 10,
//     image:
//       "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=500",
//   });

//   const updateProduct = (field, value) => {
//     setProduct((prev) => ({
//       ...prev,
//       [field]: value,
//     }));
//   };

//   const subtotal = Number(product.price) * Number(product.quantity);
//   const discountAmount =
//     (subtotal * Number(product.discount || 0)) / 100;
//   const total = subtotal - discountAmount;

//   const styles = [
//     "Classic",
//     "Modern",
//     "Minimal",
//     "Dark",
//     "Premium",
//   ];

//   return (
//     <>
//       <style>{`
//         * {
//           box-sizing: border-box;
//         }

//         body {
//           margin: 0;
//           font-family: Inter, Arial, sans-serif;
//           background: #f4f6f9;
//           color: #171717;
//         }

//         button,
//         input {
//           font-family: inherit;
//         }

//         .app {
//           min-height: 100vh;
//           padding: 30px;
//         }

//         .header {
//           max-width: 1400px;
//           margin: 0 auto 25px;
//         }

//         .header h1 {
//           margin: 0;
//           font-size: 30px;
//         }

//         .header p {
//           color: #737373;
//           margin: 7px 0 0;
//         }

//         .builder {
//           max-width: 1400px;
//           margin: auto;
//           display: grid;
//           grid-template-columns: 380px 1fr;
//           gap: 25px;
//           align-items: start;
//         }

//         /* LEFT PANEL */

//         .panel {
//           background: white;
//           border-radius: 18px;
//           padding: 24px;
//           box-shadow: 0 8px 30px rgba(0,0,0,.06);
//         }

//         .panel h2 {
//           margin: 0 0 22px;
//           font-size: 20px;
//         }

//         .field {
//           margin-bottom: 18px;
//         }

//         .field label {
//           display: block;
//           font-size: 13px;
//           font-weight: 700;
//           margin-bottom: 7px;
//           color: #444;
//         }

//         .field input {
//           width: 100%;
//           height: 45px;
//           border: 1px solid #ddd;
//           border-radius: 10px;
//           padding: 0 13px;
//           outline: none;
//           font-size: 14px;
//           transition: .2s;
//         }

//         .field input:focus {
//           border-color: #6366f1;
//           box-shadow: 0 0 0 3px rgba(99,102,241,.1);
//         }

//         .style-title {
//           margin-top: 28px;
//           margin-bottom: 12px;
//           font-weight: 700;
//           font-size: 15px;
//         }

//         .styles {
//           display: grid;
//           grid-template-columns: 1fr 1fr;
//           gap: 10px;
//         }

//         .style-btn {
//           border: 1px solid #ddd;
//           background: #fff;
//           border-radius: 10px;
//           padding: 13px 10px;
//           cursor: pointer;
//           transition: .2s;
//           font-weight: 600;
//         }

//         .style-btn:hover {
//           border-color: #6366f1;
//         }

//         .style-btn.active {
//           color: white;
//           background: #6366f1;
//           border-color: #6366f1;
//         }

//         /* PREVIEW */

//         .preview {
//           min-height: 650px;
//           background: #e9edf3;
//           border-radius: 20px;
//           padding: 40px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         /* COMMON CART */

//         .cart {
//           width: 100%;
//           max-width: 600px;
//         }

//         .product-img {
//           width: 100%;
//           height: 250px;
//           object-fit: cover;
//         }

//         .cart h2 {
//           margin: 0;
//         }

//         .cart p {
//           margin: 5px 0;
//         }

//         .price {
//           font-size: 22px;
//           font-weight: 800;
//         }

//         .old-price {
//           text-decoration: line-through;
//           color: #999;
//           font-size: 14px;
//           margin-left: 7px;
//         }

//         .qty {
//           display: flex;
//           align-items: center;
//           gap: 12px;
//         }

//         .qty button {
//           width: 34px;
//           height: 34px;
//           border: 1px solid #ddd;
//           background: white;
//           border-radius: 8px;
//           cursor: pointer;
//           font-size: 18px;
//         }

//         .qty span {
//           min-width: 25px;
//           text-align: center;
//           font-weight: 700;
//         }

//         .cart-button {
//           width: 100%;
//           height: 48px;
//           border: 0;
//           cursor: pointer;
//           font-weight: 700;
//           font-size: 15px;
//         }

//         .summary {
//           border-top: 1px solid #ddd;
//           padding-top: 15px;
//           margin-top: 18px;
//         }

//         .summary-row {
//           display: flex;
//           justify-content: space-between;
//           margin: 9px 0;
//         }

//         .total {
//           font-size: 20px;
//           font-weight: 800;
//         }

//         /* STYLE 1 */

//         .style1 {
//           background: white;
//           border-radius: 18px;
//           overflow: hidden;
//           box-shadow: 0 15px 40px rgba(0,0,0,.12);
//         }

//         .style1 .content {
//           padding: 25px;
//         }

//         .style1 .cart-button {
//           background: #111827;
//           color: white;
//           border-radius: 10px;
//           margin-top: 18px;
//         }

//         .style1 .qty {
//           margin: 20px 0;
//         }

//         /* STYLE 2 */

//         .style2 {
//           background: white;
//           border-radius: 5px;
//           padding: 18px;
//           border: 1px solid #ddd;
//         }

//         .style2-inner {
//           display: grid;
//           grid-template-columns: 190px 1fr;
//           gap: 22px;
//         }

//         .style2 .product-img {
//           height: 190px;
//           border-radius: 4px;
//         }

//         .style2 .content {
//           padding: 5px;
//         }

//         .style2 .cart-button {
//           background: #2563eb;
//           color: white;
//           border-radius: 5px;
//           margin-top: 15px;
//         }

//         /* STYLE 3 */

//         .style3 {
//           background: #fff;
//           border-radius: 30px;
//           padding: 30px;
//           border: 1px solid #eee;
//         }

//         .style3 .product-img {
//           height: 260px;
//           border-radius: 20px;
//           margin-bottom: 25px;
//         }

//         .style3 .content {
//           text-align: center;
//         }

//         .style3 .qty {
//           justify-content: center;
//           margin: 20px;
//         }

//         .style3 .cart-button {
//           background: #22c55e;
//           color: white;
//           border-radius: 30px;
//         }

//         .style3 .summary {
//           text-align: left;
//         }

//         /* STYLE 4 */

//         .style4 {
//           background: #111827;
//           color: white;
//           border-radius: 20px;
//           padding: 22px;
//           box-shadow: 0 20px 50px rgba(0,0,0,.3);
//         }

//         .style4 .product-img {
//           height: 270px;
//           border-radius: 15px;
//           margin-bottom: 22px;
//         }

//         .style4 .price {
//           color: #facc15;
//         }

//         .style4 .summary {
//           border-color: #374151;
//         }

//         .style4 .cart-button {
//           background: #facc15;
//           color: #111827;
//           border-radius: 10px;
//           margin-top: 15px;
//         }

//         .style4 .qty button {
//           background: #1f2937;
//           border-color: #4b5563;
//           color: white;
//         }

//         .style4 .old-price {
//           color: #9ca3af;
//         }

//         /* STYLE 5 */

//         .style5 {
//           background: linear-gradient(145deg, #ffffff, #f5f3ff);
//           border-radius: 25px;
//           padding: 10px;
//           box-shadow: 0 25px 60px rgba(109,40,217,.15);
//         }

//         .style5-inner {
//           border: 1px solid #e9d5ff;
//           border-radius: 20px;
//           padding: 20px;
//         }

//         .style5 .product-img {
//           height: 240px;
//           border-radius: 15px;
//         }

//         .style5 .badge {
//           display: inline-block;
//           background: #ede9fe;
//           color: #7c3aed;
//           padding: 5px 10px;
//           border-radius: 20px;
//           font-size: 11px;
//           font-weight: 800;
//           margin-bottom: 12px;
//         }

//         .style5 .cart-button {
//           background: linear-gradient(90deg, #7c3aed, #a855f7);
//           color: white;
//           border-radius: 12px;
//           margin-top: 16px;
//         }

//         @media(max-width: 900px) {
//           .builder {
//             grid-template-columns: 1fr;
//           }

//           .preview {
//             min-height: 500px;
//           }
//         }

//         @media(max-width: 600px) {
//           .app {
//             padding: 15px;
//           }

//           .preview {
//             padding: 15px;
//           }

//           .style2-inner {
//             grid-template-columns: 1fr;
//           }

//           .style2 .product-img {
//             height: 230px;
//           }
//         }
//       `}</style>

//       <div className="app">

//         <div className="header">
//           <h1>Cart Style Builder</h1>
//           <p>
//             Enter your product information and select a cart design.
//           </p>
//         </div>

//         <div className="builder">

//           {/* LEFT SIDE */}

//           <div className="panel">
//             <h2>Product Data</h2>

//             <div className="field">
//               <label>Product Name</label>
//               <input
//                 type="text"
//                 value={product.name}
//                 onChange={(e) =>
//                   updateProduct("name", e.target.value)
//                 }
//               />
//             </div>

//             <div className="field">
//               <label>Price</label>
//               <input
//                 type="number"
//                 value={product.price}
//                 onChange={(e) =>
//                   updateProduct("price", e.target.value)
//                 }
//               />
//             </div>

//             <div className="field">
//               <label>Quantity</label>
//               <input
//                 type="number"
//                 min="1"
//                 value={product.quantity}
//                 onChange={(e) =>
//                   updateProduct(
//                     "quantity",
//                     Math.max(1, Number(e.target.value))
//                   )
//                 }
//               />
//             </div>

//             <div className="field">
//               <label>Discount (%)</label>
//               <input
//                 type="number"
//                 min="0"
//                 max="100"
//                 value={product.discount}
//                 onChange={(e) =>
//                   updateProduct("discount", e.target.value)
//                 }
//               />
//             </div>

//             <div className="field">
//               <label>Product Image URL</label>
//               <input
//                 type="text"
//                 value={product.image}
//                 onChange={(e) =>
//                   updateProduct("image", e.target.value)
//                 }
//               />
//             </div>

//             <div className="style-title">
//               Select Cart Style
//             </div>

//             <div className="styles">
//               {styles.map((style, index) => (
//                 <button
//                   key={style}
//                   className={`style-btn ${
//                     selectedStyle === index + 1
//                       ? "active"
//                       : ""
//                   }`}
//                   onClick={() =>
//                     setSelectedStyle(index + 1)
//                   }
//                 >
//                   Style {index + 1}
//                   <br />
//                   <small>{style}</small>
//                 </button>
//               ))}
//             </div>
//           </div>

//           {/* RIGHT SIDE */}

//           <div className="preview">

//             {/* STYLE 1 */}

//             {selectedStyle === 1 && (
//               <div className="cart style1">
//                 <img
//                   className="product-img"
//                   src={product.image}
//                   alt={product.name}
//                 />

//                 <div className="content">
//                   <h2>{product.name}</h2>

//                   <p>
//                     <span className="price">
//                       ${total.toFixed(2)}
//                     </span>

//                     {product.discount > 0 && (
//                       <span className="old-price">
//                         ${subtotal.toFixed(2)}
//                       </span>
//                     )}
//                   </p>

//                   <div className="qty">
//                     <button
//                       onClick={() =>
//                         updateProduct(
//                           "quantity",
//                           Math.max(
//                             1,
//                             Number(product.quantity) - 1
//                           )
//                         )
//                       }
//                     >
//                       −
//                     </button>

//                     <span>{product.quantity}</span>

//                     <button
//                       onClick={() =>
//                         updateProduct(
//                           "quantity",
//                           Number(product.quantity) + 1
//                         )
//                       }
//                     >
//                       +
//                     </button>
//                   </div>

//                   <div className="summary">
//                     <div className="summary-row">
//                       <span>Subtotal</span>
//                       <span>${subtotal.toFixed(2)}</span>
//                     </div>

//                     <div className="summary-row">
//                       <span>Discount</span>
//                       <span>
//                         -${discountAmount.toFixed(2)}
//                       </span>
//                     </div>

//                     <div className="summary-row total">
//                       <span>Total</span>
//                       <span>${total.toFixed(2)}</span>
//                     </div>
//                   </div>

//                   <button className="cart-button">
//                     Add to Cart
//                   </button>
//                 </div>
//               </div>
//             )}

//             {/* STYLE 2 */}

//             {selectedStyle === 2 && (
//               <div className="cart style2">
//                 <div className="style2-inner">

//                   <img
//                     className="product-img"
//                     src={product.image}
//                     alt={product.name}
//                   />

//                   <div className="content">
//                     <h2>{product.name}</h2>

//                     <p>
//                       <span className="price">
//                         ${total.toFixed(2)}
//                       </span>
//                     </p>

//                     <p>
//                       Premium quality product with a
//                       modern design.
//                     </p>

//                     <div className="qty">
//                       <button
//                         onClick={() =>
//                           updateProduct(
//                             "quantity",
//                             Math.max(
//                               1,
//                               Number(product.quantity) - 1
//                             )
//                           )
//                         }
//                       >
//                         −
//                       </button>

//                       <span>{product.quantity}</span>

//                       <button
//                         onClick={() =>
//                           updateProduct(
//                             "quantity",
//                             Number(product.quantity) + 1
//                           )
//                         }
//                       >
//                         +
//                       </button>
//                     </div>

//                     <button className="cart-button">
//                       Add To Cart
//                     </button>
//                   </div>

//                 </div>
//               </div>
//             )}

//             {/* STYLE 3 */}

//             {selectedStyle === 3 && (
//               <div className="cart style3">

//                 <img
//                   className="product-img"
//                   src={product.image}
//                   alt={product.name}
//                 />

//                 <div className="content">

//                   <h2>{product.name}</h2>

//                   <p>Simple. Clean. Beautiful.</p>

//                   <p>
//                     <span className="price">
//                       ${total.toFixed(2)}
//                     </span>
//                   </p>

//                   <div className="qty">

//                     <button
//                       onClick={() =>
//                         updateProduct(
//                           "quantity",
//                           Math.max(
//                             1,
//                             Number(product.quantity) - 1
//                           )
//                         )
//                       }
//                     >
//                       −
//                     </button>

//                     <span>{product.quantity}</span>

//                     <button
//                       onClick={() =>
//                         updateProduct(
//                           "quantity",
//                           Number(product.quantity) + 1
//                         )
//                       }
//                     >
//                       +
//                     </button>

//                   </div>

//                   <div className="summary">

//                     <div className="summary-row">
//                       <span>Subtotal</span>
//                       <span>${subtotal.toFixed(2)}</span>
//                     </div>

//                     <div className="summary-row">
//                       <span>Discount</span>
//                       <span>
//                         -${discountAmount.toFixed(2)}
//                       </span>
//                     </div>

//                     <div className="summary-row total">
//                       <span>Total</span>
//                       <span>${total.toFixed(2)}</span>
//                     </div>

//                   </div>

//                   <button className="cart-button">
//                     Add to Cart
//                   </button>

//                 </div>
//               </div>
//             )}

//             {/* STYLE 4 */}

//             {selectedStyle === 4 && (
//               <div className="cart style4">

//                 <img
//                   className="product-img"
//                   src={product.image}
//                   alt={product.name}
//                 />

//                 <h2>{product.name}</h2>

//                 <p>Exclusive dark edition</p>

//                 <p>
//                   <span className="price">
//                     ${total.toFixed(2)}
//                   </span>

//                   {product.discount > 0 && (
//                     <span className="old-price">
//                       ${subtotal.toFixed(2)}
//                     </span>
//                   )}
//                 </p>

//                 <div className="qty">

//                   <button
//                     onClick={() =>
//                       updateProduct(
//                         "quantity",
//                         Math.max(
//                           1,
//                           Number(product.quantity) - 1
//                         )
//                       )
//                     }
//                   >
//                     −
//                   </button>

//                   <span>{product.quantity}</span>

//                   <button
//                     onClick={() =>
//                       updateProduct(
//                         "quantity",
//                         Number(product.quantity) + 1
//                       )
//                     }
//                   >
//                     +
//                   </button>

//                 </div>

//                 <div className="summary">

//                   <div className="summary-row">
//                     <span>Subtotal</span>
//                     <span>${subtotal.toFixed(2)}</span>
//                   </div>

//                   <div className="summary-row">
//                     <span>Discount</span>
//                     <span>
//                       -${discountAmount.toFixed(2)}
//                     </span>
//                   </div>

//                   <div className="summary-row total">
//                     <span>Total</span>
//                     <span>${total.toFixed(2)}</span>
//                   </div>

//                 </div>

//                 <button className="cart-button">
//                   Add To Cart
//                 </button>

//               </div>
//             )}

//             {/* STYLE 5 */}

//             {selectedStyle === 5 && (
//               <div className="cart style5">

//                 <div className="style5-inner">

//                   <span className="badge">
//                     PREMIUM PRODUCT
//                   </span>

//                   <img
//                     className="product-img"
//                     src={product.image}
//                     alt={product.name}
//                   />

//                   <h2>{product.name}</h2>

//                   <p>
//                     Elegant product experience with
//                     premium styling.
//                   </p>

//                   <p>
//                     <span className="price">
//                       ${total.toFixed(2)}
//                     </span>

//                     {product.discount > 0 && (
//                       <span className="old-price">
//                         ${subtotal.toFixed(2)}
//                       </span>
//                     )}
//                   </p>

//                   <div className="qty">

//                     <button
//                       onClick={() =>
//                         updateProduct(
//                           "quantity",
//                           Math.max(
//                             1,
//                             Number(product.quantity) - 1
//                           )
//                         )
//                       }
//                     >
//                       −
//                     </button>

//                     <span>{product.quantity}</span>

//                     <button
//                       onClick={() =>
//                         updateProduct(
//                           "quantity",
//                           Number(product.quantity) + 1
//                         )
//                       }
//                     >
//                       +
//                     </button>

//                   </div>

//                   <div className="summary">

//                     <div className="summary-row">
//                       <span>Subtotal</span>
//                       <span>${subtotal.toFixed(2)}</span>
//                     </div>

//                     <div className="summary-row">
//                       <span>Discount</span>
//                       <span>
//                         -${discountAmount.toFixed(2)}
//                       </span>
//                     </div>

//                     <div className="summary-row total">
//                       <span>Total</span>
//                       <span>${total.toFixed(2)}</span>
//                     </div>

//                   </div>

//                   <button className="cart-button">
//                     Add to Cart
//                   </button>

//                 </div>
//               </div>
//             )}

//           </div>
//         </div>
//       </div>
//     </>
//   );
// }
