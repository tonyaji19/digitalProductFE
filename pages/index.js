import { useEffect, useState } from "react";
import axios from "axios";
import Head from "next/head";
import Image from "next/image";
import Header from "../components/Header";
import ProductCard from "../components/ProductCard";
import { SiInstagram, SiTiktok } from "react-icons/si";

const apiBackend = process.env.NEXT_PUBLIC_GENERAL_API;

export default function Home() {
  const [productData, setProductData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`${apiBackend}/products`)
      .then((response) => {
        setProductData(response.data);
        setIsLoading(false);
      })
      .catch((err) => {
        setError("Error loading products");
        setIsLoading(false);
      });
  }, []);

  if (isLoading) {
    return (
      <div className="flex justify-center w-auto items-center min-h-screen">
        Loading...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        {error}
      </div>
    );
  }

  return (
    <div className="bg-[#FAF9F6] min-h-full max-w-mobile mx-auto overflow-y-auto">
      <Head>
        <title>Digital Planners</title>
      </Head>
      <Header />
      <main className="pt-8 pb-8 px-8">
        <div className="py-8 text-center">
          <div className="mb-4">
            <Image
              src="/nevertoolate.png"
              alt="Logo"
              width={350}
              height={350}
              className="mx-auto"
            />
            <p className="text-sm mt-[-8px] pb-2 font-montserrat font-semibold">
              @nevertoo_latte
            </p>
          </div>
          <div className="flex justify-center gap-4 mb-8">
            <a href="#" className="hover:scale-110 transform transition">
              <SiTiktok className="w-6 h-6" />
            </a>
            <a href="#" className="hover:scale-110 transform transition">
              <SiInstagram className="w-6 h-6" />
            </a>
          </div>
          <h1 className="text-3xl font-bold mb-4 font-rubikVinyl">
            "please, it's never too late <br /> if your plan with us"
          </h1>
        </div>
        <div className="grid grid-cols-2 gap-5">
          {productData.length > 0 ? (
            productData.map((product) => (
              <ProductCard key={product.ID} product={product} />
            ))
          ) : (
            <div>Data not available</div>
          )}
        </div>
      </main>
    </div>
  );
}
