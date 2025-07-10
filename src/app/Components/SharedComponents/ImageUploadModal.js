"use client";
import React, { useState, useRef } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import toast from "react-hot-toast";
import Slide from "@mui/material/Slide";
import { FaCamera } from "react-icons/fa";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ImageUploadModal({
  onUploadSuccess,
  uploadEndpoint,
  buttonLabel = "Upload Image",
  initialImage = null,
  triggerComponent = null,
  authHeaders = {}, // Optional: for auth headers
  onUpload, // Optional: custom upload handler
}) {
  const [open, setOpen] = useState(false);
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(initialImage);

  const handleClickOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const triggerFileInput = () => fileInputRef.current.click();

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!imageFile) {
      toast.error("Please select an image first.");
      return;
    }
    try {
      setLoading(true);
      let url;
      if (onUpload) {
        // Use custom upload handler
        url = await onUpload(imageFile);
      } else {
        // Default upload logic
        const form_data = new FormData();
        form_data.append("file", imageFile);
        form_data.append("file_section", "profilePhoto");
        const res = await fetch(uploadEndpoint, {
          method: "POST",
          body: form_data,
          headers: authHeaders,
        });
        const data = await res.json();
        if ((res.status === 200 || res.status === 201) && data.url) {
          url = data.url;
        } else {
          throw new Error("Failed to upload photo");
        }
      }
      setLoading(false);
      if (url) {
        toast.success("Image uploaded successfully");
        setPreviewImage(url);
        onUploadSuccess(url);
        setOpen(false);
      } else {
        toast.error("Failed to upload photo");
      }
    } catch (error) {
      setLoading(false);
      toast.error("Upload failed");
    }
  };

  return (
    <>
      {triggerComponent ? (
        React.cloneElement(triggerComponent, { onClick: handleClickOpen })
      ) : (
        <button onClick={handleClickOpen}>{buttonLabel}</button>
      )}
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        maxWidth="sm"
        fullWidth
        onClose={handleClose}
      >
        <DialogContent>
          <div className="flex flex-col items-center">
            <h2 className="text-color text-center font-semibold text-sm mb-2">
              {buttonLabel}
            </h2>
            <div className="w-full rounded bg-gray-200 flex items-center justify-center overflow-hidden mb-4">
              {previewImage ? (
                <img
                  className="w-full h-40 object-cover"
                  src={previewImage}
                  alt="Preview"
                />
              ) : (
                <FaCamera className="text-gray-500 text-4xl" />
              )}
            </div>
            <footer className="flex items-center justify-between border-t border-input my-2 pt-2 w-full">
              <div
                className="space-y-1 cursor-pointer"
                onClick={triggerFileInput}
              >
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
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 