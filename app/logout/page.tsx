"use client"
import { deleteCookie } from "cookies-next";
import { useRouter } from "next/navigation";

export default function Logout(){
  const router = useRouter();
  deleteCookie('session');
  router.push('');
  return;
}
