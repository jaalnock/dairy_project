import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { BranchCard } from "../components/BranchCard";
import { BranchForm } from "../components/BranchForm";

export const BranchList = () => {
  const { t } = useTranslation();
  const [branches, setBranches] = useState([]);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  useEffect(() => {
    const storedBranches = JSON.parse(localStorage.getItem("branches")) || [];
    setBranches(storedBranches);
  }, []);

  useEffect(() => {
    localStorage.setItem("branches", JSON.stringify(branches));
  }, [branches]);

  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [formData, setFormData] = useState({
    branchId: "",
    address: "",
    villageCity: "",
  });

  const handleEdit = (id) => {
    const branchToEdit = branches.find((branch) => branch.branchId === id);
    setFormData(branchToEdit);
    setIsEditing(true);
    setEditId(id);
    setIsFormOpen(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    const updatedBranches = branches.filter(
      (branch) => branch.branchId !== deleteId
    );
    setBranches(updatedBranches);
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveBranch = () => {
    if (!formData.branchId || !formData.address || !formData.villageCity) {
      alert(t("branch.alerts.fillAllFields"));
      return;
    }

    if (isEditing) {
      const updatedBranches = branches.map((branch) =>
        branch.branchId === editId ? { ...branch, ...formData } : branch
      );
      setBranches(updatedBranches);
    } else {
      const newBranch = { ...formData };
      setBranches([...branches, newBranch]);
    }

    setIsFormOpen(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({ branchId: "", address: "", villageCity: "" });
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
            onEdit={handleEdit}
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

      {/* Call BranchForm when needed */}
      {isFormOpen && (
        <BranchForm
          isEditing={isEditing}
          formData={formData}
          handleInputChange={handleInputChange}
          handleSaveBranch={handleSaveBranch}
          setIsFormOpen={setIsFormOpen}
        />
      )}

      {/* Confirmation Modal */}
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
