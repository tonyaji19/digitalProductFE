import { useRouter } from "next/router";
import Head from "next/head";

export default function Success() {
  const router = useRouter();
  const { order_id } = router.query;

  return (
    <>
      <Head>
        <title>Order Successful! | Digital Planners</title>
        <meta
          name="description"
          content="Your order has been successfully placed."
        />
      </Head>
      <div className="min-h-screen bg-[#FAF9F6] flex items-center justify-center p-4">
        <div className="bg-white rounded-3xl shadow-2xl p-8 max-w-4xl w-full text-center animate-fade-in-up">
          <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-6 animate-scale-in">
            <svg
              className="w-16 h-16 text-emerald-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Order Successful!
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Thank you for your purchase. Your digital planner is on its way!
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center gap-6 mb-12">
            <div className="bg-emerald-50 rounded-xl p-6 flex items-center justify-center w-full md:w-64 hover:scale-105 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-emerald-500 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                ></path>
              </svg>
              <div className="text-left">
                <p className="text-sm text-gray-500">Order number</p>
                <p className="text-lg font-semibold text-gray-800">
                  {order_id || "Loading..."}
                </p>
              </div>
            </div>
            <div className="bg-emerald-50 rounded-xl p-6 flex items-center justify-center w-full md:w-64 hover:scale-105 transition-transform duration-300">
              <svg
                className="w-8 h-8 text-emerald-500 mr-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
              <div className="text-left">
                <p className="text-sm text-gray-500">Status</p>
                <p className="text-lg font-semibold text-gray-800">Completed</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button
              onClick={() => router.push("/")}
              className="bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out flex items-center justify-center hover:scale-105 active:scale-95"
            >
              <svg
                className="w-5 h-5 mr-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                ></path>
              </svg>
              Back to Home
            </button>
            <button
              onClick={() => router.push("/")}
              className="bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out hover:scale-105 active:scale-95"
            >
              View Order Details
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
