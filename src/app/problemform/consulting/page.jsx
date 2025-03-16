"use client";

import { getAiActions, getClassification, getTimeEstimate } from "@/app/ai/aiActions";
import { useUserContext } from "@/app/context/UserContext";
import { postProblem } from "@/app/db/dbActions";
import { useState } from "react";


import ReactMarkdown from "react-markdown";


export default function ProblemForm() {
  const { currentUser } = useUserContext();

  const [description, setDescription] = useState("");
  const [estimateTime, setEstimateTime] = useState("");
  const [classification, setClassification] = useState("");
  const [solution, setSolution] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSolution(null);

    try {
      const response = await getAiActions(description," as a general Consulting");
      setSolution(response);
      const EstimateTime = await getTimeEstimate(response);
      setEstimateTime(EstimateTime);
      const Classification = await getClassification(response);
      setClassification(Classification);
      console.log(response);
    } catch (error) {
      setSolution("An error occurred while processing the request.");
    } finally {
      setLoading(false);
    }
  };

  const classificationMap = (data) => {
    const lowerCaseData = data.toLowerCase(); // Convert to lowercase
    if (lowerCaseData.includes("software")) {
        return "Software";
    } else if (lowerCaseData.includes("network")) {
        return "Network";
    } else if (lowerCaseData.includes("hardware")) {
        return "Hardware";
    } else {
        return "Others";
    }
};
  
  const problemSubmitHandler = async (e) => {
    e.preventDefault();
    await postProblem(
      description,
      solution,
      estimateTime,
      classificationMap(classification),
      currentUser.email
    );

    await axios
    .post("https://getform.io/f/ajjmymda", {
        message: "you have a new problem in General Consulting",
    },
    { headers: {'Accept': 'application/json'}})

    window.location.href = "/our-services";

    //console.log(problem, solution, estimateTime, classification);
  };

  return (
    <div className="h-[calc(100vh-60px)]">
        <h2 className="text-3xl font-bold my-6 text-white text-center">General Consulting</h2>
      {currentUser ? (
        <div className="p-12 mt-12 border-2 border-gray-600 rounded-lg shadow-lg w-1/2 mx-auto  bg-white">
          <h2 className="text-xl font-bold mb-4">Describe your problem</h2>

          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full p-2 border rounded"
              rows="4"
              placeholder="Write your problem here..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            />
            <button
              type="submit"
              className="mt-2 px-4 py-2 bg-blue-500 font-medium text-white rounded"
              disabled={loading}
            >
              {loading ? "Analyzing..." : "Problem analysis"}
            </button>
          </form>
          {solution && (
            <div>
              <div className="mt-4 p-2 bg-gray-100 border rounded">
                <strong>Proposed solution</strong>

                <div className="text-gray-700 mb-4">
                  {solution.split("\n").map((line, index) => (
                    <span className="block mb-2" key={index}>
                      <ReactMarkdown >{line}</ReactMarkdown>
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4 p-2 bg-gray-100 border rounded">
                <strong>Time Estimate</strong>
                <p className="text-gray-700 mb-4">{estimateTime}</p>
              </div>

              <div className="mt-4 p-2 bg-gray-100 border rounded">
                <strong>Problem Classification</strong>
                <p className="text-gray-700 mb-4">{classification}</p>
              </div>

              <button
                type="submit"
                className="mt-4 px-4 py-2 bg-blue-500 font-medium w-full text-white rounded"
                onClick={problemSubmitHandler}
              >
                Submit the Problem
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="p-4 w-1/2 mx-auto mt-20 h-[700px] flex flex-col items-center justify-center">
          <h1> you are not logged in</h1>
        </div>
      )}
    </div>
  );
}
