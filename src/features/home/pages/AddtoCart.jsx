// import React, { useContext } from "react";
// import { cartContext } from "../../../core/hooks/cartHook";

// function AddtoCart() {
//   const {
//     cart,
//     increaseQuantity,
//     decreaseQuantity,
//     removeProduct,
//   } = useContext(cartContext);

//   if (cart.length === 0) {
//     return (
//       <div className="min-h-[60vh] flex items-center justify-center px-4">
//         <div className="text-center">
//           <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
//             🛒
//           </div>

//           <h2 className="text-2xl font-bold text-gray-800">
//             Your Cart is Empty
//           </h2>

//           <p className="mt-2 text-gray-500">
//             Add some products to your cart to continue shopping.
//           </p>

//           <button className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700">
//             Continue Shopping
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="min-h-screen bg-gray-50 px-4 py-10">
//       <div className="mx-auto max-w-6xl">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold text-gray-900">
//             Shopping Cart
//           </h1>

//           <p className="mt-1 text-gray-500">
//             {cart.length} {cart.length === 1 ? "item" : "items"} in your cart
//           </p>
//         </div>

//         <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

//           {/* Cart Products */}
//           <div className="space-y-4 lg:col-span-2">

//             {cart.map((item) => (
//               <div
//                 key={item._id}
//                 className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
//               >
//                 <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

//                   {/* Product Image */}
//                   <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
//                     <img
//                       src={item.image}
//                       alt={item.title}
//                       className="h-full w-full object-cover"
//                     />
//                   </div>

//                   {/* Product Information */}
//                   <div className="flex-1">
//                     <h3 className="text-lg font-semibold text-gray-900">
//                       {item.title}
//                     </h3>

//                     <p className="mt-2 text-lg font-bold text-blue-600">
//                       ${item.price}
//                     </p>

//                     {/* Quantity Controls */}
//                     <div className="mt-4 flex items-center gap-3">
//                       <span className="text-sm font-medium text-gray-600">
//                         Quantity:
//                       </span>

//                       <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
//                         <button
//                           onClick={() => decreaseQuantity(item._id)}
//                           className="flex h-9 w-9 items-center justify-center bg-gray-50 text-lg font-semibold text-gray-700 transition hover:bg-gray-200"
//                         >
//                           −
//                         </button>

//                         <span className="flex h-9 w-10 items-center justify-center border-x border-gray-300 text-sm font-semibold text-gray-800">
//                           {item.quantity}
//                         </span>

//                         <button
//                           onClick={() => increaseQuantity(item._id)}
//                           className="flex h-9 w-9 items-center justify-center bg-gray-50 text-lg font-semibold text-gray-700 transition hover:bg-gray-200"
//                         >
//                           +
//                         </button>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Remove Button */}
//                   <div className="sm:self-start">
//                     <button
//                       onClick={() => removeProduct(item._id)}
//                       className="rounded-lg px-3 py-2 text-sm font-medium text-red-500 transition hover:bg-red-50 hover:text-red-600"
//                     >
//                       Remove
//                     </button>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Order Summary */}
//           <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
//             <h2 className="text-xl font-bold text-gray-900">
//               Order Summary
//             </h2>

//             <div className="my-5 border-t border-gray-200" />

//             <div className="space-y-4">
//               <div className="flex justify-between text-gray-600">
//                 <span>Subtotal</span>
//                 <span className="font-medium text-gray-900">
//                   $
//                   {cart.reduce(
//                     (total, item) =>
//                       total + Number(item.price) * item.quantity,
//                     0
//                   ).toFixed(2)}
//                 </span>
//               </div>

//               <div className="flex justify-between text-gray-600">
//                 <span>Shipping</span>
//                 <span className="font-medium text-green-600">
//                   Free
//                 </span>
//               </div>

//               <div className="flex justify-between text-gray-600">
//                 <span>Tax</span>
//                 <span className="font-medium text-gray-900">
//                   $0.00
//                 </span>
//               </div>
//             </div>

//             <div className="my-5 border-t border-gray-200" />

//             <div className="flex justify-between">
//               <span className="text-lg font-bold text-gray-900">
//                 Total
//               </span>

//               <span className="text-xl font-bold text-blue-600">
//                 $
//                 {cart
//                   .reduce(
//                     (total, item) =>
//                       total + Number(item.price) * item.quantity,
//                     0
//                   )
//                   .toFixed(2)}
//               </span>
//             </div>

//             <button className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]">
//               Proceed to Checkout
//             </button>

//             <button className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50">
//               Continue Shopping
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default AddtoCart;



import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { cartContext } from "../../../core/hooks/cartHook";
import { UserplaceOrder } from "../services/homeServices";

