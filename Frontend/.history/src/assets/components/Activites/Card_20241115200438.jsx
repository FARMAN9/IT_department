const Card = (props) => {
  const news = [
    {
      id: 1,
      text: "Excellent research paper published in Computer Science Review (IF=10.7, Q1)",
      isNew: true,
    },
    {
      id: 2,
      text: "Dr. Simranjit Singh has published the article in Archives of Computational Methods in Engineering (IF=9.7, Q1)",
      isNew: true,
    },
    {
      id: 3,
      text: "Dr. Kusum K. Bharti has published the article in Knowledge-Based Systems (IF=7.2, Q1)",
      isNew: true,
    },
    {
      id: 4,
      text: "Dr. Neeraj Kumar article has been published in computer network journal (IF = 7.1, Q1)",
      isNew: true,
    },
    {
      id: 5,
      text: "Dr. Naveen Kumar article has been published in computer network journal (IF = 5.493, Q1)",
      isNew: false,
    },
    {},
    {},
    {},
    {},
    {},
    {},
  ];

  return (
    <div className="max-w-full rounded-lg border border-gray-200 bg-white shadow-sm">
      <div className="p-6">
        <div className="mb-6">
          <div className="inline-block from bg-lime-700 to bg-slate-700 text-white px-6 py-2 rounded-2xl text-lg font-semibold">
            {props.title}
          </div>
        </div>
        {/* Added max-height and overflow-y-auto for scrolling */}
        <div className="max-h-[400px] overflow-y-auto pr-4">
          {/* Added custom scrollbar styling */}
          <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
            <ul className="space-y-4">
              {news.map((item) => (
                <li
                  key={item.id}
                  className="flex items-start space-x-3 border-b border-gray-200 pb-4 last:border-b-0">
                  <div className="min-w-4 mt-2">
                    <div className="w-2 h-2 bg-cyan-700 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 flex-1">
                    {item.text}
                    {item.isNew && (
                      <span className="inline-block ml-2">
                        <span className="text-red-500 animate-pulse border rounder">
                          NEW
                        </span>
                      </span>
                    )}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
