import { CartProvider } from "../context/CartContext";
import "../styles/globals.css";
import "../styles/success.css";

export default function MyApp({ Component, pageProps }) {
  return (
    <CartProvider className="app-container">
      <Component {...pageProps} />
    </CartProvider>
  );
}
