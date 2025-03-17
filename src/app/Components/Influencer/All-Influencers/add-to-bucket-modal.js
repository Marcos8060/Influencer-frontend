"use client";
import React, { useEffect, useState } from "react";
import { Dialog } from "primereact/dialog";
import InputComponent from "../../SharedComponents/InputComponent";
import TextAreaComponent from "../../SharedComponents/TextAreaComponent";
import { createBucketList } from "@/redux/services/auth/brand/bucketList";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import toast from "react-hot-toast";
import { useAuth } from "@/assets/hooks/use-auth";
import { useDispatch,useSelector } from "react-redux";
import { fetchAllBuckets } from "@/redux/features/bucket-list";
import DropdownComponent from "../../SharedComponents/DropDownComponent";
import { moveToBucket } from "@/redux/services/influencer/bucket";

export default function AddToBucketListModal({ data }) {
  const { bucketList } = useSelector((store) => store.bucket);
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const auth = useAuth();

  const [selectedBucket, setSelectedBucket] = useState(null);
   

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if(!selectedBucket){
        toast.error('Please select a bucket')
        return;
    }
    try {
      const payload = {
        toBrandBucketList: selectedBucket.id,
        influencerIds: [String(data.userId)]
      }
      const response = await moveToBucket(auth,payload)
      if(response.status === 200){
        toast.success('Move to bucket successfully')
        setVisible(false);
      }
      console.log("MOVE_RESPONSE ",response)
    } catch (error) {
      console.log("ERROR ", error);
    } finally {
      setLoading(false);
    }
  };



  return (
    <div className="card flex justify-content-center">
      <button
        className="border border-primary text-xs px-3 py-2 rounded"
        label="Show"
        icon="pi pi-external-link"
        onClick={() => setVisible(true)}
      >
        Add To Bucket List
      </button>
      <Dialog
        header="Select Bucket List"
        visible={visible}
        style={{ width: "40vw" }}
        onHide={() => {
          if (!visible) return;
          setVisible(false);
        }}
      >
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
      </Dialog>
    </div>
  );
}
