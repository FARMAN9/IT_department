import React from "react";
import PDFViewer from "../PDFViewer/PDFViewer";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useEffect, useMemo } from "react";
import { fetchDepartmentActivitesCalenderData } from "../../Features/DepartmentActivitesCalendarslice";
import Loading from "../UtilityCompoments/Loading";
import Errors from "../UtilityCompoments/Errors";
import MainCard from "../Activites/MainCard";

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

  if (loading) {
    return (
      <MainCard title="Department Activites Calendar">
        <Loading />
      </MainCard>
    );
  }

  if (error) {
    return (
      <MainCard title="Department Activites Calendar">
        <Errors error={error.error || "Something went wrong" || error} />
      </MainCard>
    );
  }

  return (
    <>
      <MainCard title="Department Activites Calendar">
        <PDFViewer url={pdf} />
      </MainCard>
    </>
  );
}

export default React.memo(DepartmentActivitesCalender);
