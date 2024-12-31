import React from "react";
import { Card, CardHeader, CardContent } from "@/components/ui/card";

const Activities = () => {
  const activities = [
    {
      id: 1,
      title: "CR & PR of 2020-2024 Batch",
    },
    {
      id: 2,
      title: "CR of 2021-2025 Batch",
    },
    {
      id: 3,
      title:
        "Online Short Term Course on Visual Intelligence and Computational Imaging 09-13 December 2024",
    },
  ];

  return (
    <Card className="max-w-2xl">
      <CardHeader>
        <div className="inline-block bg-cyan-700 text-white px-6 py-2 rounded-md text-lg font-semibold">
          Activities
        </div>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {activities.map((activity) => (
            <li
              key={activity.id}
              className="flex items-start space-x-2 border-b pb-4 last:border-b-0">
              <div className="min-w-4 mt-2">
                <div className="w-2 h-2 bg-cyan-700 rounded-full"></div>
              </div>
              <span className="text-gray-700">{activity.title}</span>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
};

export default Activities;
