import { useState, useEffect } from "react";
import API from "../api/api";
import { Link, useNavigate } from "react-router-dom";

function Policyholders() {
  const [policyholders, setPolicyholders] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/policyholders");
        setPolicyholders(data);
      } catch (error) {
        console.error("Error fetching policyholders:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (policyholderId) => {
    if (!window.confirm("Are you sure you want to delete this policyholder?")) return;

    try {
      await API.delete(`/policyholders/${policyholderId}`);
      setPolicyholders(policyholders.filter(ph => ph.policyholder_id !== policyholderId));
    } catch (error) {
      console.error("Error deleting policyholder:", error);
      alert("Failed to delete policyholder");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Policyholders</h2>

      <Link
        to="/policyholders/create"
        className="inline-block bg-green-500 text-white px-4 py-2 mt-4 rounded"
      >
        Create Policyholder
      </Link>

      <ul className="mt-4">
        {policyholders.length > 0 ? (
          policyholders.map((policyholder) => (
            <li key={policyholder.policyholder_id} className="border p-2 flex justify-between items-center">
              <span
                className="cursor-pointer text-blue-500 hover:underline"
                onClick={() => navigate(`/policyholders/${policyholder.policyholder_id}`)}
              >
                {policyholder.name} (ID: {policyholder.policyholder_id})
              </span>
              <button
                onClick={() => handleDelete(policyholder.policyholder_id)}
                className="bg-red-500 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No policyholders available.</p>
        )}
      </ul>
    </div>
  );
}

export default Policyholders;
