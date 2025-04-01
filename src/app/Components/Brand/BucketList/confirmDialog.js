"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import { deleteBucketList } from "@/redux/services/auth/brand/bucketList";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { MdDelete } from "react-icons/md";
import { useDispatch } from "react-redux";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import Slide from "@mui/material/Slide";


const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function ConfirmDialog({ data }) {
  const [open, setOpen] = useState(false);
  const [loading,setLoading] = useState(false);
  const dispatch = useDispatch();
  const auth = useAuth();


  const handleClose = () => {
    setOpen(false);
  };

  const deleteBucket = async(id,auth) =>{
    try {
        setLoading(true);
        await deleteBucketList(id,auth)
        toast.success('Bucket deleted successfully')
        dispatch(fetchAllBuckets(auth));
        setOpen(false);
        setLoading(false);
    } catch (error) {
      toast.error(error.response.data.errorMessage[0])
    }finally{
        setLoading(false);
    }
  }
  return (
    <div className="card flex justify-content-center">
      <MdDelete className="text-red cursor-pointer" onClick={() => setOpen(true)} />
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
        <div className="space-y-4">
            <p className="text-center">Are you sure you want to delete?</p>
            <div className="flex items-center justify-center gap-4">
                <button onClick={() => deleteBucket(data.id,auth)} className="bg-green text-white rounded px-4 py-2 text-xs">{loading ? 'Deleting' : 'Confirm'}</button>
                <button onClick={() => setOpen(false)} className="bg-red text-white rounded px-4 py-2 text-xs">Cancel</button>
            </div>
        </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}