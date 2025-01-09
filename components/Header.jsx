import Link from "next/link";
import { useRouter } from "next/router";
import { LuShoppingCart } from "react-icons/lu";
import { FaChevronLeft } from "react-icons/fa6";
import { useState, useEffect } from "react";
import CartModal from "./CartModals";
import { useCart } from "../context/CartContext";

export default function Header() {
  const router = useRouter();
  const { cartCount } = useCart(); // Get the cart count from global context
  const [isCartOpen, setIsCartOpen] = useState(false);

  useEffect(() => {}, [cartCount]);

  return (
    <>
      <header className="bg-gray-800 text-white px-6 py-4 fixed top-0 w-full z-40 max-w-mobile mx-auto">
        <div className="flex justify-between items-center">
          {router.pathname.includes("/product/[id]") ? (
            <button
              onClick={() => router.back()}
              className="flex justify-center items-center gap-2 text-xl font-poppins"
            >
              <FaChevronLeft className="w-4 h-4" /> Back
            </button>
          ) : (
            <Link href="/" className="text-xl font-poppins">
              Home
            </Link>
          )}

          <div className="relative">
            <button onClick={() => setIsCartOpen(true)}>
              <LuShoppingCart className="w-6 h-6" />
              <span className="absolute -top-2 -right-2 bg-green-600 text-xs rounded-full w-[1.5em] h-[1.5em] flex items-center justify-center">
                {cartCount}
              </span>
            </button>
          </div>
        </div>
      </header>

      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </>
  );
}
