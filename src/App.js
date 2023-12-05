import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Header from "./components/Header";
import { createGlobalStyle } from "styled-components";
import { CartContextProvider } from "./components/CartContext";
import CartPage from "./pages/Cart";
import CheckoutPage from "./pages/Checkout";
import ProductsPage from "./pages/Products";
import ProductPage from "./pages/Product";
import Footer from "./components/Footer";
import LoginPage from "./pages/Login";
import RegisterPage from "./pages/Register";
import AccountPage from "./pages/Account";
import Thankyou from "./pages/Thankyou";
import MyOrders from "./pages/MyOrders";
import AnimatedRoute from "./components/AnimatedRoute";
import Axios from "axios";

const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: 'Kish';
    src: local('Kish'), url('./fonts/Kish-BoldUltraWide.ttf') format('truetype');
    font-weight: normal;
    font-style: normal;
  }

  body {
    padding: 0;
    margin: 0;
    font-family: 'Inter', sans-serif; /* Fallback font */
    background-color: #000;
  }
`;

function App() {
  Axios.defaults.withCredentials = true;
  return (
    <BrowserRouter>
      <GlobalStyles />
      <CartContextProvider>
        <Header />
        <Routes>
          <Route path="/" element={<AnimatedRoute element={<Home />} />} />
          <Route
            path="/cart"
            element={<AnimatedRoute element={<CartPage />} />}
          />
          <Route
            path="/checkout"
            element={<AnimatedRoute element={<CheckoutPage />} />}
          />
          <Route
            path="/thankyou"
            element={<AnimatedRoute element={<Thankyou />} />}
          />
          <Route
            path="/shop"
            element={<AnimatedRoute element={<ProductsPage />} />}
          />
          <Route
            path="/product/:productId"
            element={<AnimatedRoute element={<ProductPage />} />}
          />
          <Route
            path="/login"
            element={<AnimatedRoute element={<LoginPage />} />}
          />
          <Route
            path="/logout"
            element={<AnimatedRoute element={<LoginPage />} />}
          />
          <Route
            path="/register"
            element={<AnimatedRoute element={<RegisterPage />} />}
          />
          <Route
            path="/account"
            element={<AnimatedRoute element={<AccountPage />} />}
          />
          <Route
            path="/account/myorders"
            element={<AnimatedRoute element={<MyOrders />} />}
          />
        </Routes>

        <Footer />
      </CartContextProvider>
    </BrowserRouter>
  );
}

export default App;
