import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

const HodCard = () => {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center mb-4">
        <div className="rounded-full w-16 h-16 bg-gray-300 mr-4"></div>
        <h2 className="text-xl font-bold">
          Department of Information Technology
        </h2>
      </div>
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
    </div>
  );
};

export default HodCard;