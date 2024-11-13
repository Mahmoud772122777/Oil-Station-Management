import React, { useState } from "react";

const BranchManagement = () => {
  const [branches, setBranches] = useState([]);
  const [newBranch, setNewBranch] = useState({
    name: "",
    location: "",
    petrolPumps: "",
    dieselPumps: "",
    petrolTankCapacity: "",
    dieselTankCapacity: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBranch({ ...newBranch, [name]: value });
  };

  const addBranch = async () => {
    if (Object.values(newBranch).some(field => field === "")) {
        alert("Please fill in all fields.");
        return;
    }

    // Save branch data to backend
    try {
      const response = await fetch('http://localhost:5000/api/branch-data', {
        method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBranch),
        });
        const result = await response.json();
        console.log('Response from server:', result); // Log server response
        if (result.success) {
            setBranches([...branches, newBranch]);
            setNewBranch({
                name: "",
                location: "",
                petrolPumps: "",
                dieselPumps: "",
                petrolTankCapacity: "",
                dieselTankCapacity: "",
            });
        } else {
            alert('Failed to save branch data.');
        }
    } catch (error) {
        console.error('Error saving branch data:', error);
        alert('An error occurred while saving branch data.');
    }
};

  return (
    <div>
      <h2>Branch Management</h2>
      <input
        type="text"
        name="name"
        placeholder="Branch Name"
        value={newBranch.name}
        onChange={handleChange}
      />
      <input
        type="text"
        name="location"
        placeholder="Location"
        value={newBranch.location}
        onChange={handleChange}
      />
      <input
        type="number"
        name="petrolPumps"
        placeholder="Petrol Pumps"
        value={newBranch.petrolPumps}
        onChange={handleChange}
      />
      <input
        type="number"
        name="dieselPumps"
        placeholder="Diesel Pumps"
        value={newBranch.dieselPumps}
        onChange={handleChange}
      />
      <input
        type="number"
        name="petrolTankCapacity"
        placeholder="Petrol Tank Capacity"
        value={newBranch.petrolTankCapacity}
        onChange={handleChange}
      />
      <input
        type="number"
        name="dieselTankCapacity"
        placeholder="Diesel Tank Capacity"
        value={newBranch.dieselTankCapacity}
        onChange={handleChange}
      />
      <button onClick={addBranch}>Add Branch</button>

      <h3>All Branches</h3>
      <ul>
        {branches.map((branch, index) => (
          <li key={index}>
            <strong>{branch.name}</strong> - {branch.location} (Petrol Pumps: {branch.petrolPumps}, Diesel Pumps: {branch.dieselPumps})
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BranchManagement;
