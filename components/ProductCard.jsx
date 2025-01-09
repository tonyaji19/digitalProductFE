import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "../utils/format";

export default function ProductCard({ product }) {
  return (
    <Link href={`/product/${product.id}`}>
      <div
        className="group bg-white border-[2px] border-black overflow-hidden
                      shadow-[2px_2px_2px_0_black,4px_4px_0px_0px_black]
                      h-[450px] w-full
                      transition-all duration-300 ease-in-out
                      hover:scale-[1.01] hover:shadow-[4px_4px_0_0_black,4px_4px_0_1px_black]
                      active:scale-[0.98] active:shadow-[1px_1px_0_0_black,2px_2px_0_1px_black]"
      >
        {/* Gambar */}
        <div className="h-[65%] w-full">
          <Image
            src={product.image}
            alt={product.title}
            width={500}
            height={250}
            className="object-cover"
          />
        </div>

        {/* Konten */}
        <div className="p-4 h-[50%]">
          <h3 className="font-semibold text-sm text-center text-gray-800 truncate">
            {product.title}
          </h3>
          <p className="text-xs text-gray-600 mt-2 text-center line-clamp-2">
            {product.description}
          </p>
          <div className="mt-3 text-center space-y-1">
            <span className="font-bold text-sm block">
              IDR {formatCurrency(product.price_discount)}{" "}
            </span>
            {product.price_discount && (
              <span className="text-sm text-gray-500 line-through block">
                IDR {formatCurrency(product.price)}{" "}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
