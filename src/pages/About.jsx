import heroImage2 from '/image/2222.png'

const Home = () => {
  return (
    <section className="min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4 flex flex-col-reverse md:flex-row items-center gap-10">
        
        {/* Text */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-cyan-800">
            About Us
          </h1>
          <br />
          <p className="text-gray-600 mb-6 text-sm">
          Ruang Aman Bersama merupakan sebuah platform digital yang 
          didedikasikan untuk mendukung kesehatan mental masyarakat Indonesia. 
          Kami hadir sebagai solusi modern di tengah tingginya kebutuhan masyarakat akan akses informasi, 
          layanan konsultasi, dan ruang komunitas yang aman, nyaman, serta bebas stigma.
          <br />
          <br />
          Dengan dukungan tenaga ahli, relawan komunitas, serta teknologi yang terus kami kembangkan, 
          Ruang Aman Bersama berkomitmen untuk menjadi tempat yang ramah, suportif, dan solutif bagi 
          setiap penggunanya. Kami percaya, kesehatan mental adalah hak setiap manusia, dan bersama-sama, 
          kita bisa menciptakan lingkungan yang lebih peduli, lebih sehat, dan lebih kuat.
          <br />
          <br />
          Bergabunglah bersama kami di Ruang Aman Bersama dan jadilah bagian dari komunitas yang saling menguatkan.
          </p>
        </div>

        {/* Image  */}
        <div className="flex-1">
          <img
            src={heroImage2}
            alt="Hero Illustration"
            className="w-sm md:w-full rounded-md"
          />
        </div>
      </div>
    </section>
  )
}

export default Home
