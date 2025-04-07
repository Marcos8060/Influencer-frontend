import * as React from "react";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { IoLogoTiktok } from "react-icons/io5";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { useAuth } from "@/assets/hooks/use-auth";
import { getTiktokResponse } from "@/redux/features/socials";
import { useDispatch, useSelector } from "react-redux";
import { setAuthCookie } from "@/assets/utils/cookies";

export default function ConnectToSocialsMenu() {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const auth = useAuth();
  const handleTiktok = async () => {
    try {
      setAuthCookie(auth);
      const response = await dispatch(getTiktokResponse(auth));
      const authUrl = response.message;

        // Redirect user to TikTok's authorization page
        window.location.href = authUrl;
        sessionStorage.setItem('tmp_tiktok_auth', auth);
    } catch (error) {
      console.error("TikTok auth failed:", error);
    }
  };

  return (
    <div>
      <button
        id="basic-button"
        aria-controls={open ? "basic-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={open ? "true" : undefined}
        onClick={handleClick}
        className="bg-gradient-to-r from-primary to-secondary text-white px-4 py-2 text-xs rounded"
      >
        Connect To Socials
      </button>

      <Menu
        id="basic-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        MenuListProps={{
          "aria-labelledby": "basic-button",
        }}
      >
        <MenuItem onClick={handleTiktok}>
          <div className="flex items-center gap-2">
            <IoLogoTiktok className="text-sm" />
            Tiktok
          </div>
        </MenuItem>
        <MenuItem>
          <div className="flex items-center gap-2">
            <FaInstagram />
            Instagram
          </div>
        </MenuItem>
        <MenuItem>
          <div className="flex items-center gap-2">
            <FaXTwitter />
            platform
          </div>
        </MenuItem>
      </Menu>
    </div>
  );
}
