const express = require("express");
const admin = require("firebase-admin");
const { initializeApp, cert } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const cors = require("cors");
const cloudinary = require("cloudinary").v2;
const dotenv = require("dotenv");
const multer = require("multer");
const streamifier = require("streamifier");
const fs = require("fs");
const nodemailer = require("nodemailer");

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({
  storage,
  limits: { fileSize: 10 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed"), false);
    }
    cb(null, true);
  },
});

// Firebase Firestore
try {
  const serviceAccount = JSON.parse(fs.readFileSync(process.env.FIREBASE_SERVICE_ACCOUNT));
  initializeApp({
    credential: cert(serviceAccount),
  });
  console.log("Firebase initialized successfully");
} catch (error) {
  console.error("Firebase initialization error:", error);
  process.exit(1);
}
const db = getFirestore();

// Cloudinary Configuration
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Nodemailer
console.log("Email user:", process.env.EMAIL_USER);
console.log("Email pass:", process.env.EMAIL_PASS);
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// API Routes
app.get("/api/products", async (req, res) => {
  try {
    const snapshot = await db.collection("products").get();
    const products = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ error: "Failed to fetch products" });
  }
});

app.post("/api/products", upload.single("image"), async (req, res) => {
  try {
    const { name, description, price } = req.body;
    if (!name || !description || !price || !req.file) {
      return res.status(400).json({ error: "All fields are required, including an image" });
    }

    const parsedPrice = parseFloat(price);
    if (isNaN(parsedPrice) || parsedPrice <= 0) {
      return res.status(400).json({ error: "Price must be a positive number" });
    }

    const uploadPromise = new Promise((resolve, reject) => {
      const uploadStream = cloudinary.uploader.upload_stream(
        { folder: "exports" },
        (error, result) => {
          if (error) {
            return reject(new Error("Cloudinary upload failed: " + error.message));
          }
          resolve(result);
        }
      );
      streamifier.createReadStream(req.file.buffer).pipe(uploadStream);
    });

    const uploadResult = await uploadPromise;

    const product = { name, description, price: parsedPrice, imageUrl: uploadResult.secure_url };
    const docRef = await db.collection("products").add(product);

    res.status(201).json({ id: docRef.id, ...product });
  } catch (error) {
    console.error("Error adding product:", error);
    res.status(400).json({ error: error.message || "Failed to add product" });
  }
});

app.delete("/api/products/:id", async (req, res) => {
  try {
    const productId = req.params.id;

    // Fetch the product to get the image URL
    const productDoc = await db.collection("products").doc(productId).get();
    if (!productDoc.exists) {
      return res.status(404).json({ error: "Product not found" });
    }

    const product = productDoc.data();
    const imageUrl = product.imageUrl;

    // Delete the image from Cloudinary
    if (imageUrl) {
      const publicId = imageUrl.split("/").slice(-1)[0].split(".")[0]; // Extract public ID from URL
      await cloudinary.uploader.destroy(`exports/${publicId}`);
    }

    // Delete the product from Firestore
    await db.collection("products").doc(productId).delete();

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Failed to delete product" });
  }
});

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    // Save to Firestore
    await db.collection("contacts").add({
      name,
      email,
      message,
      timestamp: admin.firestore.FieldValue.serverTimestamp(),
    });

    // Send email
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${name}`,
      text: `
        Name: ${name}
        Email: ${email}
        Message: ${message}
      `,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
    res.status(200).json({ message: "Message sent successfully" });
  } catch (error) {
    console.error("Error handling contact submission:", error);
    res.status(500).json({ error: "Error sending message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));