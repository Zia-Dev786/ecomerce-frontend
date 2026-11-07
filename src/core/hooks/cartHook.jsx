// import React, { createContext, useState } from "react";

// export const cartContext = createContext();

// function CartPovider({ children }) {

//   const [cart, setCart] = useState(() => {
//     const savedCart = localStorage.getItem("cart");
//     return savedCart ? JSON.parse(savedCart) : [];
//   });


//   const addProduct= (product) => {

//     setCart((prevCart) => {

//       // list method use check 
//       const existingProduct = prevCart.find(
//         (item) => item._id === product._id
//       );

//       let updatedCart;

//       if (existingProduct) {

//         // If exists -> increase quantity list method  quantity +1
//         updatedCart = prevCart.map((item) =>
//           item._id === product._id
//             ? {
//                 ...item,
//                 quantity: item.quantity + 1
//               }
//             : item
//         );

//       } else {

      
//         updatedCart = [
//           ...prevCart,
//           {
//             _id: product._id,
//             title:product.title,
//             quantity: 1,
//             price: product.price,
//             img: product.image
//           }
//         ];
//       }

//   //  json to string
//       localStorage.setItem(
//         "cart",
//         JSON.stringify(updatedCart)
//       );

//       return updatedCart;
//     });
//   };

//   return (
//     <cartContext.Provider
//       value={{
//         cart,
//         addProduct
//       }}
//     >
//       {children}
//     </cartContext.Provider>
//   );
// }

// export default CartPovider;

// // [{},{},{},{}]   {}


import React, { createContext, useState } from "react";

export const cartContext = createContext();

function CartPovider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // ADD PRODUCT
  const addProduct = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(
        (item) => item._id === product._id
      );

      let updatedCart;

      if (existingProduct) {
        // Product exists -> quantity + 1
        updatedCart = prevCart.map((item) =>
          item._id === product._id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item
        );
      } else {
        // New product
        updatedCart = [
          ...prevCart,
          {
            _id: product._id,
            title: product.title,
            quantity: 1,
            price: product.price,
            image: product.image,
          },
        ];
      }

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // INCREASE QUANTITY
  const increaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.map((item) =>
        item._id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // DECREASE QUANTITY
  const decreaseQuantity = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart
        .map((item) =>
          item._id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        // quantity 0 -> remove product
                            //  1> 0 F
        .filter((item) => item.quantity > 0);

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  // REMOVE PRODUCT COMPLETELY
  const removeProduct = (id) => {
    setCart((prevCart) => {
      const updatedCart = prevCart.filter(
        (item) => item._id !== id
      );

      localStorage.setItem("cart", JSON.stringify(updatedCart));

      return updatedCart;
    });
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        addProduct,
        increaseQuantity,
        decreaseQuantity,
        removeProduct,
      }}
    >
      {children}
    </cartContext.Provider>
  );
}

export default CartPovider;