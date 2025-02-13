import { useState, useEffect } from "react";
import API from "../api/api";
import { useNavigate, useParams } from "react-router-dom";

function EditPolicyholder() {
  const { policyholder_id } = useParams();
  const [name, setName] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPolicyholder = async () => {
      try {
        const { data } = await API.get(`/policyholders/${policyholder_id}`);
        setName(data.name);
      } catch (error) {
        console.error("Error fetching policyholder:", error);
      }
    };
    fetchPolicyholder();
  }, [policyholder_id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await API.put(`/policyholders/${policyholder_id}`, { name });
      alert("Policyholder updated successfully");
      navigate("/policyholders");
    } catch (error) {
      console.error("Error updating policyholder:", error);
      alert("Failed to update policyholder");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-semibold">Edit Policyholder</h2>
      <form onSubmit={handleUpdate} className="mt-4">
        <label className="block mb-2">Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
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

export default EditPolicyholder;
