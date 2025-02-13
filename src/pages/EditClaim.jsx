import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

function EditClaim() {
  const { claim_id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    amount: "",
    status: "",
    policy_id: "",
    policyholder_id: "",
  });

  useEffect(() => {
    const fetchClaim = async () => {
      try {
        const { data } = await API.get(`/claims`);
        const claim = data.find((c) => c.claim_id.toString() === claim_id);
        if (claim) {
          setFormData({
            amount: claim.amount,
            status: claim.status,
            policy_id: claim.policy_id,
            policyholder_id: claim.policyholder_id,
          });
        } else {
          alert("Claim not found!");
          navigate("/claims");
        }
      } catch (error) {
        console.error("Error fetching claim:", error);
        alert("Failed to load claim details.");
      }
    };

    fetchClaim();
  }, [claim_id, navigate]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/claims/${claim_id}`, formData);
      alert("Claim updated successfully!");
      navigate("/claims");
    } catch (error) {
      console.error("Error updating claim:", error);
      alert("Failed to update claim.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Edit Claim</h2>
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded p-4">
        <div className="mb-3">
          <label className="block text-gray-700">Amount</label>
          <input
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Policy ID</label>
          <input
            type="text"
            name="policy_id"
            value={formData.policy_id}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="mb-3">
          <label className="block text-gray-700">Policyholder ID</label>
          <input
            type="text"
            name="policyholder_id"
            value={formData.policyholder_id}
            onChange={handleChange}
            className="border p-2 w-full rounded"
            required
          />
        </div>

        <div className="flex gap-3">
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
            Update Claim
          </button>
          <button
            type="button"
            onClick={() => navigate("/claims")}
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditClaim;