function AddtoCart() {
  const {
    cart,
    setCart,
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
  } = useContext(cartContext);

  const navigate = useNavigate();

  const [showCheckout, setShowCheckout] = useState(false);
  const [address, setAddress] = useState("");
  const [paymentType, setPaymentType] = useState("COD");
  const [placingOrder, setPlacingOrder] = useState(false);
  const [error, setError] = useState("");


  // 0 400   current
  const subtotal = cart.reduce(
    (total, item) =>
      total + Number(item.price) * Number(item.quantity),
    0
  );

  const shipping = 0;
  const tax = 0;
  const total = subtotal + shipping + tax;

  const handleCheckout = () => {
    if (cart.length === 0) return;

    setError("");
    setShowCheckout(true);
  };

  const handlePlaceOrders=(e)=>{
    e.preventDefault();
    setError("");
    if(!address.trim()){
         setError('please enter address')
         return ;
      }

      if(cart.length===0){
         setError('your cart is empty')
         return
      }
    try{
      setPlacingOrder(true)
      let orderData= {
        address,
        paymentType,
        items:cart.map((val)=>({
          productId:val._id,
          title:val.title,
          image:val.image,
          price:Number(val.price),
          quantity:Number(val.quantity)
        }))
      }
      if(paymentType==="Stripe"){
        setError('please connect stripe')
        return
      }else{
        console.log(orderData)
      }


      


    }catch(e){
      console.log(e)
    }

  }


  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    setError("");

    if (!address.trim()) {
      setError("Please enter your delivery address.");
      return;
    }

    if (cart.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    try {
      setPlacingOrder(true);

      const orderData = {
        address: address.trim(),
        paymentType,
        items: cart.map((item) => ({
          productId: item._id,
          title: item.title,
          image: item.image,
          price: Number(item.price),
          quantity: Number(item.quantity),
        })),
        totalAmount: total,
      };

      /*
       * TODO: Connect your backend order API here.
       *
       * COD:
       * 1. Send orderData to your create-order API.
       * 2. Backend verifies prices and stock.
       * 3. Backend saves the order with COD payment.
       *
       * Stripe:
       * 1. Call your backend to create a Stripe Checkout Session.
       * 2. Redirect the user to the Stripe-hosted checkout URL.
       * 3. Confirm payment on the backend using a verified
       *    Stripe webhook before marking the order paid.
       */

      if (paymentType === "Stripe") {
        setError(
          "Stripe checkout is not connected yet. Connect your backend Stripe Checkout Session API to enable card payments."
        );
        return;
      }

      console.log("Order data to submit:", orderData);
      let response =await UserplaceOrder(orderData)
      console.log(response)
      if(response.success){
        localStorage.setItem('cart',[])
        setCart([])        
        setShowCheckout(false)
      }

      // Replace this placeholder with your actual create-order API.
      setError(
        "Connect your create-order API before placing the order. No order has been saved."
      );
    } catch (err) {
      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to place order."
      );
    } finally {
      setPlacingOrder(false);
    }
  };

  // Empty cart
  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center px-4">
        <div className="text-center">
          <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 text-4xl">
            🛒
          </div>

          <h2 className="text-2xl font-bold text-gray-800">
            Your Cart is Empty
          </h2>

          <p className="mt-2 text-gray-500">
            Add some products to your cart to continue shopping.
          </p>

          <button
            onClick={() => navigate("/products")}
            className="mt-6 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition hover:bg-blue-700"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Shopping Cart
          </h1>

          <p className="mt-1 text-gray-500">
            {cart.length}{" "}
            {cart.length === 1 ? "item" : "items"} in your cart
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-3">

          {/* Cart Products */}
          <div className="space-y-4 lg:col-span-2">
            {cart.map((item) => (
              <div
                key={item._id}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

                  {/* Product Image */}
                  <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-xl bg-gray-100">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-contain"
                    />
                  </div>

                  {/* Product Information */}
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-lg font-bold text-blue-600">
                      ${Number(item.price).toFixed(2)}
                    </p>

                    {/* Quantity */}
                    <div className="mt-4 flex items-center gap-3">
                      <span className="text-sm font-medium text-gray-600">
                        Quantity:
                      </span>

                      <div className="flex items-center overflow-hidden rounded-lg border border-gray-300">
                        <button
                          type="button"
                          onClick={() => decreaseQuantity(item._id)}
                          className="flex h-9 w-9 items-center justify-center bg-gray-50 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                        >
                          −
                        </button>

                        <span className="flex h-9 w-10 items-center justify-center border-x border-gray-300 text-sm font-semibold text-gray-800">
                          {item.quantity}
                        </span>

                        <button
                          type="button"
                          onClick={() => increaseQuantity(item._id)}
                          className="flex h-9 w-9 items-center justify-center bg-gray-50 text-lg font-semibold text-gray-700 hover:bg-gray-200"
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Remove */}
                  <button
                    type="button"
                    onClick={() => removeProduct(item._id)}
                    className="self-start rounded-lg px-3 py-2 text-sm font-medium text-red-500 hover:bg-red-50"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="h-fit rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900">
              Order Summary
            </h2>

            <div className="my-5 border-t border-gray-200" />

            <div className="space-y-4 text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-medium text-gray-900">
                  ${subtotal.toFixed(2)}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-medium text-green-600">
                  Free
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span className="font-medium text-gray-900">
                  ${tax.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="my-5 border-t border-gray-200" />

            <div className="flex justify-between">
              <span className="text-lg font-bold text-gray-900">
                Total
              </span>

              <span className="text-xl font-bold text-blue-600">
                ${total.toFixed(2)}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="mt-6 w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 active:scale-[0.98]"
            >
              Proceed to Checkout
            </button>

            <button
              type="button"
              onClick={() => navigate("/products")}
              className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 transition hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>

      {/* Checkout Modal */}
      {showCheckout && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-black/50 p-4"
          onClick={() => {
            if (!placingOrder) setShowCheckout(false);
          }}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="checkout-title"
            className="my-auto w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Modal Header */}
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h2
                  id="checkout-title"
                  className="text-2xl font-bold text-gray-900"
                >
                  Checkout
                </h2>

                <p className="mt-1 text-sm text-gray-500">
                  Enter delivery and payment details.
                </p>
              </div>

              <button
                type="button"
                disabled={placingOrder}
                onClick={() => setShowCheckout(false)}
                className="rounded-full p-2 text-xl text-gray-500 hover:bg-gray-100 disabled:opacity-50"
                aria-label="Close checkout"
              >
                ×
              </button>
            </div>

            <form onSubmit={handlePlaceOrder}>

              {/* Delivery Address */}
              <div className="mb-6">
                <label
                  htmlFor="address"
                  className="mb-2 block text-sm font-semibold text-gray-800"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  rows={3}
                  required
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Enter house number, street, area, city..."
                  className="w-full rounded-xl border border-gray-300 px-4 py-3 text-sm outline-none transition focus:border-blue-500 focus:ring-2 focus:ring-blue-100"
                />
              </div>

              {/* Payment Method */}
              <div className="mb-6">
                <p className="mb-3 text-sm font-semibold text-gray-800">
                  Payment Method
                </p>

                <div className="space-y-3">

                  {/* COD */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      paymentType === "COD"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="COD"
                      checked={paymentType === "COD"}
                      onChange={(e) =>
                        setPaymentType(e.target.value)
                      }
                      className="h-4 w-4 accent-blue-600"
                    />

                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-2xl shadow-sm">
                      💵
                    </span>

                    <span className="flex-1">
                      <span className="block font-semibold text-gray-900">
                        Cash on Delivery
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        Pay when your order arrives.
                      </span>
                    </span>
                  </label>

                  {/* Stripe */}
                  <label
                    className={`flex cursor-pointer items-center gap-3 rounded-xl border p-4 transition ${
                      paymentType === "Stripe"
                        ? "border-blue-500 bg-blue-50"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentType"
                      value="Stripe"
                      checked={paymentType === "Stripe"}
                      onChange={(e) =>
                        setPaymentType(e.target.value)
                      }
                      className="h-4 w-4 accent-blue-600"
                    />

                    <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-2xl shadow-sm">
                      💳
                    </span>

                    <span className="flex-1">
                      <span className="block font-semibold text-gray-900">
                        Pay Online
                      </span>
                      <span className="mt-1 block text-xs text-gray-500">
                        Secure card payment with Stripe.
                      </span>
                    </span>
                  </label>
                </div>
              </div>

              {/* Order Total */}
              <div className="mb-5 rounded-xl bg-gray-50 p-4">
                <div className="flex justify-between text-sm text-gray-600">
                  <span>Items ({cart.length})</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>

                <div className="mt-3 flex justify-between">
                  <span className="font-bold text-gray-900">
                    Total Amount
                  </span>

                  <span className="text-xl font-bold text-blue-600">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div
                  role="alert"
                  className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* Place Order */}
              <button
                type="submit"
                disabled={placingOrder}
                className="w-full rounded-xl bg-blue-600 py-3.5 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-60"
              >
                {placingOrder
                  ? "Processing..."
                  : paymentType === "COD"
                    ? "Place Order"
                    : "Continue to Stripe"}
              </button>

              <button
                type="button"
                disabled={placingOrder}
                onClick={() => setShowCheckout(false)}
                className="mt-3 w-full rounded-xl border border-gray-300 py-3 font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
              >
                Cancel
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddtoCart;