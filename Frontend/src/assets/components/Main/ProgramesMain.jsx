import React, { useState, useMemo } from "react";
import AcademicSidebar from "../Sidebar/Sidebar";
import { PlusIcon, MinusIcon } from 'lucide-react';

function Main() {
    const [expandedSections, setExpandedSections] = useState({});

    // Toggle section for collapsing/expanding
    const toggleSection = (section) => {
        setExpandedSections((prevState) => ({
            ...prevState,
            [section]: !prevState[section],
        }));
    };

    // Memoizing static data for optimization
    const programmes = useMemo(() => [
        {
            id: "btech",
            title: "B.Tech",
            subtitle: "(Information Technology)",
            description: "B.Tech in Information Technology focuses on ...",
            outcomes: {
                programOutcomes: [
                    { id: "PO-1", text: "An ability to apply acquired knowledge of mathematics, science and computer science and engineering to solve the engineering problems." },
                    { id: "PO-2", text: "An ability to identify, formulate and analyze engineering problems." },
                    { id: "PO-3", text: "An ability to design and implement a system, process, component or program to meet desired needs within realistic constraints such as culture, society, environment health and safety." }
                ],
                programSpecificOutcomes: [
                    { id: "PSO-1", text: "Analyze, Design, Develop and apply mathematical basics, Data Structures and Algorithm for modelling computer software to solve real world and interdisciplinary problems" },
                    { id: "PSO-2", text: "Demonstrate contemporary technologies, Data Analysis and computing skill for effective interpretation and decision making in the sustainable development of the society" }
                ],
                programEducationalObjectives: [
                    { id: "PEO-1", text: "To provide knowledge based service as to meet the ever changing needs of industry and society" },
                    { id: "PEO-2", text: "To make the student understand, design, and implement the concept in multiple domains" }
                ]
            }
        },
        {
            id: "mtech",
            title: "M.Tech",
            subtitle: "(Data Analytics)",
            description: "M.Tech in Data Analytics provides advanced knowledge on ...",
            outcomes: {
                programOutcomes: [
                    { id: "PO-1", text: "An ability to apply acquired knowledge of mathematics, science and computer science and engineering to solve the engineering problems." },
                    { id: "PO-2", text: "An ability to identify, formulate and analyze engineering problems." },
                    { id: "PO-3", text: "An ability to design and implement a system, process, component or program to meet desired needs within realistic constraints such as culture, society, environment health and safety." }
                ],
                programSpecificOutcomes: [
                    { id: "PSO-1", text: "Analyze, Design, Develop and apply mathematical basics, Data Structures and Algorithm for modelling computer software to solve real world and interdisciplinary problems" },
                    { id: "PSO-2", text: "Demonstrate contemporary technologies, Data Analysis and computing skill for effective interpretation and decision making in the sustainable development of the society" }
                ],
                programEducationalObjectives: [
                    { id: "PEO-1", text: "To provide knowledge based service as to meet the ever changing needs of industry and society" },
                    { id: "PEO-2", text: "To make the student understand, design, and implement the concept in multiple domains" }
                ]
            }
        }
        ,
        {
            id: "phd",
            title: "Ph.D",
            subtitle: "ph.d",
            description: "Ph.D in Information Technology provides advanced knowledge on ...",
            outcomes: {
                programOutcomes: [
                    { id: "PO-1", text: "An ability to apply acquired knowledge of mathematics, science and computer science and engineering to solve the engineering problems." },
                    { id: "PO-2", text: "An ability to identify, formulate and analyze engineering problems." },
                    { id: "PO-3", text: "An ability to design and implement a system, process, component or program to meet desired needs within realistic constraints such as culture, society, environment health and safety." }
                ],
                programSpecificOutcomes: [
                    { id: "PSO-1", text: "Analyze, Design, Develop and apply mathematical basics, Data Structures and Algorithm for modelling computer software to solve real world and interdisciplinary problems" },
                    { id: "PSO-2", text: "Demonstrate contemporary technologies, Data Analysis and computing skill for effective interpretation and decision making in the sustainable development of the society" }
                ],
                programEducationalObjectives: [
                    { id: "PEO-1", text: "To provide knowledge based service as to meet the ever changing needs of industry and society" },
                    { id: "PEO-2", text: "To make the student understand, design, and implement the concept in multiple domains" }
                ]
            }
        }
    ], []);

    return (


        <>
        <div className="min-h-auto flex lg:mr-10">
      <main className="flex-1 lg:ml-10 p-2 lg:p-4">
        <div className="max-w-6xl mx-auto p-0 pt-4 space-y-8">
          
          {/* Coordinator Section */}
          <div className="relative">
            <div className="mt-20 lg:mt-0 xl:mt-0 inline-flex items-center bg-teal-600 text-white px-5 py-2 rounded-full text-xl font-bold shadow-lg">
            Programmes of Study
            </div>
            <div className="mt-6 bg-white rounded-lg shadow-md p-6 border-l-4 border-teal-600">
            <div className="space-y-4">
                    {programmes.map((program) => {
                        const { id, title, subtitle, description, outcomes } = program;
                        const { programOutcomes, programSpecificOutcomes, programEducationalObjectives } = outcomes;

                        return (
                            <div key={id} className="bg-white shadow-md rounded-lg">
                                <div
                                    className="flex items-center justify-between px-6 py-4 cursor-pointer"
                                    onClick={() => toggleSection(id)}
                                    aria-expanded={expandedSections[id] ? "true" : "false"}
                                    aria-controls={`program-details-${id}`}
                                >
                                    <div>
                                        <h2 className="text-lg font-medium">{title}</h2>
                                        <span className="text-gray-500">{subtitle}</span>
                                    </div>
                                    {expandedSections[id] ? (
                                        <MinusIcon className="w-6 h-6 text-gray-500" />
                                    ) : (
                                        <PlusIcon className="w-6 h-6 text-gray-500" />
                                    )}
                                </div>
                                {expandedSections[id] && (
                                    <div id={`program-details-${id}`} className="px-6 py-4 space-y-4">
                                        <p className="text-gray-600">{description}</p>

                                        {/* Program Outcomes */}
                                        <div>
                                            <h3 className="text-lg font-semibold">Program Outcomes</h3>
                                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                                {programOutcomes.map((po) => (
                                                    <li key={po.id}>
                                                        <strong>{po.id}:</strong> {po.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Program Specific Outcomes */}
                                        <div>
                                            <h3 className="text-lg font-semibold">Program Specific Outcomes</h3>
                                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                                {programSpecificOutcomes.map((pso) => (
                                                    <li key={pso.id}>
                                                        <strong>{pso.id}:</strong> {pso.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>

                                        {/* Program Educational Objectives */}
                                        <div>
                                            <h3 className="text-lg font-semibold">Program Educational Objectives</h3>
                                            <ul className="list-disc pl-6 text-gray-600 space-y-2">
                                                {programEducationalObjectives.map((peo) => (
                                                    <li key={peo.id}>
                                                        <strong>{peo.id}:</strong> {peo.text}
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                )}
                            </div>
                        );
                    })}
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
