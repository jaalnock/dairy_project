import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BranchCard } from "../components/BranchCard";
import { BranchForm } from "../components/BranchForm";
import axios from "axios";

export const BranchList = () => {
  const { t } = useTranslation();

  // State for branches, modal visibility, and deletion/editing helpers
  const [branches, setBranches] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    branchId: "",
    address: "",
    villageCity: "",
  });

  // Fetch branches from the backend on component mount
  useEffect(() => {
    const fetchBranches = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/branch/get-branches",
          { withCredentials: true }
        );
        // Assume your API returns branches under response.data.data
        setBranches(response.data.data);
      } catch (error) {
        console.error("Error fetching branches:", error);
      }
    };
    fetchBranches();
  }, []);

  // Handle input changes for the branch form
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Open the form in edit mode for a given branch id
  const handleEdit = (id) => {
    const branchToEdit = branches.find((branch) => branch.branchId === id);
    if (branchToEdit) {
      // Map your backend fields accordingly (e.g., branchAddress vs. address)
      setFormData({
        branchId: branchToEdit.branchId,
        address: branchToEdit.branchAddress || branchToEdit.address,
        villageCity: branchToEdit.location || branchToEdit.villageCity,
      });
      setIsEditing(true);
      setEditId(id);
      setIsFormOpen(true);
    }
  };

  // Confirm delete action for a branch
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Handle deletion of a branch and update state immediately
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/branch/delete-branch/${deleteId}`,
        { withCredentials: true }
      );
      setBranches((prevBranches) =>
        prevBranches.filter((branch) => branch.branchId !== deleteId)
      );
    } catch (error) {
      console.error("Error deleting branch:", error);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  // Handle saving a branch (both create and update)
  const handleSaveBranch = async () => {
    // Validate fields
    if (!formData.branchId || !formData.address || !formData.villageCity) {
      alert(t("branch.alerts.fillAllFields"));
      return;
    }

    try {
      if (isEditing) {
        // Update existing branch using PATCH (or PUT if you prefer)
        const response = await axios.patch(
          `http://localhost:8000/api/v1/branch/update-branch/${editId}`,
          {
            branchId: formData.branchId,
            branchAddress: formData.address,
            location: formData.villageCity,
          },
          { withCredentials: true }
        );
        if (response.status === 200) {
          // Update the branch in state
          setBranches((prevBranches) =>
            prevBranches.map((branch) =>
              branch.branchId === editId
                ? {
                    ...branch,
                    branchId: formData.branchId,
                    branchAddress: formData.address,
                    location: formData.villageCity,
                  }
                : branch
            )
          );
        }
      } else {
        // Create new branch
        const response = await axios.post(
          "http://localhost:8000/api/v1/branch/create-branch",
          {
            branchId: formData.branchId,
            branchAddress: formData.address,
            location: formData.villageCity,
          },
          { withCredentials: true }
        );
        // Check for success status (200 or 201) and update state
        if (response.status === 200 || response.status === 201) {
          setBranches((prevBranches) => [...prevBranches, response.data.data]);
        }
      }
      // Reset form state after saving
      setIsFormOpen(false);
      setIsEditing(false);
      setEditId(null);
      setFormData({ branchId: "", address: "", villageCity: "" });
    } catch (error) {
      console.error("Error saving branch:", error);
    }
  };

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
        {t("branch.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {branches.map((branch) => (
          <BranchCard
            key={branch.branchId}
            branch={branch}
            onEdit={() => handleEdit(branch.branchId)}
            onDelete={() => confirmDelete(branch.branchId)}
          />
        ))}
      </div>

      {/* Floating Add Branch Button */}
      <button
        onClick={() => {
          setIsFormOpen(true);
          setIsEditing(false);
          setFormData({ branchId: "", address: "", villageCity: "" });
        }}
        className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition"
      >
        {t("branch.buttons.addBranch")}
      </button>

      {/* Branch Form Modal */}
      {isFormOpen && (
        <BranchForm
          isEditing={isEditing}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSaveBranch={handleSaveBranch}
          setIsFormOpen={setIsFormOpen}
        />
      )}

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {t("branch.alerts.confirmDeleteTitle")}
            </h3>
            <p className="text-center mb-4">
              {t("branch.alerts.confirmDelete")}
            </p>
            <div className="flex justify-between mt-6 space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-[#4c76ba] text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                {t("branch.alerts.no")}
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-[#d9534f] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                {t("branch.alerts.yes")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
