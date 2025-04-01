"use client";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import Slide from "@mui/material/Slide";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import { MdEdit } from "react-icons/md";
import { editInfluencerOnboarding } from "@/redux/services/influencer/profile";
import { fetchAllInfluencerOnboarding } from "@/redux/features/influencer/profile";
import { useDispatch } from "react-redux";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function EditBioModal({ influencerOnboarding }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    bio: influencerOnboarding?.bio || "",
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

      if (response.status === 200) {
        toast.success("Bio edited successfully");
        dispatch(fetchAllInfluencerOnboarding(auth));
      }
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage[0])
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (influencerOnboarding) {
      setFormData({
        bio: influencerOnboarding.bio || "",
      });
    }
  }, [influencerOnboarding]);

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
            <TextAreaComponent
              placeholder="bio"
              type="text"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
            />
            <ButtonComponent
              type="submit"
              label={loading ? "Processing..." : "Edit Bio"}
              disabled={loading}
            />
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
