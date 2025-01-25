import React from "react";
import PDFViewer from "../PDFViewer/PDFViewer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchDepartmentActivitesCalenderData } from "../../../Features/DepartmentActivitesCalendarslice";

function DepartmentActivitesCalender() {
  document.title = "Department Activites Calendar";

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchDepartmentActivitesCalenderData());
  }, [dispatch]);

  const { DepartmentActivitesCalender, loading, error } = useSelector(
    (state) => state.DepartmentActivitesCalenderData
  );

  console.log("DepartmentActivitesCalender", DepartmentActivitesCalender);
  const pdf = useMemo(
    () => DepartmentActivitesCalender.ActivitesCalender,
    [DepartmentActivitesCalender.ActivitesCalender || ""]
  );

  return (
    <>
      <div className="min-h-auto flex lg:mr-10">
        <main className="flex-1 lg:ml-10 p-2 lg:p-4">
          <div className=" mx-auto pt-4 space-y-8  bg-white">
            {/* Coordinator Section */}
            <div className="relative">
              <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
                Department Activites Calendar
              </div>
              <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
                <div className="flex flex-wrap -mx-4">
                  <PDFViewer url={pdf} className="w-full  h-100" />
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </>
  );
}

export default React.memo(DepartmentActivitesCalender);
