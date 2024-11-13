import React from "react";

function Mission_and_Vision() {
  return (
    <div className="w-full px-4 py-8 rounded-lg shadow-lg ">
      <section className="py-16 bg-gradient-to-b from-blue-50 to-white">
       
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
            <div className="p-6 bg-gray-50">
              <div className="flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-8">
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">HD Quality</span>
                </div>
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">5 Minutes</span>
                </div>
                <div className="flex items-center">
                  <div className="p-3 bg-blue-100 rounded-full">
                    <svg
                      className="w-6 h-6 text-blue-600"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  </div>
                  <span className="ml-3 text-gray-700">360° View</span>
                </div>
              </div>
            </div>
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
