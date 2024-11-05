import React from "react";
import {
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10">
      <div className="container mt-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-10">
        {/* Logo and Contact Information */}
        <div>
          <img
            src="https://nitsri.ac.in/images/nit-logo.png"
            alt="NITJ Logo"
            className="w-16 mb-4"
          />
          <h2 className="text-lg font-semibold">
            National Institute of Technology, Srinagar
          </h2>
          <p className="mt-4">
            <MapPin className="inline w-5 h-5 mr-2" />
            NIT Srinagar,jammu and Kashmir, India
          </p>
          <p>
            <Mail className="inline w-5 h-5 mr-2" />
            webmaster@nitj.ac.in
          </p>
          <p>
            <Phone className="inline w-5 h-5 mr-2" />
            +91-0181-5037855, 2690301, 2690453, 3082000
          </p>

          {/* Social Media Links */}
          <div className="flex mt-4 space-x-4 ">
            <a href="#" aria-label="Facebook" className="hover:text-white">
              <Facebook />
            </a>
            <a href="#" aria-label="Twitter" className="hover:text-white">
              <Twitter />
            </a>
            <a href="#" aria-label="LinkedIn" className="hover:text-white">
              <Linkedin />
            </a>
            <a href="#" aria-label="Instagram" className="hover:text-white">
              <Instagram />
            </a>
            <a href="#" aria-label="YouTube" className="hover:text-white">
              <Youtube />
            </a>
          </div>
        </div>

        {/* Quick Links Section */}
        <div className="md:col-span-2 grid grid-cols-2 gap-4 hidden lg:grid md:grid ">
          <div>
            <h3 className="font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Admission
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Annual Reports
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Academic Calendar
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  UMC Rules
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Academic Section Officials
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Deans
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Rankings
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  List of Holidays
                </a>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
          <div>
            <ul className="space-y-1 mt-8 md:mt-0">
              <li>
                <a href="#" className="hover:underline">
                  National Council for Technical Education
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Council of NITs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  UGC
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  NIRF
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  SERB
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Virtual labs
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  GOI Web Directory
                </a>
              </li>
              {/* Add more links as needed */}
            </ul>
          </div>
        </div>
      </div>

      {/* Footer Bottom Section */}
      <div className="mt-8 border-t border-gray-700 pt-4">
        <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center text-sm">
          <p>&copy; Copyright 2024, All Rights Reserved NIT Srinagar</p>
          <p>
            Developed in-house by Website Development and Management Committee
            (WDMC)
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
