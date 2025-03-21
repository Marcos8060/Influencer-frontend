"use client";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import Slide from "@mui/material/Slide";
import { editInfluencerOnboarding } from "@/redux/services/influencer/profile";
import { fetchAllInfluencerOnboarding } from "@/redux/features/influencer/profile";
import { FaCamera } from "react-icons/fa";
import { MdDelete } from "react-icons/md";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function EditProfilePhotoModal({ influencerDetails }) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    bio: influencerDetails?.profilePhotoUrl || "",
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
    if (!auth) {
      toast.error("Authentication required.");
      return;
    }

    setLoading(true);
    try {
      const updatedData = Object.fromEntries(
        Object.entries(formData).map(([key, value]) => [
          key,
          value.length === 0 ? null : value,
        ])
      );

      const response = await editInfluencerOnboarding(auth, updatedData);
      console.log("EDIT_RESPONSE ", response);

      if (response.status === 200) {
        toast.success("Bio edited successfully");
        dispatch(fetchAllInfluencerOnboarding(auth));
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
        bio: influencerDetails.profilePhotoUrl || "",
      });
    }
  }, [influencerDetails]);

  return (
    <React.Fragment>
      <img
        onClick={handleClickOpen}
        className="w-28 h-28 rounded-full object-cover cursor-pointer"
        src="https://images.pexels.com/photos/3779676/pexels-photo-3779676.jpeg?auto=compress&cs=tinysrgb&w=1200"
        alt=""
      />
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
        sx={{ zIndex: 1000 }}
      >
        <DialogContent>
          <h2 className="text-color font-semibold">Profile Photo</h2>
          <div className="flex items-center justify-center">
            <img
              onClick={handleClickOpen}
              className="w-40 h-40 rounded-full object-cover cursor-pointer"
              src="https://images.pexels.com/photos/3779676/pexels-photo-3779676.jpeg?auto=compress&cs=tinysrgb&w=1200"
              alt=""
            />
          </div>
          <footer className="flex items-center justify-between border-t border-input my-2 pt-2">
            <div>
              <FaCamera className="text-secondary text-center text-xl" />
              <p className="text-sm">Change Photo</p>
            </div>
            <div>
              <MdDelete className="text-red text-center text-xl" />
              <p className="text-sm">Delete</p>
            </div>
          </footer>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
