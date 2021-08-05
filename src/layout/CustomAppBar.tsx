import React from "react";
import { AppBar } from "react-admin";
import CustomUserMenu from "./CustomUserMenu";

const CustomAppBar = (props:any) => <AppBar {...props} userMenu={<CustomUserMenu />} />;

export default CustomAppBar;