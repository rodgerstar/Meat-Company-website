import { useState } from "react";
import axios from "axios";
import imageCompression from "browser-image-compression";

function AdminAddProduct() {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!image) {
      setError("Please select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("price", parseFloat(price));
    formData.append("image", image);

    try {
      await axios.post("http://localhost:5000/api/products", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Product added successfully!");
      setName("");
      setDescription("");
      setPrice("");
      setImage(null);
    } catch (error) {
      console.error(error);
      setError(
        error.response?.data?.error ||
          (error.response?.status === 400
            ? "Invalid data provided. Please check all fields."
            : "Error adding product.")
      );
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file size (max 2MB)
    if (file.size > 2 * 1024 * 1024) {
      setError("File size exceeds 2MB. Please choose a smaller image.");
      return;
    }

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please upload an image file (JPG, PNG).");
      return;
    }

    // Compress image
    try {
      const options = {
        maxSizeMB: 1, // Compress to max 1MB
        maxWidthOrHeight: 800, // Resize to max 800px
        useWebWorker: true,
      };
      const compressedFile = await imageCompression(file, options);
      setImage(compressedFile);
      setError("");
    } catch (error) {
      console.error("Image compression failed:", error);
      setError("Failed to process image. Please try another.");
    }
  };

  return (
    <div className="container mx-auto min-h-screen flex items-center bg-zinc-200">
      <div className="max-w-lg mx-auto bg-white p-8 rounded-xl shadow-lg">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-900 drop-shadow-lg">
          Add Product
        </h2>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Product Name
            </label>
            <input
              type="text"
              placeholder="Product Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Description
            </label>
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Price
            </label>
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              step="0.01"
              className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-[#8B0000]"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-semibold mb-2">
              Image
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          {image && (
            <div className="mb-4">
              <img
                src={URL.createObjectURL(image)}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            </div>
          )}
          <button
            type="submit"
            className="w-full bg-[#8B0000] text-white px-6 py-2 rounded hover:bg-[#6B0000] transition-colors"
          >
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
}

export default AdminAddProduct;