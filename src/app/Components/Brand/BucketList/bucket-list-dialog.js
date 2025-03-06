"use client";
import React, { useState,useContext } from "react";
import { Dialog } from "primereact/dialog";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import { createBucketList } from "@/redux/services/auth/brand/bucketList";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { authContext } from "@/assets/context/use-context";

export default function BucketListDialog() {
  const [visible, setVisible] = useState(false);
  const [loading,setLoading] = useState(false);
  const { user } = useContext(authContext)
  console.log("USER ",user);
  const [formData, setFormData] = useState({
    brand: user.user_id,
    name: "",
    description: "",
  });
  const auth = useAuth();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await createBucketList(auth,formData);
      setFormData({
        name: "",
        description: "",
      });
      console.log("RESPONSE ", response);
      toast.success("List created successfully");
    } catch (error) {
      console.log("ERROR ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex justify-content-center">
      <button
        className="bg-primary text-white rounded text-xs px-4 py-2"
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      >
        Add New List
      </button>
      <Dialog
        header="Create Bucket List"
        visible={visible}
        style={{ width: "40vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
          <InputComponent
            placeholder="Name"
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextAreaComponent
            placeholder="Description..."
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
          />
          <ButtonComponent
            type="submit"
            label={loading ? "Processing..." : "Create New List"}
            disabled={loading}
          />
        </form>
      </Dialog>
    </div>
  );
}
