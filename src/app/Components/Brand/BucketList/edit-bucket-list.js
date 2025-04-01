"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import { editBucketList } from "@/redux/services/auth/brand/bucketList";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { MdModeEditOutline } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import Slide from "@mui/material/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function EditBucketListDialog({ data }) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: data.name,
    description: data.description,
  });
  const auth = useAuth();

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
      await editBucketList(auth, data.id, formData);
      setFormData({
        name: "",
        description: "",
      });
      toast.success("Bucket List edited successfully");
      dispatch(fetchAllBuckets(auth));
      setOpen(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage[0])
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="card flex justify-content-center">
      <MdModeEditOutline
        onClick={() => setOpen(true)}
        className="text-green cursor-pointer"
      />
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
              label={loading ? "Editing..." : "Edit Bucket List"}
              disabled={loading}
            />
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
