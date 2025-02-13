import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

function CreatePolicyholder() {
  const [policyholderId, setPolicyholderId] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create policyholder data
    const newPolicyholder = {
      policyholder_id: parseInt(policyholderId), // Convert to integer
      name: name,
    };

    try {
      // Send data to the backend to create a new policyholder
      await API.post("/policyholders", newPolicyholder);

      // Redirect to the Policyholders page after creation
      navigate("/policyholders");
    } catch (error) {
      console.error("Error creating policyholder:", error);
      alert("Error creating policyholder. Please try again.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold mb-4">Create Policyholder</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="policyholderId" className="block text-sm font-medium">Policyholder ID</label>
          <input
            id="policyholderId"
            type="number"
            value={policyholderId}
            onChange={(e) => setPolicyholderId(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div>
          <label htmlFor="name" className="block text-sm font-medium">Name</label>
          <input
            id="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 mt-4 rounded"
        >
          Create Policyholder
        </button>
      </form>
    </div>
  );
}

export default CreatePolicyholder;
