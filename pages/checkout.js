import { useRouter } from "next/router";
import { FaChevronLeft } from "react-icons/fa6";
import Image from "next/image";
import { formatCurrency } from "../utils/format";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import axios from "axios";

const successApi = process.env.NEXT_PUBLIC_SUCCESSCALLBACK_API;
const failureApi = process.env.NEXT_PUBLIC_FAILURECALLBACK_API;
const apiBackend = process.env.NEXT_PUBLIC_GENERAL_API;

export default function Checkout() {
  const router = useRouter();
  const { cartItems, cartCount } = useCart();
  const [buyerInfo, setBuyerInfo] = useState({
    fullName: "",
    email: "",
    phone: "",
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBuyerInfo({ ...buyerInfo, [name]: value });
    setErrors({ ...errors, [name]: "" });
  };

  const validateForm = () => {
    const newErrors = {};

    if (!buyerInfo.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(buyerInfo.email)) {
      newErrors.email = "Invalid email format.";
    }

    if (!buyerInfo.fullName.trim()) {
      newErrors.fullName = "Name is required.";
    }

    if (!buyerInfo.phone.trim()) {
      newErrors.phone = "Phone number is required.";
    } else if (!/^\d+$/.test(buyerInfo.phone)) {
      newErrors.phone = "Phone number must be numeric.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const checkout = async () => {
    if (!validateForm()) {
      return;
    }
    const transformedCartItems = cartItems.map((item) => ({
      id: item.id,
      title: item.title,
      price: item.price_discount,
      quantity: item.quantity,
    }));

    const requestData = {
      ...buyerInfo,
      cartItems: transformedCartItems,
      successRedirectUrl: `${successApi}`,
      failureRedirectUrl: `${failureApi}`,
    };

    try {
      const response = await axios.post(
        `${apiBackend}/transactions/checkout`,
        requestData
      );
      const redirectUrl = response.data.paymentUrl;
      if (redirectUrl) {
        window.location.href = redirectUrl;
      } else {
        alert("URL pembayaran tidak valid. Silakan coba lagi.");
      }
    } catch (error) {
      console.error("Error during checkout:", error);
      alert("Failed to process checkout.");
    }
  };

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price_discount * item.quantity,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50 md:w-[50em] sm:w-[35em] ">
      {/* Header */}
      <header className="bg-gray-50 text-black px-4 py-4 fixed top-0 w-full z-40 max-w-[50em] mx-auto">
        <div className="flex justify-between items-center">
          {/* Back Button */}
          <button
            onClick={() => router.back()}
            className="flex justify-center items-center gap-2 text-xl font-poppins"
          >
            <FaChevronLeft className="w-4 h-4" />
          </button>

          {/* Title */}
          <h1 className="text-xl font-poppins text-center flex-1">Checkout</h1>
        </div>
      </header>

      <div className=" mx-auto pt-14 p-4 grid gap-4 md:grid-cols-2 md:gap-6">
        <div className="space-y-4">
          {/* Product List */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-gray-500 mb-4">PRODUCT</h2>
            <div className="space-y-4 max-h-[30vh] overflow-y-auto ">
              {cartItems.map((item) => (
                <div className="flex gap-3" key={item.id}>
                  <div className="relative text-[12px] w-16 h-16 flex-shrink-0">
                    <Image
                      src={item.image}
                      alt={item.image}
                      layout="fill"
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-[13px] font-medium">{item.title}</h3>
                    <div className="flex justify-between items-center mt-2">
                      <span className="text-sm">{item.quantity}x</span>
                      <span className="font-medium text-[13px]">
                        Rp {formatCurrency(item.price_discount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Buyer Info */}
          <div className="bg-white rounded-lg p-4 shadow-sm">
            <h2 className="text-gray-500 mb-4">BUYER INFO</h2>
            <form className="space-y-4">
              <div>
                <label className="block text-sm mb-1">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={buyerInfo.email}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-sm"
                  placeholder="Your Email"
                  required
                />
                {errors.email && (
                  <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={buyerInfo.fullName}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-sm"
                  placeholder="Your Name"
                  required
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>
              <div>
                <label className="block text-sm mb-1">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={buyerInfo.phone}
                  onChange={handleInputChange}
                  className="w-full p-2 border rounded-md text-sm"
                  placeholder="Your Phone Number"
                  required
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* Payment Details */}
        <div className="bg-white rounded-lg p-4 shadow-sm h-fit">
          <h2 className="text-gray-500 mb-4">PAYMENT DETAIL</h2>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm">Subtotal</span>
              <span className="text-sm">Rp {formatCurrency(totalPrice)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Shipping fee</span>
              <span className="text-sm">Rp {formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Discount</span>
              <span className="text-emerald-500">- Rp {formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm">Convenience fee</span>
              <span className="text-sm">Rp {formatCurrency(0)}</span>
            </div>
            <div className="flex justify-between font-medium pt-2 border-t">
              <span>TOTAL</span>
              <span>Rp {formatCurrency(totalPrice)}</span>
            </div>
          </div>

          {/* Buy Button */}
          <button
            className="w-full mt-4 py-3 hover:bg-emerald-600 bg-emerald-500 text-white rounded-lg font-medium"
            onClick={checkout}
          >
            BUY NOW - Rp {formatCurrency(totalPrice)}
          </button>
        </div>
      </div>
    </div>
  );
}
