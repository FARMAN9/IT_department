import React from "react";

function Mission_and_Vision() {
  return (
    <div className="w-full px-4 py-8 rounded-lg shadow-lg ">
      <section className="py-2 bg-gradient-to-b from-blue-50 to-white">
        <div className="max-w-full mx-auto px-4 sm:px-2 lg:px-2">
          <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
            {/* Video Container */}
            <div className="p-6">
              <div className="relative aspect-video rounded-xl overflow-hidden shadow-lg">
                <iframe
                  className="absolute inset-0 w-full h-full"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="NIT Jalandhar Campus Tour"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen></iframe>
              </div>
            </div>

            {/* Additional Info Section */}

           
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
        <div className="bg-white p-6 rounded-lg shadow-lg max-w-full mx-auto mt-2">
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
