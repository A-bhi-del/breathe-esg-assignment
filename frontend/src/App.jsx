import { useEffect, useState } from "react";
import axios from "axios";

function App() {

  const [records, setRecords] = useState([]);
  const [file, setFile] = useState(null);

  const [filter, setFilter] = useState("ALL");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {

    try {

      const response = await axios.get(
        "http://127.0.0.1:8000/api/emissions/"
      );

      setRecords(response.data);

    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {

    const formData = new FormData();

    formData.append("file", file);

    try {

      await axios.post(
        "http://127.0.0.1:8000/api/upload/",
        formData
      );

      fetchData();

      alert("CSV Uploaded Successfully");

    } catch (error) {
      console.log(error);
    }
  };

  const approveRecord = async (id) => {

    try {

      await axios.post(
        `http://127.0.0.1:8000/api/approve/${id}/`
      );

      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  const rejectRecord = async (id) => {

    try {

      await axios.post(
        `http://127.0.0.1:8000/api/reject/${id}/`
      );

      fetchData();

    } catch (error) {
      console.log(error);
    }
  };

  const filteredRecords = records.filter((record) => {

    if (filter === "SUSPICIOUS") {
      return record.is_suspicious;
    }

    if (filter === "APPROVED") {
      return record.approved;
    }

    return true;
  });

  const suspiciousCount = records.filter(
    (r) => r.is_suspicious
  ).length;

  const approvedCount = records.filter(
    (r) => r.approved
  ).length;

  return (

  <div className="min-h-screen bg-gray-100 p-8 text-black">

    {/* HEADER */}

    <div className="mb-8">

      <h1 className="text-4xl font-bold text-black">
        ESG Emission Review Dashboard
      </h1>

      <p className="text-gray-600 mt-2">
        Review, approve and manage emission records
      </p>

    </div>

    {/* TOP CARDS */}

    <div className="grid grid-cols-4 gap-6 mb-8">

      {/* UPLOAD */}

      <div className="bg-white rounded-2xl p-6 shadow">

        <h2 style={{
            fontSize: "19px",
            fontWeight: "bold",
            color: "#364153",
            marginTop: "16px",
          }}>
          Upload CSV File
        </h2>

        <input
          type="file"
          onChange={(e) =>
            setFile(e.target.files[0])
          }
          className="w-full border p-3 rounded-lg text-black"
        />

        <button
          onClick={uploadFile}
          className="mt-4 w-full bg-black text-white py-3 rounded-xl font-semibold hover:bg-gray-800 transition"
        >
          Upload CSV
        </button>

      </div>

      {/* TOTAL */}

      <div className="bg-blue-100 rounded-2xl p-6 shadow flex flex-col justify-center items-center">

        <p className="text-gray-700 text-lg">
          Total Records
        </p>

        <h2
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "#2563eb",
            marginTop: "16px",
          }}
        >
          {records.length}
        </h2>

      </div>

      {/* APPROVED */}

      <div className="bg-green-100 rounded-2xl p-6 shadow flex flex-col justify-center items-center">

        <p className="text-green-700 text-lg">
          Approved
        </p>

        <h2
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "#15803d",
            marginTop: "16px",
          }}
        >
          {approvedCount}
        </h2>

      </div>

      {/* SUSPICIOUS */}
      <div className="bg-red-100 rounded-2xl p-6 shadow flex flex-col justify-center items-center">

        <p className="text-red-700 text-lg">
          Suspicious Records
        </p>

        <h2
          style={{
            fontSize: "40px",
            fontWeight: "bold",
            color: "#b91c1c",
            marginTop: "16px",
          }}
        >
          {suspiciousCount}
        </h2>
      </div>
    </div>

    {/* FILTERS */}

    <div className="flex gap-4 mb-6">

      <button
        onClick={() => setFilter("ALL")}
        className="bg-black text-white px-5 py-2 rounded-xl"
      >
        All
      </button>

      <button
        onClick={() => setFilter("SUSPICIOUS")}
        className="bg-red-500 text-white px-5 py-2 rounded-xl"
      >
        Suspicious
      </button>

      <button
        onClick={() => setFilter("APPROVED")}
        className="bg-green-500 text-white px-5 py-2 rounded-xl"
      >
        Approved
      </button>

    </div>

    {/* TABLE */}

    <div className="bg-white rounded-2xl shadow overflow-hidden">

      <table className="w-full">

        <thead className="bg-gray-200">

          <tr>

            <th className="p-4 text-left">
              ID
            </th>

            <th className="p-4 text-left">
              Source
            </th>

            <th className="p-4 text-left">
              Category
            </th>

            <th className="p-4 text-left">
              Value
            </th>

            <th className="p-4 text-left">
              Unit
            </th>

            <th className="p-4 text-left">
              Status
            </th>

            <th className="p-4 text-left">
              Action
            </th>

          </tr>

        </thead>

        <tbody>

          {filteredRecords.map((record) => (

            <tr
              key={record.id}
              className={`border-t hover:bg-gray-50 ${
                record.is_suspicious
                  ? "bg-red-50"
                  : record.approved
                  ? "bg-green-50"
                  : ""
              }`}
            >

              <td className="p-4">
                {record.id}
              </td>

              <td className="p-4 font-semibold">
                {record.source}
              </td>

              <td className="p-4">
                {record.category}
              </td>

              <td className="p-4">
                {record.raw_value}
              </td>

              <td className="p-4">
                {record.raw_unit}
              </td>

              {/* STATUS */}

              <td className="p-4">

                <span
                  className={`px-3 py-1 rounded-full text-white text-sm font-semibold
                  ${
                    record.status === "APPROVED"
                      ? "bg-green-500"
                      : record.status === "REVIEW"
                      ? "bg-yellow-500"
                      : record.status === "FAILED"
                      ? "bg-red-500"
                      : "bg-blue-500"
                  }`}
                >
                  {record.status}
                </span>

              </td>

              {/* ACTIONS */}

              <td className="p-4 flex gap-3">

                {record.status !== "APPROVED" &&
                  record.status !== "FAILED" && (

                  <>

                    <button
                      onClick={() =>
                        approveRecord(record.id)
                      }
                      className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectRecord(record.id)
                      }
                      className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
                    >
                      Reject
                    </button>

                  </>

                )}

              </td>

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  </div>
);
}

export default App;