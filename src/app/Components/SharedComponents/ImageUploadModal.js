"use client";
import React, { useState, useRef } from "react";
import toast from "react-hot-toast";
import { FaCamera } from "react-icons/fa";
import { FiEdit } from "react-icons/fi";

export default function ImageUploadInline({
  onUploadSuccess,
  buttonLabel = "Upload Image",
  initialImage = null,
  triggerComponent = null,
  onUpload, // Optional: custom upload handler
  shape = "circle", // "circle" for avatar, "rect" for cover
  className = "",
}) {
  const fileInputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(initialImage);
  const [showOverlay, setShowOverlay] = useState(false);

  const openFilePicker = () => fileInputRef.current.click();

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setLoading(true);
      try {
        let url;
        if (onUpload) {
          url = await onUpload(file);
        }
        setLoading(false);
        if (url) {
          toast.success("Image uploaded successfully");
          setPreviewImage(url);
          setImageFile(null);
          onUploadSuccess(url);
        } else {
          toast.error("Failed to upload photo");
        }
      } catch (error) {
        setLoading(false);
        // toast.error("Upload failed");
      }
    }
  };

  const handleDrop = async (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    if (file) {
      setImageFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setLoading(true);
      try {
        let url;
        if (onUpload) {
          url = await onUpload(file);
        }
        setLoading(false);
        if (url) {
          toast.success("Image uploaded successfully");
          setPreviewImage(url);
          setImageFile(null);
          onUploadSuccess(url);
        } else {
          toast.error("Failed to upload photo");
        }
      } catch (error) {
        setLoading(false);
        toast.error("Upload failed");
      }
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  const handleSave = async () => {
    if (!imageFile) return;
    try {
      setLoading(true);
      let url;
      if (onUpload) {
        url = await onUpload(imageFile);
      }
      setLoading(false);
      if (url) {
        toast.success("Image uploaded successfully");
        setPreviewImage(url);
        setShowOverlay(false);
        setImageFile(null);
        onUploadSuccess(url);
      } else {
        toast.error("Failed to upload photo");
      }
    } catch (error) {
      // console.log("UPLOAD_ERROR ",error)
      setLoading(false);
      // toast.error("Upload failed");
    }
  };

  const handleCancel = () => {
    setPreviewImage(initialImage);
    setImageFile(null);
    setShowOverlay(false);
  };

  const renderImage = () => (
    <div
      className={`relative group ${shape === "circle" ? "rounded-full" : "rounded-lg"} overflow-hidden cursor-pointer bg-gray-200 flex items-center justify-center ${className}`}
      onClick={openFilePicker}
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      style={{ width: shape === "circle" ? 120 : "100%", height: shape === "circle" ? 120 : 160 }}
      tabIndex={0}
      role="button"
      aria-label={buttonLabel}
    >
      {previewImage ? (
        <img
          src={previewImage}
          alt="Preview"
          className={`object-cover w-full h-full ${shape === "circle" ? "rounded-full" : "rounded-lg"}`}
        />
      ) : (
        <FaCamera className="text-gray-500 text-4xl" />
      )}
      {/* Loading indicator overlay */}
      {loading && (
        <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center z-10">
          <div className="text-white">Uploading...</div>
        </div>
      )}
      <input
        type="file"
        accept="image/*"
        className="hidden"
        ref={fileInputRef}
        onChange={handleFileChange}
        disabled={loading}
      />
    </div>
  );

  return triggerComponent ? (
    React.cloneElement(triggerComponent, { onClick: openFilePicker })
  ) : (
    renderImage()
  );
} 