import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const  = () => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center">
          <div className="rounded-full w-20 h-20 bg-gray-300 mr-4"></div>
          <CardTitle>Department of Information Technology</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div>
          <p>
            Established in 2013 with 30 students, now offers 120 B.Tech. seats.
          </p>
          <p>Introduced M.Tech. in Data Analytics in 2023 with 30 seats.</p>
          <p>Distinguished faculty, diverse learning experiences.</p>
          <p>Preferred choice for prospective students at NIT Jalandhar.</p>
          <p>Welcomes young talent who inspire the department.</p>
          <p>Head of Department: Dr. Vijay Kumar</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default DepartmentInfo;
