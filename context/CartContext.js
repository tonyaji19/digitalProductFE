import { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";

const apiCart = process.env.NEXT_PUBLIC_CONTEXT_API;

// Create the Cart Context
const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartCount, setCartCount] = useState(0);

  // Fetch cart data from the server and update the context
  const fetchCart = async () => {
    try {
      const response = await axios.get(`${apiCart}`);
      const fetchedCartItems = response.data;
      setCartItems(fetchedCartItems);
      updateCartCount(fetchedCartItems); // Update cart count based on unique products
    } catch (error) {
      console.error("Error fetching cart data:", error);
    }
  };

  // Update cart count based on the number of unique products
  const updateCartCount = (items) => {
    // The count is now based on the number of unique products, not the total quantity
    setCartCount(items.length);
  };

  useEffect(() => {
    // Update the cart count whenever the cart items change
    updateCartCount(cartItems); // Call to update cart count
  }, [cartItems]);

  // Function to add item to the cart
  const addToCart = async (item) => {
    try {
      const existingItem = cartItems.find((i) => i.id === item.id);
      if (existingItem) {
        // If the item already exists, update its quantity
        await axios.put(`${apiCart}`, {
          id: item.id,
          quantity: existingItem.quantity + 1,
        });
      } else {
        // If the item is new, add it to the cart
        await axios.post(`${apiCart}`, item);
      }
      // Fetch the updated cart
      fetchCart();
    } catch (error) {
      console.error("Error adding item to cart:", error);
    }
  };

  // Function to reduce item quantity
  const reduceQuantity = async (id) => {
    try {
      const item = cartItems.find((i) => i.id === id);
      if (item.quantity > 1) {
        await axios.put(`${apiCart}`, {
          id,
          quantity: item.quantity - 1,
        });
      } else {
        await removeFromCart(id); // If quantity is 1, we remove the item instead
      }
      fetchCart(); // Fetch the updated cart
    } catch (error) {
      console.error("Error reducing item quantity:", error);
    }
  };

  // Function to remove item from the cart
  const removeFromCart = async (id) => {
    try {
      await axios.delete(`${apiCart}/${id}`);
      fetchCart(); // Fetch the updated cart
    } catch (error) {
      console.error("Error removing item from cart:", error);
    }
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        cartCount,
        fetchCart,
        addToCart,
        reduceQuantity,
        removeFromCart,
        updateCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
