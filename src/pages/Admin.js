import { Routes, Route } from "react-router-dom";
import AdminAddProduct from "../components/AdminAddProduct";
import ViewProducts from "./ViewProducts"; // We’ll create this

function Admin() {
  return (
    <div className="min-h-screen bg-[#FDF7F7] py-16">
      <Routes>
        <Route path="/" element={<AdminAddProduct />} />
        <Route path="/view-products" element={<ViewProducts />} />
      </Routes>
    </div>
  );
}

export default Admin;