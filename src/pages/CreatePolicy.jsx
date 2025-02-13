import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function CreatePolicy() {
  const [policyId, setPolicyId] = useState("");
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [policyholderId, setPolicyholderId] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newPolicy = {
        policy_id: parseInt(policyId), // Convert to integer
        type: type,
        amount: parseInt(amount),
        policyholder_id: parseInt(policyholderId),
      };

    try {
      // Send the policy data to the backend API
      const response = await API.post("/policies", newPolicy);

      console.log("Policy created:", response.data);
      // Navigate back to the policies list
      navigate("/policies");
    } catch (error) {
      console.error("Error creating policy:", error);
      alert("Failed to create policy.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Policy</h2>
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded">
        <div className="mb-4">
          <label htmlFor="policyId" className="block text-sm font-medium text-gray-700">
            Policy ID
          </label>
          <input
            id="policyId"
            type="number"
            className="mt-1 block w-full p-2 border rounded"
            value={policyId}
            onChange={(e) => setPolicyId(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="type" className="block text-sm font-medium text-gray-700">
            Type
          </label>
          <input
            id="type"
            type="text"
            className="mt-1 block w-full p-2 border rounded"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
            Amount
          </label>
          <input
            id="amount"
            type="number"
            className="mt-1 block w-full p-2 border rounded"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="policyholderId" className="block text-sm font-medium text-gray-700">
            Policyholder ID
          </label>
          <input
            id="policyholderId"
            type="number"
            className="mt-1 block w-full p-2 border rounded"
            value={policyholderId}
            onChange={(e) => setPolicyholderId(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
          Create Policy
        </button>
      </form>
    </div>
  );
}

export default CreatePolicy;
