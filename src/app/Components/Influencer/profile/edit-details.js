"use client";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import Slide from "@mui/material/Slide";
import { MdEdit } from "react-icons/md";
import { editInfluencerDetails } from "@/redux/services/influencer/profile";
import InputComponent from "../../SharedComponents/InputComponent";
import { fetchAllInfluencerDetails } from "@/redux/features/influencer/profile";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditDetailsModal({ influencerDetails }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    firstName: influencerDetails?.firstName || "",
    lastName: influencerDetails?.lastName || "",
    middleName: influencerDetails?.middleName || "",
    email: influencerDetails?.email || "",
    phoneNumber: influencerDetails?.phoneNumber || "",
  });

  const auth = useAuth();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const updatedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value === "" ? null : value,
        ])
      );
      const response = await editInfluencerDetails(auth, updatedData);
      setFormData({
        firstName: "",
        lastName: "",
        middleName: "",
        email: "",
        phoneNumber: "",
      });
      if (response.status === 200) {
        toast.success("User details edited successfully");
        dispatch(fetchAllInfluencerDetails(auth));
      }
      setOpen(false);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (influencerDetails) {
      setFormData({
        firstName: influencerDetails.firstName || "",
        lastName: influencerDetails.lastName || "",
        middleName: influencerDetails.middleName || "",
        email: influencerDetails.email || "",
        phoneNumber: influencerDetails.phoneNumber || "",
      });
    }
  }, [influencerDetails]);

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        className="border border-secondary rounded-3xl px-3 py-1 flex items-center gap-2 cursor-pointer"
      >
        <MdEdit className="text-secondary" />
        <small className="text-xs font-bold text-secondary">Edit</small>
      </div>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="xs"
        fullWidth
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ zIndex: 1000 }}
      >
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <InputComponent
              placeholder="first name"
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
            />
            <InputComponent
              placeholder="last name"
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
            />
            <InputComponent
              placeholder="middle name"
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
            <InputComponent
              placeholder="phone number"
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
            />
            <ButtonComponent
              type="submit"
              label={loading ? "Processing..." : "Edit Details"}
              disabled={loading}
            />
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
