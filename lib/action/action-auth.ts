"use server";

import { signOut } from "@/auth";

export const logoutCredentials = async () => {
  try {
    await signOut();
  } catch (error) {
    console.log(error);
  }
};
