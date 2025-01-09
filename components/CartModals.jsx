import { useState, useEffect } from "react";
import { LuShoppingCart } from "react-icons/lu";
import { useCart } from "../context/CartContext";
import { formatCurrency } from "../utils/format";
import { useRouter } from "next/router";

export default function CartModal({ isOpen, onClose }) {
  const { cartItems, cartCount, fetchCart, reduceQuantity, removeFromCart } =
    useCart();
  const router = useRouter();

  useEffect(() => {
    if (isOpen) {
      fetchCart(); // Fetch cart data from backend when modal opens
    }
  }, [isOpen, fetchCart]);

  if (!isOpen) return null;

  const handleModalClick = (e) => {
    e.stopPropagation();
  };

  // Calculate total price
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price_discount * item.quantity,
    0
  );

  const grandTotal = totalPrice;

  const handleBuyNow = () => {
    router.push("/checkout");
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-end"
      onClick={onClose}
    >
      <div
        className="bg-white text-gray-900 w-full max-w-md mt-20 rounded-t-2xl p-4"
        onClick={handleModalClick}
      >
        <div className="flex items-center gap-2 mb-4">
          <LuShoppingCart className="w-6 h-6" />
          <h2 className="text-xl font-semibold">Cart ({cartCount})</h2>
        </div>
        <div className="space-y-4 max-h-[60vh] overflow-y-auto ">
          {cartItems.map((item) => (
            <div key={item.id} className="border rounded-lg p-3">
              <h3 className="text-sm font-medium">{item.title}</h3>
              <div className="flex justify-between items-center mt-2">
                <span className="text-sm">Qty: {item.quantity}</span>
                <span className="font-semibold">
                  IDR {formatCurrency(item.price_discount)}
                </span>
              </div>

              <div className="flex gap-2 mt-2">
                <button
                  onClick={() => reduceQuantity(item.id)}
                  className="text-xs bg-gray-200 hover:bg-gray-300 px-2 py-1 rounded"
                >
                  Reduce
                </button>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="text-xs bg-red-200 hover:bg-red-300 px-2 py-1 rounded"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Order Summary */}
        <div className="border-t pt-4 space-y-2">
          <div className="text-sm font-medium">ORDER SUMMARY</div>
          <div className="flex justify-between text-sm">
            <span>Total ({cartItems.length} Items)</span>
            <span>IDR {totalPrice.toLocaleString()}</span>
          </div>
          <div className="flex justify-between font-semibold">
            <span>Grand total</span>
            <span>IDR {grandTotal.toLocaleString()}</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 mt-4">
          <button
            className="w-full hover:bg-emerald-400 bg-emerald-500 text-white rounded-lg py-3 font-medium"
            onClick={handleBuyNow}
          >
            Buy Now
          </button>
          <button
            onClick={() => onClose()}
            className="w-full border border-gray-300 rounded-lg py-3 font-medium hover:bg-gray-100"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
}
