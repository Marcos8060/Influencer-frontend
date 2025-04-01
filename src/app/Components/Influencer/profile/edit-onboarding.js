"use client";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import Slide from "@mui/material/Slide";
import { MdEdit } from "react-icons/md";
import { editInfluencerOnboarding } from "@/redux/services/influencer/profile";
import InputComponent from "../../SharedComponents/InputComponent";
import { fetchAllInfluencerOnboarding } from "@/redux/features/influencer/profile";
import { useDispatch } from "react-redux";
import MultiSelectCheckBox from "../../SharedComponents/MultiSelectCheckBox";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditOnboardingModal({ influencerOnboarding }) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();

  const [formData, setFormData] = useState({
    ethnicBackground: [],
    contentCategories: [],
    country: "",
    city: "",
    website: "",
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleMultiSelectChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
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
        Object.entries(formData).map(([key, value]) => [key, value.length === 0 ? null : value])
      );

      const response = await editInfluencerOnboarding(auth, updatedData);
      console.log("EDIT_RESPONSE ", response);

      if (response.status === 200) {
        toast.success("Onboarding details edited successfully");
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
        ethnicBackground: influencerOnboarding.ethnicBackground || [],
        contentCategories: influencerOnboarding.contentCategories || [],
        country: influencerOnboarding.country || "",
        city: influencerOnboarding.city || "",
        website: influencerOnboarding.website || "",
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
            <InputComponent
              placeholder="Country"
              type="text"
              name="country"
              value={formData.country}
              onChange={handleChange}
            />
            <InputComponent
              placeholder="City"
              type="text"
              name="city"
              value={formData.city}
              onChange={handleChange}
            />
            <InputComponent
              placeholder="Website"
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />

            <MultiSelectCheckBox
              value={formData.ethnicBackground}
              onChange={(e) => handleMultiSelectChange("ethnicBackground", e.value)}
              options={influencerOnboarding.ethnicBackground?.map((item) => ({
                name: item,
                value: item,
              }))}
              optionLabel="name"
              placeholder="Ethnic Background"
            />
            <MultiSelectCheckBox
              value={formData.contentCategories}
              onChange={(e) => handleMultiSelectChange("contentCategories", e.value)}
              options={influencerOnboarding.contentCategories?.map((item) => ({
                name: item,
                value: item,
              }))}
              optionLabel="name"
              placeholder="Content Category"
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
