"use client";
import { useEffect, useState } from "react";
import DashboardLayout from "../DashboardLayout";
import {
  getUserRole,
  getUserSections,
  updateProblemStatus,
} from "@/app/db/dbActions";
import ReactMarkdown from "react-markdown";
import { useUserContext } from "@/app/context/UserContext";

const Problems = () => {
  const [problems, setProblems] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedProblem, setSelectedProblem] = useState(null);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [selectedClassification, setClassification] = useState("");

  const { currentUser, allProblems } = useUserContext();

  const handleEdit = (problem) => {
    setSelectedProblem(problem);
    setShowModal(true);
    setSelectedStatus(problem.Status);
    setClassification(problem.classification);
  };

  const handleStatusChange = async () => {
    await updateProblemStatus(
      selectedProblem.id,
      selectedStatus,
      selectedClassification
    );
    setShowModal(false);
    window.location.reload(); // Refresh the page
  };
  useEffect(() => {
    const fetchProblems = async () => {
      const role = await getUserRole(currentUser.email);

      console.log(role);
      if (role === "staff") {
        const userSection = await getUserSections(currentUser.email);
        const sectionProblem = allProblems.filter((problem) => {
          return problem.classification === userSection;
        });
        setProblems(sectionProblem);
        //const problems = await getProblemsForClassification(userSection);
        //setProblems(problems);
      } else if (role === "admin") {
        //const problems = await getAllProblems();
        setProblems(allProblems);
      }
    };
    fetchProblems();
  }, [currentUser]);

  return (
    <DashboardLayout>
      <div>
        <h1 className="text-3xl my-6 text-center text-white">Problems</h1>
        <p className="text-center text-xl text-gray-200">
          Here is a list of all the problems.
        </p>

        <div className="relative  shadow-md sm:rounded-lg w-5/6 mx-auto mt-12">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Problem
                </th>
                <th scope="col" className="px-6 py-3">
                  Suggested Solution
                </th>
                <th scope="col" className="px-6 py-3">
                  Problem Owner
                </th>
                <th scope="col" className="px-6 py-3">
                  Classification
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>

                <th scope="col" className="px-6 py-3">
                  Detials
                </th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => (
                <tr
                  key={problem.id}
                  className="bg-white border-b  hover:text-black border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-300"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {problem.problem}
                  </th>
                  <td className="px-6 py-4">
                    {problem.solution.slice(0, 50)}...
                  </td>
                  <td className="px-6 py-4">{problem.user.name}</td>
                  <td className="px-6 py-4">{problem.classification}</td>
                  <td className="px-6 py-4">{problem.Status}</td>

                  <td className="px-6 py-4">
                    <p
                      className="font-medium cursor-pointer text-green-600  hover:underline"
                      onClick={() => handleEdit(problem)}
                    >
                      Show
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {showModal && (
            <div className="p-4 w-2xl  rounded border-2 border-gray-600 shadow-md bg-white absolute top-80 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-h-[80vh] overflow-y-scroll">
              <h3 className="text-2xl text-gray-600 text-center mb-4">
                Problem Details
              </h3>

              <div className=" mx-auto mt-8">
                <div className="mt-4 p-2 bg-gray-100 border rounded">
                  <p className="text-lg font-medium text-gray-500">
                    Problem Description: <br />
                    <span className="text-gray-700">
                      {" "}
                      {selectedProblem?.problem}{" "}
                    </span>
                  </p>
                </div>
                <div className="mt-4 p-2 bg-gray-100 border rounded">
                  <p className="text-lg font-medium text-gray-500">
                    From user: <br />
                    <span className="text-gray-700">
                      {" "}
                      {selectedProblem?.user.name}{" "}
                    </span>
                  </p>
                </div>
                <div className="mt-4 p-2 bg-gray-100 border rounded">
                  <p className="text-lg font-medium text-gray-500">
                    User Email: <br />
                    <span className="text-gray-700">
                      {" "}
                      {selectedProblem?.user.email}{" "}
                    </span>
                  </p>
                </div>

                <div className="mt-4 p-2 bg-gray-100 border rounded">
                  <div className="text-lg font-medium text-gray-500">
                    Suggested Solution: <br />
                    <span className="text-gray-700 ">
                      {" "}
                      {selectedProblem?.solution
                        .split("\n")
                        .map((line, index) => (
                          <span className="block mb-2" key={index}>
                            <ReactMarkdown>{line}</ReactMarkdown>
                          </span>
                        ))}{" "}
                    </span>
                  </div>
                </div>

                <div className="mt-4 p-2 bg-gray-100 border rounded">
                  <p className="text-lg font-medium text-gray-500">
                    Estimated Time: <br />
                    <span className="text-gray-700">
                      {" "}
                      {selectedProblem?.estimateTime}{" "}
                    </span>
                  </p>
                </div>

                <label
                  htmlFor="Status"
                  className=" text-lg block mt-6 mb-2  font-medium text-gray-900 "
                >
                  Change the Classification:
                </label>
                <select
                  id="Status"
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => setClassification(e.target.value)}
                  value={selectedClassification}
                >
                  <option value="">Select a status</option>
                  <option value="Software">Software</option>
                  <option value="Hardware">Hardware</option>
                  <option value="Network">Network</option>
                  <option value="Other">Other</option>
                </select>

                <label
                  htmlFor="Status"
                  className=" text-lg block mt-6 mb-2  font-medium text-gray-900 "
                >
                  Change the Status:
                </label>
                <select
                  id="Status"
                  className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  onChange={(e) => setSelectedStatus(e.target.value)}
                  value={selectedStatus}
                >
                  <option value="">Select a status</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
                <div className="flex justify-center mt-10">
                  <button
                    onClick={handleStatusChange}
                    className="cursor-pointer bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setShowModal(false)}
                    className=" cursor-pointer bg-red-700 hover:bg-red-800 text-white font-bold py-2 px-4 rounded mt-4 ml-4"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Problems;
