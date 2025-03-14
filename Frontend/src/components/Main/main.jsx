import React, { useEffect,useMemo} from "react";
import { useDispatch, useSelector } from "react-redux";

import ImageSlide from "../ImageSlide/ImageSlide";
import DepartmentOfItInfo from "../Department_of_It/Department_of_it_info";
import Mission_and_Vision from "../Mission_and_Vision/Mission_and_Vision";
import HodCard from "../Hod/HodCard";
import Card from "../Activites/Card";
import PlacementSlider from "../Placements/placementSlider";
import Wellcome from "../Wellcome/Wellcome";
import { fetchActivitiesAndStudentNotificationsData } from "../../Features/ActivitiesAndStudentNotificationsSlice";

const Main = () => {
  document.title = "Welcome to Department of IT nit Srinagar ";

  const activitiesTitle = "Activities & Students Notifications";
  const newsTitle = "News & Highlights"; 
  const dispatch = useDispatch();
  const {ActivitiesAndStudentNotifications, loading, error } = useSelector(
    (state) => state.ActivitiesAndStudentNotificationsData
  ); 
  useEffect(() => {
    dispatch(fetchActivitiesAndStudentNotificationsData());
  }, [dispatch]);


  console.log(ActivitiesAndStudentNotifications);


  const activitiesAndStudentNotifications = useMemo(() => {
    return ActivitiesAndStudentNotifications;
  }, [ActivitiesAndStudentNotifications]);






  








  return (
    <>
      <div className="min-h-auto flex lg:mr-0">
        <main className="flex-1 lg:ml-0 p-2 lg:p-3">
          <div className="">
            {/* Coordinator Section */}
            <div className="relative">
              <div className="rounded-lg  ">
                <div className="">
                  <div className="h-full w-full mb-8">
                    <ImageSlide />
                  
                    <div className="top-0  left-0 w-full h-full">
                  <Wellcome />
                  </div>
                  </div>
                 
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                    <DepartmentOfItInfo />

                    <Mission_and_Vision />
                  </div>
                  <div className=" m-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-2 gap-4">
                 
                    <Card title={activitiesTitle} items={ActivitiesAndStudentNotifications} />

                    <Card title={newsTitle} items={ActivitiesAndStudentNotifications} />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
                    <HodCard />
                    <PlacementSlider />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
};

export default Main;
