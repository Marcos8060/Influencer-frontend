"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { useSelector } from "react-redux";
import Slide from "@mui/material/Slide";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import { MdEdit } from "react-icons/md";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="left" ref={ref} {...props} />;
});
export default function EditBioModal({ data }) {
  const [loading, setLoading] = useState(false);

  const auth = useAuth();


  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
  };

  return (
    <React.Fragment>
      <div onClick={handleClickOpen} className="border border-secondary rounded-3xl px-3 py-1 flex items-center gap-2 cursor-pointer">
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
        <DialogContent >
        <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <TextAreaComponent />
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