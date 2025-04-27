function ContactSection() {
    return (
      <section id="contact" className="py-16 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">Contact Us</h2>
          <p className="text-lg mb-4">Reach out to us for inquiries or orders!</p>
          <form className="max-w-lg mx-auto">
            <input type="text" placeholder="Name" className="w-full p-2 mb-4 border rounded" />
            <input type="email" placeholder="Email" className="w-full p-2 mb-4 border rounded" />
            <textarea placeholder="Message" className="w-full p-2 mb-4 border rounded" rows="4"></textarea>
            <button type="submit" className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700">
              Send Message
            </button>
          </form>
        </div>
      </section>
    );
  }
  
  export default ContactSection;