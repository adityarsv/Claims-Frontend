import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function EditPolicy() {
  const { policy_id } = useParams();
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("");
  const [policyholderId, setPolicyholderId] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicy = async () => {
      try {
        const { data } = await API.get(`/policies/${policy_id}`);
        setType(data.type);
        setAmount(data.amount);
        setPolicyholderId(data.policyholder_id);
      } catch (error) {
        console.error("Error fetching policy:", error);
      }
    };
    fetchPolicy();
  }, [policy_id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/policies/${policy_id}`, {
        type,
        amount,
        policyholder_id: policyholderId,
      });
      alert("Policy updated successfully");
      navigate("/policies");
    } catch (error) {
      console.error("Error updating policy:", error);
      alert("Failed to update policy");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Edit Policy</h2>
      <form onSubmit={handleUpdate} className="mt-4">
        <label className="block mb-2">Policy Type:</label>
        <input
          type="text"
          value={type}
          onChange={(e) => setType(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <label className="block mt-4 mb-2">Policy Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <label className="block mt-4 mb-2">Policyholder ID:</label>
        <input
          type="text"
          value={policyholderId}
          onChange={(e) => setPolicyholderId(e.target.value)}
          className="border p-2 rounded w-full"
          required
        />

        <button
          type="submit"
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
        >
          Update
        </button>
      </form>
    </div>
  );
}

export default EditPolicy;
