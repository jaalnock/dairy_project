import React, { useState, useEffect } from "react";
import {SubAdminCard} from "../components/SubAdminCard";
import {SubAdminForm }from "../components/SubAdminForm";

export const SubAdminList = () => {
  const [subAdmins, setSubAdmins] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    image: "",
    mobile: "",
    password: "",
    address: "",
    branchId: "",
  });

  useEffect(() => {
    const storedSubAdmins = JSON.parse(localStorage.getItem("subAdmins")) || [];
    setSubAdmins(storedSubAdmins);
  }, []);

  useEffect(() => {
    localStorage.setItem("subAdmins", JSON.stringify(subAdmins));
  }, [subAdmins]);

  const handleEdit = (id) => {
    const subAdminToEdit = subAdmins.find((subAdmin) => subAdmin.id === id);
    setFormData(subAdminToEdit);
    setIsEditing(true);
    setEditId(id);
    setIsFormOpen(true);
  };

  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  const handleDelete = () => {
    const updatedSubAdmins = subAdmins.filter(
      (subAdmin) => subAdmin.id !== deleteId
    );
    setSubAdmins(updatedSubAdmins);
    setShowConfirm(false);
    setDeleteId(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (event) => {
    const { name, value } = event.target;
    if (name === "image") {
      setFormData({
        ...formData,
        image: event.target.files[0]
          ? URL.createObjectURL(event.target.files[0])
          : "",
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSaveSubAdmin = () => {
    if (
      !formData.name ||
      !formData.image ||
      !formData.mobile ||
      !formData.password ||
      !formData.branchId
    ) {
      alert("Please fill in all required fields!");
      return;
    }

    if (isEditing) {
      const updatedSubAdmins = subAdmins.map((subAdmin) =>
        subAdmin.id === editId ? { ...subAdmin, ...formData } : subAdmin
      );
      setSubAdmins(updatedSubAdmins);
    } else {
      const newSubAdmin = { id: subAdmins.length + 1, ...formData };
      setSubAdmins([...subAdmins, newSubAdmin]);
    }

    setIsFormOpen(false);
    setIsEditing(false);
    setEditId(null);
    setFormData({
      name: "",
      image: "",
      mobile: "",
      password: "",
      address: "",
      branchId: "",
    });
  };

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
        SubAdmins
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subAdmins.map((subAdmin) => (
          <SubAdminCard
            key={subAdmin.id}
            subAdmin={subAdmin}
            onEdit={handleEdit}
            onDelete={confirmDelete}
          />
        ))}
      </div>

      <button
        onClick={() => {
          setIsFormOpen(true);
          setIsEditing(false);
          setFormData({
            name: "",
            image: "",
            mobile: "",
            password: "",
            address: "",
            branchId: "",
          });
        }}
        className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition"
      >
        + Add SubAdmin
      </button>

      {isFormOpen && (
        <SubAdminForm
          isEditing={isEditing}
          formData={formData}
          handleInputChange={handleInputChange}
          handleFileChange={handleFileChange}
          handleSaveSubAdmin={handleSaveSubAdmin}
          setIsFormOpen={setIsFormOpen}
        />
      )}

      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              Confirm Deletion
            </h3>
            <p className="text-center mb-4">
              Are you sure you want to delete this SubAdmin?
            </p>
            <div className="flex justify-between mt-6 space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-[#4c76ba] text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                No
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-[#d9534f] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};


