
import AcademicSidebar from "../Sidebar/Sidebar";
import Header from "../Header/Header";
import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import { Lightbulb } from 'lucide-react';



import { FileText, Award, Quote, Users, MapPin, Trophy } from 'lucide-react';



function Main() {

  return (
    <>
      <div className="min-h-screen flex lg:mr-10">
        
        <main className="flex-1 lg:ml-10 p-2 lg:p-6">
          <div className="max-w-6xl mx-auto p-6">
            {/* Header */}
            <div className="mb-10">
              <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-6 py-2 rounded-full text-xl font-bold shadow-lg">
                Contact Us
              </div>
            </div>
            {/* Content */}
            <div className=" flex justify-center items-center p-4 ">
              <div className="bg-white shadow-md rounded-lg p-8 w-full ">
                <div className="mb-4">
                  <h2 className="text-lg font-bold">Address</h2>
                  <p>
                    Department of Information Technology, Dr B R Ambedkar<br />
                    National Institute of Technology<br />
                    G.T. Road, Amritsar Bypass,<br />
                    Jalandhar (Punjab), India - 144027
                  </p>
                </div>
                <div className="flex-col lg:flex  xl:flex 2xl:flex justify-between items-center ">
                  <div>
                    <p className="font-semibold">Office Email</p>
                    <a
                      href="mailto:oit@nitj.ac.in"
                      className="text-blue-500 underline hover:text-blue-700"
                    >
                      oit@nitj.ac.in
                    </a>
                  </div>
                  <div>
                    <p className="font-semibold">Phone</p>
                    <p>01815037469, 1601</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default Main;