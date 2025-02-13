import { useState, useEffect } from "react";
import API from "../api/api";
import { Link } from "react-router-dom";

function Claims() {
  const [claims, setClaims] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data } = await API.get("/claims");
        setClaims(data);
      } catch (error) {
        console.error("Error fetching claims:", error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async (claimId) => {
    if (!window.confirm("Are you sure you want to delete this claim?")) return;

    try {
      await API.delete(`/claims/${claimId}`);
      setClaims(claims.filter(claim => claim.claim_id !== claimId));
    } catch (error) {
      console.error("Error deleting claim:", error);
      alert("Failed to delete claim.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Claims</h2>

      {/* Link to create a new claim */}
      <Link
        to="/claims/create"
        className="inline-block bg-green-500 text-white px-4 py-2 mb-4 rounded"
      >
        Create New Claim
      </Link>

      {/* Display the list of claims */}
      <ul className="bg-white shadow-md rounded p-4">
        {claims.length > 0 ? (
          claims.map((claim) => (
            <li key={claim.claim_id} className="border-b last:border-b-0 p-3 flex justify-between items-center">
              <div>
                <strong>Claim ID:</strong> {claim.claim_id} <br />
                <strong>Policyholder ID:</strong> {claim.policyholder_id} <br />
                <strong>Amount:</strong> {claim.amount} <br />
                <strong>Status:</strong>{" "}
                <span
                  className={`px-2 py-1 rounded text-white ${
                    claim.status === "approved"
                      ? "bg-green-500"
                      : claim.status === "pending"
                      ? "bg-yellow-500"
                      : "bg-red-500"
                  }`}
                >
                  {claim.status}
                </span>
              </div>
              <div className="flex gap-2">
                {/* Edit Button */}
                <Link
                  to={`/claims/${claim.claim_id}`}
                  className="bg-blue-500 text-white px-3 py-1 rounded"
                >
                  Edit
                </Link>

                {/* Delete Button */}
                <button
                  onClick={() => handleDelete(claim.claim_id)}
                  className="bg-red-500 text-white px-3 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </li>
          ))
        ) : (
          <p className="text-gray-500">No claims available.</p>
        )}
      </ul>
    </div>
  );
}

export default Claims;
