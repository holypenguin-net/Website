"use client"
import { deleteCookie } from "cookies-next";

export default function Logout(){
  deleteCookie('session');
  document.location.href = "/";
  return;
}
