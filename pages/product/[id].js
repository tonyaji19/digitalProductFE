import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Header from "@/components/Header";
import { formatCurrency } from "../../utils/format";
import { useCart } from "../../context/CartContext";
import CartModal from "@/components/CartModals";

const apiCart = process.env.NEXT_PUBLIC_CONTEXT_API;
const apiBackend = process.env.NEXT_PUBLIC_GENERAL_API;

export default function ProductDetail() {
  const router = useRouter();
  const { id } = router.query;

  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showAlert, setShowAlert] = useState(false);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const { updateCartCount } = useCart();

  const addToCart = async (product) => {
    axios
      .post(`${apiCart}`, {
        id: product.id,
        title: product.title,
        price_discount: product.price_discount,
        quantity: 1,
      })
      .then((response) => {
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false); // Sembunyikan alert
          setIsCartOpen(true); // Buka modal cart
        }, 1200);
        const newCartCount = response.data.cart.length;
        updateCartCount(newCartCount);
      })
      .catch((error) => {
        console.error("Error adding product to cart:", error);
      });
  };

  useEffect(() => {
    if (!id) return;

    axios
      .get(`${apiBackend}/products/${id}`)
      .then((response) => {
        setProduct(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error loading product details");
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!product) {
    return <div>Product not found.</div>;
  }

  return (
    <div className="bg-white min-h-full max-w-mobile mx-auto overflow-y-auto">
      {showAlert && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-30 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80 text-center">
            <p className="text-2xl font-semibold text-gray-800 mb-4">
              <span role="img" aria-label="success" className="mr-2">
                🎉
              </span>
              Product added to cart!
            </p>
            <p className="text-sm text-gray-600">
              Your item has been successfully added to the cart.
            </p>
          </div>
        </div>
      )}

      <Head>
        <title>{product.title} | Nevertoolate</title>
      </Head>
      <Header />
      <main className="pt-[12%] pb-8 px-8">
        {/* Product Image */}
        <div className="bg-white overflow-hidden">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.title}
            width={500}
            height={250}
            className="w-full object-cover rounded-md"
          />
          <div className="px-4 py-3">
            <h1 className="text-xl font-bold text-gray-800">{product.title}</h1>
            <p className="text-sm text-gray-600 mt-2">{product.description}</p>
          </div>

          {/* Product Details */}
          <div className="p-4">
            <h2 className="text-sm text-gray-600">Description:</h2>
            <p className="text-sm text-gray-700 whitespace-pre-line">
              {product.details}
            </p>
          </div>

          {/* Price */}
          <div className="p-4 text-center">
            {product.price_discount && (
              <p className="text-2xl font-bold text-green-600">
                IDR {formatCurrency(product.price_discount)}
              </p>
            )}
            <p className="text-sm text-gray-500 line-through">
              IDR {formatCurrency(product.price)}
            </p>
          </div>

          {/* Add to Cart Button */}
          <div className="p-4">
            <button
              className="w-full bg-[#009688] text-white font-semibold py-2 px-4 rounded hover:bg-[#00796b] transition"
              onClick={() => addToCart(product)}
            >
              BUY NOW
            </button>
          </div>
        </div>
      </main>

      {/* Cart Modal */}
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
    </div>
  );
}
