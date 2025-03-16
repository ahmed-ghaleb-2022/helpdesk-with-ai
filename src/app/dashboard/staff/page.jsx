"use client";
import { getAllStaff, setUserSection } from "@/app/db/dbActions";
import DashboardLayout from "../DashboardLayout";
import { useEffect, useState } from "react";

const Staff = () => {
  const [staff, setStaff] = useState([]);

  const [selectedStaff, setSelectedStaff] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState("");

  const handleEdit = (staff) => {
    setSelectedStaff(staff);
    setShowModal(true);
  };

  const handleSectionChange = async () => {
    await setUserSection(selectedStaff.email, selectedSection);
    setShowModal(false);
    window.location.reload(); // Refresh the page
  };

  useEffect(() => {
    const fetchStaff = async () => {
      const staff = await getAllStaff();
      setStaff(staff);
      console.log(staff);
    };
    fetchStaff();
  }, []);

  return (
    <DashboardLayout>
      <div className="relative">
        <h1 className="text-3xl my-6 text-center text-white">Staff Management</h1>
        <p className="text-center text-xl text-gray-200">Here you can manage your staff</p>

        <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-4/5 mx-auto mt-12">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50  ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Name
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Section
                </th>

                <th scope="col" className="px-6 py-3">
                  Edit
                </th>
              </tr>
            </thead>
            <tbody>
              {staff.map((staff) => (
                <tr
                  key={staff.id}
                  className="bg-white border-b  hover:text-black border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-300"
                >
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
                  >
                    {staff.name}
                  </th>
                  <td className="px-6 py-4">{staff.email}</td>
                  <td className="px-6 py-4"> {staff.sections?.[0]?.name || "No Section"}</td>
                  <td className="px-6 py-4">
                    <p
                      className="font-medium cursor-pointer text-blue-600 dark:text-blue-500 hover:underline"
                      onClick={() => handleEdit(staff)}
                    >
                      Edit
                    </p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {showModal && (
          <div className="p-4 w-2xl h-[400px] rounded border-2 border-gray-200 shadow-md bg-white absolute top-64 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <h3 className="text-2xl text-gray-600 text-center mb-4">
              Edit Staff Section
            </h3>

            <div className="max-w-sm mx-auto mt-8">
              <p className="text-lg font-medium text-gray-500">
                Name:{" "}
                <span className="text-gray-700"> {selectedStaff?.name} </span>
              </p>
              <p className="text-lg font-medium text-gray-500">
                Email:{" "}
                <span className="text-gray-700"> {selectedStaff?.email} </span>
              </p>
              <label
                htmlFor="sections"
                className=" text-lg block my-3  font-medium text-gray-900 "
              >
                Select the section: {selectedSection}
              </label>
              <select
                id="sections"
                className="bg-gray-50 border border-gray-300 text-gray-900  rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => setSelectedSection(e.target.value)}
                value={selectedSection}
              >
                <option value="">Select a section</option>
                <option value="Software">Software</option>
                <option value="Network">Network</option>
                <option value="Hardware">Hardware</option>
                <option value="Others">Others</option>
              </select>
              <div className="flex justify-center mt-10">
                <button
                  onClick={handleSectionChange}
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
    </DashboardLayout>
  );
};

export default Staff;
