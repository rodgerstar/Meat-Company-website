import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false); // Default to false
  const location = useLocation();

  // Clear localStorage on initial load to ensure admin is hidden by default
  useEffect(() => {
    localStorage.setItem("isAdmin", "false");
  }, []); // Runs only once on mount

  // Toggle admin visibility with Ctrl+Shift+A
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.ctrlKey && e.shiftKey && e.key === "A") {
        const newAdminState = !isAdmin;
        setIsAdmin(newAdminState);
        localStorage.setItem("isAdmin", newAdminState.toString());
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isAdmin]);

  // Check if we're on the /admin route to show a different navbar
  const isAdminRoute = location.pathname.startsWith("/admin");

  if (isAdminRoute) {
    return (
      <nav className="bg-[#A83333] text-white p-4 sticky">
        <div className="container mx-auto flex justify-between">
          <Link to="/" className="text-2xl font-bold">
            Kenya Fresh Meat Ltd.
          </Link>
          <div className="space-x-4">
            <Link to="/admin" className="hover:underline">
              Add Products
            </Link>
            <Link to="/admin/view-products" className="hover:underline">
              View Products
            </Link>
          </div>
        </div>
      </nav>
    );
  }

  return (
    <nav className="bg-[#A83333] text-white p-4 sticky">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Kenya Fresh Meat Ltd.</h1>
        <div className="space-x-4">
          <a href="#home" className="hover:underline">
            Home
          </a>
          <a href="#about" className="hover:underline">
            About
          </a>
          <a href="#services" className="hover:underline">
            Services
          </a>
          <a href="#products" className="hover:underline">
            Products
          </a>
          <a href="#contact" className="hover:underline">
            Contact
          </a>
          {isAdmin && (
            <Link to="/admin" className="hover:underline">
              Admin
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;