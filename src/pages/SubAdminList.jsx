import React, { useState, useEffect } from "react";
import { SubAdminCard } from "../components/SubAdminCard";
import { SubAdminForm } from "../components/SubAdminForm";
import { useTranslation } from "react-i18next";
import axios from "axios";

export const SubAdminList = () => {
  const { t } = useTranslation();

  // State for sub-admins and modal helpers
  const [subAdmins, setSubAdmins] = useState([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editId, setEditId] = useState(null);
  const [showConfirm, setShowConfirm] = useState(false);
  const [deleteId, setDeleteId] = useState(null);

  // Form state (image is kept as a file)
  const [formData, setFormData] = useState({
    name: "",
    image: null, // file object will be stored here
    mobile: "",
    password: "",
    address: "",
    branchId: "",
  });

  // Fetch sub-admins from the backend when component mounts
  useEffect(() => {
    const fetchSubAdmins = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/api/v1/subadmin/get-all-subadmins",
          { withCredentials: true }
        );
        console.log(response.data.data);

        // Assume API returns an object with the sub-admins array in data.data
        setSubAdmins(response.data.data);
      } catch (error) {
        console.error("Error fetching sub-admins:", error);
      }
    };
    fetchSubAdmins();
  }, []);

  // Handle opening edit mode
  const handleEdit = (id) => {
    const subAdminToEdit = subAdmins.find((subAdmin) => subAdmin.id === id);
    if (subAdminToEdit) {
      // For security reasons, we don't prefill the password.
      // Also, if you already have an image URL from the backend,
      // you might choose to display it, but here we let the user pick a new file if needed.
      setFormData({
        name: subAdminToEdit.name,
        image: null,
        mobile: subAdminToEdit.mobile,
        password: "",
        address: subAdminToEdit.address,
        branchId: subAdminToEdit.branchId,
      });
      setIsEditing(true);
      setEditId(id);
      setIsFormOpen(true);
    }
  };

  // Confirm deletion
  const confirmDelete = (id) => {
    setDeleteId(id);
    setShowConfirm(true);
  };

  // Handle deletion API call
  const handleDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:8000/api/v1/subadmin/delete-subadmin/${deleteId}`,
        { withCredentials: true }
      );
      setSubAdmins((prev) =>
        prev.filter((subAdmin) => subAdmin.id !== deleteId)
      );
    } catch (error) {
      console.error("Error deleting sub-admin:", error);
    } finally {
      setShowConfirm(false);
      setDeleteId(null);
    }
  };

  // Handle input field changes (for text fields)
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file input changes; store the file (not a URL)
  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files && files.length > 0) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    }
  };

  // Handle saving (create or update) a sub-admin via API
  const handleSaveSubAdmin = async () => {
    // Validate required fields
    if (
      !formData.name ||
      !formData.mobile ||
      !formData.password ||
      !formData.branchId
    ) {
      alert(t("subAdmin.alerts.fillAllFields"));
      return;
    }

    try {
      if (isEditing) {
        // Update existing sub-admin using FormData to include file
        const dataUpdate = new FormData();
        dataUpdate.append("subAdminName", formData.name);
        if (formData.image) {
          dataUpdate.append("image", formData.image);
        }
        dataUpdate.append("mobileNumber", formData.mobile);
        dataUpdate.append("subAdminPassword", formData.password);
        dataUpdate.append("address", formData.address);
        dataUpdate.append("branchId", formData.branchId);

        const response = await axios.patch(
          `http://localhost:8000/api/v1/subadmin/update-subadmin/${editId}`,
          dataUpdate,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 200) {
          // Update state with the updated sub-admin returned from API
          setSubAdmins((prev) =>
            prev.map((subAdmin) =>
              subAdmin.id === editId ? response.data.data : subAdmin
            )
          );
        }
      } else {
        // Create new sub-admin using FormData
        const dataCreate = new FormData();
        dataCreate.append("subAdminName", formData.name);
        if (formData.image) {
          dataCreate.append("image", formData.image);
        }
        dataCreate.append("mobileNumber", formData.mobile);
        dataCreate.append("subAdminPassword", formData.password);
        dataCreate.append("address", formData.address);
        dataCreate.append("branchId", formData.branchId);

        const response = await axios.post(
          "http://localhost:8000/api/v1/subadmin/addSubAdmin",
          dataCreate,
          {
            withCredentials: true,
            headers: { "Content-Type": "multipart/form-data" },
          }
        );
        if (response.status === 201 || response.status === 200) {
          setSubAdmins((prev) => [...prev, response.data.data]);
        }
      }
      // Reset form state after saving
      setIsFormOpen(false);
      setIsEditing(false);
      setEditId(null);
      setFormData({
        name: "",
        image: null,
        mobile: "",
        password: "",
        address: "",
        branchId: "",
      });
    } catch (error) {
      console.error("Error saving sub-admin:", error);
    }
  };

  return (
    <div className="p-6 relative min-h-screen">
      <h2 className="text-4xl font-bold mb-10 text-center text-[#2c447f]">
        {t("subAdmin.title")}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {subAdmins.map((subAdmin) => (
          <SubAdminCard
            key={subAdmin.id}
            subAdmin={subAdmin}
            onEdit={() => handleEdit(subAdmin.id)}
            onDelete={() => confirmDelete(subAdmin.id)}
          />
        ))}
      </div>

      {/* Floating button to add a new sub-admin */}
      <button
        onClick={() => {
          setIsFormOpen(true);
          setIsEditing(false);
          setFormData({
            name: "",
            image: null,
            mobile: "",
            password: "",
            address: "",
            branchId: "",
          });
        }}
        className="fixed bottom-6 right-6 bg-[#2c447f] text-white px-6 py-3 rounded-full shadow-lg hover:bg-[#1b2d5b] transition"
      >
        {t("subAdmin.buttons.addSubAdmin")}
      </button>

      {/* Sub-admin Form Modal */}
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

      {/* Delete Confirmation Modal */}
      {showConfirm && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center px-4">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <h3 className="text-xl font-semibold mb-4 text-center">
              {t("subAdmin.alerts.confirmDeleteTitle")}
            </h3>
            <p className="text-center mb-4">
              {t("subAdmin.alerts.confirmDelete")}
            </p>
            <div className="flex justify-between mt-6 space-x-4">
              <button
                onClick={() => setShowConfirm(false)}
                className="flex-1 bg-[#4c76ba] text-white px-4 py-2 rounded-lg hover:bg-gray-500 transition"
              >
                {t("subAdmin.alerts.no")}
              </button>
              <button
                onClick={handleDelete}
                className="flex-1 bg-[#d9534f] text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
              >
                {t("subAdmin.alerts.yes")}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SubAdminList;
