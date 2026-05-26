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

      alert("File uploaded successfully");
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
      return record.is_suspicious === true;
    }

    if (filter === "APPROVED") {
      return record.approved === true;
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
    <div style={{ padding: "20px" }}>

      <h1>Emission Review Dashboard</h1>

      <br />

      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />

      <button onClick={uploadFile}>
        Upload CSV
      </button>

      <hr />

      <h2>Summary</h2>

      <p>Total Records: {records.length}</p>

      <p>Suspicious Records: {suspiciousCount}</p>

      <p>Approved Records: {approvedCount}</p>

      <hr />

      <button onClick={() => setFilter("ALL")}>
        All
      </button>

      <button onClick={() => setFilter("SUSPICIOUS")}>
        Suspicious
      </button>

      <button onClick={() => setFilter("APPROVED")}>
        Approved
      </button>

      <br />
      <br />

      <table
        border="1"
        cellPadding="10"
        style={{
          borderCollapse: "collapse",
          width: "100%",
        }}
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Source</th>
            <th>Category</th>
            <th>Value</th>
            <th>Unit</th>
            <th>Status</th>
            <th>Approved</th>
            <th>Action</th>
          </tr>
        </thead>

        <tbody>
          {filteredRecords.map((record) => (
            <tr
              key={record.id}
              style={{
                backgroundColor: record.is_suspicious
                  ? "#ffcccc"
                  : record.approved
                  ? "#ccffcc"
                  : "#ffffff",
              }}
            >
              <td>{record.id}</td>

              <td>{record.source}</td>

              <td>{record.category}</td>

              <td>{record.raw_value}</td>

              <td>{record.raw_unit}</td>

              <td>{record.status}</td>

              <td>
                {record.approved ? "YES" : "NO"}
              </td>

              <td>
                {!record.approved && (
                  <>
                    <button
                      onClick={() =>
                        approveRecord(record.id)
                      }
                    >
                      Approve
                    </button>

                    <button
                      onClick={() =>
                        rejectRecord(record.id)
                      }
                      style={{
                        marginLeft: "10px",
                      }}
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
  );
}

export default App;