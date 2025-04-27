import kenyaLandscape from "../assets/mutton2.png";

function HomeSection() {
    return (
      <section id="home" className="h-screen bg-cover bg-center" 
      style={{ backgroundImage: `url(${kenyaLandscape})` }}>
        <div className="container mx-auto h-full flex items-center justify-center text-center text-white">
          <div>
            <h1 className="text-6xl font-bold mb-4">Welcome to Kenya Fresh Meat Ltd.</h1>
            <p className="text-3xl">Premium Mutton Exports — Fresh from Kenya to the World.</p>
          </div>
        </div>
      </section>
    );
  }
  
  export default HomeSection;