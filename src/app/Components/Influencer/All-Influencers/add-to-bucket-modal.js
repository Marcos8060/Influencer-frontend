"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch, useSelector } from "react-redux";
import DropdownComponent from "../../SharedComponents/DropDownComponent";
import { moveToBucket } from "@/redux/services/influencer/bucket";
import Slide from "@mui/material/Slide";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import BucketListDialog from "../../Brand/BucketList/bucket-list-dialog";

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
export default function AddToBucketListModal({ data }) {
  const { bucketList } = useSelector((store) => store.bucket);
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
      setLoading(false);
      return;
    }
    try {
      const influencerIds = Array.isArray(data)
        ? data.map((influencer) => String(influencer.influencerId))
        : [String(data.influencerId)];

      const payload = {
        toBrandBucketList: selectedBucket.id,
        influencerIds,
      };

      const response = await moveToBucket(auth, payload);
      if (response.status === 200) {
        toast.success("Move to bucket successfully");
        dispatch(fetchAllBuckets(auth));
        setOpen(false);
      }
    } catch (error) {
      toast.error(error.response.data.errorMessage[0])
    } finally {
      setLoading(false);
    }
  };

  return (
    <React.Fragment>
      <button
        className={`${
          Array.isArray(data) && data.length > 0
            ? "bg-gradient-to-r from-primary to-secondary text-white rounded-3xl text-xs px-3 py-3"
            : "border border-secondary text-xs px-3 py-2 rounded text-color font-semibold"
        } `}
        icon="pi pi-external-link"
        onClick={handleClickOpen}
      >
        Add To Bucket
      </button>
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
            <DropdownComponent
              options={bucketList}
              value={selectedBucket}
              onChange={setSelectedBucket}
              placeholder="Select a Bucket"
            />
            <footer className="flex items-center justify-between gap-4">
              <BucketListDialog />
              <ButtonComponent
                type="submit"
                label={loading ? "Processing..." : "Add To Bucket"}
                disabled={loading}
              />
            </footer>
          </form>
        </DialogContent>
      </Dialog>
    </React.Fragment>
  );
}
