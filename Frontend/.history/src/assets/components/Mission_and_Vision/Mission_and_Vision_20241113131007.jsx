import React from "react";

function Mission_and_Vision() {
  return (
    <div className="w-full px-4 py-8 rounded-lg shadow-lg ">
      {/* YouTube Video Section (Card) */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-full mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Watch Our Story
          </h2>
          <div className="flex justify-center w-full">
            <iframe
              className="w-full rounded sm:w-1/2 h-64 sm:h-96"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ" // Replace with your YouTube video link
              title="Mission and Vision Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen></iframe>
          </div>
        </div>
      </section>
      {/* Vision Section (Card) */}
      <section>
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-full mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Our Vision</h2>
          <p className="text-lg text-center text-gray-700">
            Our vision is to become a global leader in the industry, known for
            excellence in our offerings and outstanding customer service. We
            aspire to create a positive impact on the world through sustainable
            practices and innovative technologies.
          </p>
        </div>
      </section>

      {/* Mission Section (Card) */}
      <section className="mb-12">
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-full mx-2">
          <h2 className="text-3xl font-bold text-center mb-4">Our Mission</h2>
          <p className="text-lg text-center text-gray-700">
            Our mission is to provide innovative solutions to help businesses
            achieve their full potential. We are committed to delivering
            high-quality products and services that meet the needs of our
            clients, empowering them to succeed in a fast-paced, ever-changing
            world.
          </p>
        </div>
      </section>
    </div>
  );
}

export default Mission_and_Vision;
