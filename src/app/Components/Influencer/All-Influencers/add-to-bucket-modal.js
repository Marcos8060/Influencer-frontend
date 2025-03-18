"use client";
import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import { createBucketList } from "@/redux/services/auth/brand/bucketList";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import DropdownComponent from "../../SharedComponents/DropDownComponent";
import { moveToBucket } from "@/redux/services/influencer/bucket";

export default function AddToBucketListModal() {
  const { bucketList } = useSelector((store) => store.bucket);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const auth = useAuth();

  const [selectedBucket, setSelectedBucket] = useState(null);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedBucket) {
      toast.error("Please select a bucket");
      return;
    }
    try {
      const payload = {
        toBrandBucketList: selectedBucket.id,
        influencerIds: [String(data.userId)],
      };
      const response = await moveToBucket(auth, payload);
      if (response.status === 200) {
        toast.success("Move to bucket successfully");
        setOpen(false);
      }
      console.log("MOVE_RESPONSE ", response);
    } catch (error) {
      console.log("ERROR ", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <button
        className="border border-primary text-xs px-3 py-2 rounded"
        icon="pi pi-external-link"
        onClick={handleClickOpen}
      >
        Add To Bucket List
      </button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {"Use Google's location service?"}
        </DialogTitle>
        <DialogContent>
          <form onSubmit={handleSubmit} className="space-y-3 mt-4">
            <DropdownComponent
              options={bucketList}
              value={selectedBucket}
              onChange={setSelectedBucket}
              placeholder="Select a Bucket"
            />
            <ButtonComponent
              type="submit"
              label={loading ? "Processing..." : "Add To Bucket"}
              disabled={loading}
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleClose} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
