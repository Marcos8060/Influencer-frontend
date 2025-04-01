"use client";
import React, { useState, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import Slide from "@mui/material/Slide";
import { MdEdit } from "react-icons/md";
import { editInfluencerPreferences } from "@/redux/services/influencer/profile";
import { fetchAllInfluencerPreferences } from "@/redux/features/influencer/profile";
import { useDispatch } from "react-redux";
import MultiSelectCheckBox from "../../SharedComponents/MultiSelectCheckBox";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
  });

export default function EditPreferencesModal({
  influencerPreferences,
}) {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();

  const [formData, setFormData] = useState({
    preferredBrands: [],
    preferredCollaborationContentFormat: [],
    preferredCompaniesType: [],
  });

  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Handle MultiSelectCheckBox changes
  const handleMultiSelectChange = (key, value) => {
    setFormData((prev) => ({
      ...prev,
      [key]: value.length > 0 ? value : null, // Convert empty arrays to null
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await editInfluencerPreferences(auth, formData);

      if (response.status === 200) {
        toast.success("Preferences updated successfully");
        dispatch(fetchAllInfluencerPreferences(auth));
      }
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage[0])
    } finally {
      setLoading(false);
    }
  };

  // Populate form data when influencerPreferences is available
  useEffect(() => {
    if (influencerPreferences) {
      setFormData({
        preferredBrands: influencerPreferences.preferredBrands || [],
        preferredCollaborationContentFormat:
          influencerPreferences.preferredCollaborationContentFormat || [],
        preferredCompaniesType: influencerPreferences.preferredCompaniesType || [],
      });
    }
  }, [influencerPreferences]);

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        className="border border-secondary rounded-3xl px-3 py-1 flex items-center gap-2 cursor-pointer mt-4"
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
            <MultiSelectCheckBox
              value={formData.preferredBrands}
              onChange={(e) => handleMultiSelectChange("preferredBrands", e.value)}
              options={influencerPreferences.preferredBrands?.map((item) => ({
                name: item,
                value: item,
              }))}
              optionLabel="name"
              placeholder="Preferred Brands"
            />
            <MultiSelectCheckBox
              value={formData.preferredCollaborationContentFormat}
              onChange={(e) =>
                handleMultiSelectChange("preferredCollaborationContentFormat", e.value)
              }
              options={influencerPreferences.preferredCollaborationContentFormat?.map(
                (item) => ({ name: item, value: item })
              )}
              optionLabel="name"
              placeholder="Preferred Content"
            />
            <MultiSelectCheckBox
              value={formData.preferredCompaniesType}
              onChange={(e) => handleMultiSelectChange("preferredCompaniesType", e.value)}
              options={influencerPreferences.preferredCompaniesType?.map((item) => ({
                name: item,
                value: item,
              }))}
              optionLabel="name"
              placeholder="Preferred Companies"
            />

            <ButtonComponent
              type="submit"
              label={loading ? "Processing..." : "Edit Preferences"}
              disabled={loading}
            />
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
