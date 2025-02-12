"use client";
import { signOut } from "next-auth/react";

const SignOutButton = () => {
  const handleSignOut = async () => {
    await signOut();
    window.location.reload();
  };

  return (
    <button onClick={handleSignOut}>Odhlásit se</button>
  );
};

export default SignOutButton;