"use client";
import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import DropdownComponent from "../../SharedComponents/DropDownComponent";
import ButtonComponent from "../../SharedComponents/ButtonComponent";
import { useSelector } from "react-redux";
import toast from "react-hot-toast";
import { moveToBucket } from "@/redux/services/influencer/bucket";
import { addPostToCampaign } from "@/redux/services/campaign";
import { useAuth } from "@/assets/hooks/use-auth";

export default function PostToCampaignDialog({ post }) {
  const [open, setOpen] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState(null);
  const [loading, setLoading] = useState(false);
  const { allCampaigns } = useSelector((store) => store.campaign);
  const auth = useAuth();

  // 👇 format campaign data for dropdown
  const campaignOptions =
    Array.isArray(allCampaigns) && allCampaigns?.map((campaign) => ({
      name: campaign.title,
      value: campaign.id,
    })) || [];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!selectedCampaign) {
      toast.error("Please select a campaign");
      setLoading(false);
      return;
    }

    try {
      const payload = {
        posts: [
          {
            socialMediaId: post.id,
            caption: post.caption,
            mediaProductType: post.mediaProductType,
            permalink: post.permalink,
            isCommentEnabled: post.isCommentEnabled,
            isSharedToFeed: post.isSharedToFeed,
            likeCount: post.likeCount,
            timestamp: post.timestamp,
            ownerName: post.ownerName,
            ownerProfilePicture: post.profilePictureUrl,
            mediaChildren: post.mediaUrls,
            platformName: "Instagram",
          },
        ],
        campaign: selectedCampaign,
      };

      const response = await addPostToCampaign(auth, payload);
      if (response.status === 200) {
        console.log("ADD_TO_CAMPAIGN ", response);
        toast.success("Post added successfully");
        setOpen(false);
      } else {
        toast.error("Something went wrong");
      }
    } catch (error) {
      toast.error(
        error.response?.data?.errorMessage?.[0] || "An error occurred"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <small
        onClick={handleClickOpen}
        className="text-white text-[10px] bg-gradient-to-r from-primary to-secondary px-2 py-1 rounded-3xl"
      >
        + Campaign
      </small>

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth="xs"
        fullWidth
        sx={{ zIndex: 1000 }}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{"Select Campaign"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          </DialogContentText>
            <form onSubmit={handleSubmit} className="space-y-3 mt-4">
              <DropdownComponent
                options={campaignOptions}
                value={selectedCampaign}
                onChange={setSelectedCampaign}
                placeholder="Select a Campaign"
              />
              <footer className="mt-4">
                <ButtonComponent
                  type="submit"
                  label={loading ? "Processing..." : "Post to Campaign"}
                  disabled={loading}
                />
              </footer>
            </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
