"use client";
import React, { useState } from "react";
import { Dialog } from "primereact/dialog";
import { deleteBucketList } from "@/redux/services/auth/brand/bucketList";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { MdDelete } from "react-icons/md";
import ButtonComponent from "../../SharedComponents/ButtonComponent";

export default function ConfirmDialog({ data }) {
  const [visible, setVisible] = useState(false);
  const [loading,setLoading] = useState(false);
 
  const auth = useAuth();

  const deleteBucket = async(id,auth) =>{
    try {
        setLoading(true);
        await deleteBucketList(id,auth)
        toast.success('Bucket deleted successfully')
        setVisible(false);
        setLoading(false);
    } catch (error) {
        toast.error(error)
    }finally{
        setLoading(false);
    }
  }
  return (
    <div className="card flex justify-content-center">
      <MdDelete className="text-red" onClick={() => setVisible(true)} />
      <Dialog
        visible={visible}
        style={{ width: "25vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
        <div className="space-y-4">
            <p className="text-center">Are you sure you want to delete?</p>
            <div className="flex items-center justify-center gap-4">
                <button label={loading} onClick={() => deleteBucket(data.id,auth)} className="bg-green text-white rounded px-4 py-2 text-xs">{loading ? 'Deleting' : 'Confirm'}</button>
                <button onClick={() => setVisible(false)} className="bg-red text-white rounded px-4 py-2 text-xs">Cancel</button>
            </div>
        </div>
      </Dialog>
    </div>
  );
}
