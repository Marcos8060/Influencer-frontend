"use client";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import { createBucketList } from "@/redux/services/auth/brand/bucketList";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch } from "react-redux";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import { MdAdd } from "react-icons/md";


export default function BucketListDialog() {
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: null,
    description: null,
  });
  const auth = useAuth();

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (auth) {
        await createBucketList(auth, formData);
        setFormData({
          name: "",
          description: "",
        });
        toast.success("Bucket List created successfully");
        setVisible(false);
        dispatch(fetchAllBuckets(auth));
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage[0])
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex justify-content-center">
      <button
        className="flex items-center gap-1 border border-primary rounded text-xs px-4 py-3"
        label="Show"
        type="button"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      >
        <MdAdd className="text-md" />
        Create New Bucket
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
