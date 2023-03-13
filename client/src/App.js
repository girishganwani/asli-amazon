import React from "react";
import { Routes, Route } from "react-router-dom";
import Categories from "./components/Admin/categories";
import Pannel from "./components/Admin/pannel";
import Products from "./components/Admin/products";
import Users from "./components/Admin/users";
import SignIn from "./components/Auth/Auth";
import SignUp from "./components/Auth/SignUp";
import UserPannel from "./components/Users/userPannel";
import CategoryWiseProducts from "./components/Users/categories/categoryWiseProduct";
const App = () => {
  return (
    <Routes>
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      <Route path="/admin" element={<Pannel />}>
        <Route path="/admin/categories" element={<Categories />} />
        <Route path="/admin/products" element={<Products />} />
        <Route path="/admin/users" element={<Users />} />
      </Route>

      <Route path="/" element={<UserPannel />}>
        <Route path="/category/:slug" element={<CategoryWiseProducts />} />
      </Route>
    </Routes>
  );
};

export default App;
