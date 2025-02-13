import { useState, useEffect } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Policies() {
  const [policies, setPolicies] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/policies");
        setPolicies(data);
      } catch (error) {
        console.error("Error fetching policies:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (policyId) => {
    if (!window.confirm("Are you sure you want to delete this policy?")) return;

    try {
      await API.delete(`/policies/${policyId}`);
      setPolicies(policies.filter(policy => policy.policy_id !== policyId));
    } catch (error) {
      console.error("Error deleting policy:", error);
      alert("Failed to delete policy");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Policies</h2>

      {/* Button to navigate to the create policy page */}
      <Link
        to="/policies/create"
        className="inline-block bg-green-500 text-white px-4 py-2 mb-4 rounded"
      >
        Create Policy
      </Link>

      {/* Display the list of policies */}
      <ul className="bg-white shadow-md rounded p-4">
        {policies.length > 0 ? (
          policies.map((policy) => (
            <li key={policy.policy_id} className="border-b last:border-b-0 p-3 flex justify-between items-center">
              <div>
                <strong>Policy ID:</strong> {policy.policy_id} <br />
                <strong>Policy Type:</strong> {policy.type} <br />
                <strong>Policy Amount:</strong> {policy.amount}<br />
                <strong>Policyholder ID:</strong> {policy.policyholder_id}
              </div>
              <div className="flex gap-2">
                {/* Edit Button */}
                <Link
                  to={`/policies/${policy.policy_id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(policy.policy_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No policies available.</p>
        )}
      </ul>
    </div>
  );
}

export default Policies;
