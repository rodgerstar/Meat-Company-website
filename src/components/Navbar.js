import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav className="bg-[#A83333] text-white p-4 sticky">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Kenya Fresh Meat Ltd.</h1>
        <div className="space-x-4">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#services" className="hover:underline">Services</a>
          <a href="#products" className="hover:underline">Products</a>
          <a href="#contact" className="hover:underline">Contact</a>
          <Link to="/admin" className="hover:underline">Admin</Link>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;