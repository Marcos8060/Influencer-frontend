"use client";
import React, { useState, useRef, useEffect } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import Slide from "@mui/material/Slide";
import { editProfilePhoto } from "@/redux/services/influencer/profile";
import { FaCamera } from "react-icons/fa";
import { FaRegCircleUser } from "react-icons/fa6";
import { useDispatch } from "react-redux";
import { fetchAllInfluencerDetails } from "@/redux/features/influencer/profile";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditProfilePhotoModal({ influencerDetails }) {
  const auth = useAuth();
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  // Initialize form data
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(
    influencerDetails?.profilePhotoUrl || null
  );

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file)); // Show preview
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!imageFile) {
        toast.error("Please select an image first.");
        return;
    }

    const form_data = new FormData();
    form_data.append("picture", imageFile, imageFile.name);

    try {
        setLoading(true);
        const res = await editProfilePhoto(auth, form_data);
        setLoading(false);

        if (res.status === 200) {
            toast.success("Profile photo updated successfully");
            setPreviewImage(URL.createObjectURL(imageFile));
            dispatch(fetchAllInfluencerDetails(auth));
            setOpen(false);
        } else {
            toast.error("Failed to upload photo");
        }
    } catch (error) {
        setLoading(false);
        toast.error(error.message);
    }
};


  useEffect(() => {
    if (influencerDetails?.profilePhotoUrl) {
      setPreviewImage(influencerDetails.profilePhotoUrl);
    }
  }, [influencerDetails]);

  return (
    <React.Fragment>
      <div
        onClick={handleClickOpen}
        className="w-28 h-28 rounded-full bg-gray-200 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {previewImage ? (
          <img className="w-full h-full object-cover" src={previewImage} alt="Profile" />
        ) : (
          <FaRegCircleUser className="text-gray-500 text-6xl" />
        )}
      </div>

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
          <div>
            <h2 className="text-color text-center font-semibold">
              {influencerDetails?.firstName}, help brands recognize you
            </h2>
          </div>
          <div className="flex items-center justify-center my-4">
            <div className="w-40 h-40 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
              {previewImage ? (
                <img className="w-full h-full object-cover" src={previewImage} alt="Profile Preview" />
              ) : (
                <FaRegCircleUser className="text-gray-500 text-8xl" />
              )}
            </div>
          </div>
          <footer className="flex items-center justify-between border-t border-input my-2 pt-2">
            <div className="space-y-1 cursor-pointer" onClick={triggerFileInput}>
              <FaCamera className="text-secondary ml-8 text-xl" />
              <p className="text-xs">Upload Photo</p>
            </div>
            <div>
              {imageFile && (
                <button
                  onClick={handleSubmit}
                  className="bg-secondary text-white px-4 py-2 rounded text-xs"
                  disabled={loading}
                >
                  {loading ? "Uploading..." : "Save Photo"}
                </button>
              )}
            </div>
          </footer>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
