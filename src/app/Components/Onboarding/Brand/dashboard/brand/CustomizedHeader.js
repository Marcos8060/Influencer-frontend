"use client";
import React, { useContext } from "react";
import { BsChevronDown } from "react-icons/bs";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import { authContext } from "@/assets/context/use-context";
import Link from "next/link";

const BrandCustomizedHeader = () => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const { logoutBrand, logoutInfluencer, user } = useContext(authContext);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    const brandToken = localStorage.getItem("brand_token");
    const influencerToken = localStorage.getItem("influencer_token");

    if (brandToken) {
      logoutBrand();
    } else if (influencerToken) {
      logoutInfluencer();
    }
    handleClose();
  };

  return (
    <section className="h-[10vh] py-6 px-6 flex items-center justify-between">
      <div>
        <h1 className="font-bold text-2xl">Welcome <span className="font-light">{user?.firstName}</span></h1>
      </div>
      <div>
        <div className="flex items-center gap-2">
          <span className=" text-sm">{user?.firstName}</span>
          <BsChevronDown onClick={handleClick} className=" cursor-pointer" />
        </div>
        <Menu
          id="basic-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          MenuListProps={{
            "aria-labelledby": "basic-button",
          }}
        >
          {/* <MenuItem>
            <Link className="text-sm" href="/profile">Profile</Link>
          </MenuItem> */}
          <MenuItem onClick={handleLogout}>
            <p className="text-sm">Logout</p>
          </MenuItem>
        </Menu>
      </div>
    </section>
  );
};

export default BrandCustomizedHeader;