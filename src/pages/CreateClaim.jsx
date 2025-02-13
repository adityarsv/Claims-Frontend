import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function CreateClaim() {
  const [claimID, setClaimID] = useState("");
  const [amount, setAmount] = useState("");
  const [status, setStatus] = useState("");
  const [policyID, setPolicyID] = useState("");
  const [policyholderID, setPolicyholderID] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newClaim = {
      claim_id: parseInt(claimID), // Convert to integer
      amount: parseInt(amount),
      status: status,
      policy_id: parseInt(policyID),
      policyholder_id: parseInt(policyholderID),
    };

    try {
      const response = await API.post("/claims", newClaim);
      console.log("Claim created successfully:", response.data);
      navigate("/claims");
    } catch (error) {
      console.error("Error creating claim:", error);
      alert("Failed to create claim. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create New Claim</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm">Claim ID</label>
          <input
            type="number"
            name="claim_id"
            value={claimID}
            onChange={(e) => setClaimID(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm">Amount</label>
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm">Status</label>
          <select
            name="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="border p-2 w-full"
          >
            <option value="pending">Pending</option>
            <option value="approved">Approved</option>
            <option value="denied">Denied</option>
          </select>
        </div>

        <div>
          <label className="block text-sm">Policy ID</label>
          <input
            type="number"
            name="policy_id"
            value={policyID}
            onChange={(e) => setPolicyID(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <div>
          <label className="block text-sm">Policyholder ID</label>
          <input
            type="number"
            name="policyholder_id"
            value={policyholderID}
            onChange={(e) => setPolicyholderID(e.target.value)}
            required
            className="border p-2 w-full"
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 mt-4 w-full rounded">
          Create Claim
        </button>
      </form>
    </div>
  );
}

export default CreateClaim;
