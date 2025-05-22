import GoogleButton from "@/components/button/google-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Auth",
};

const AuthPages = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <Card className="w-[350px]">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-semibold">
            Welcome to Mind Orbit
          </CardTitle>
          <CardDescription>
            Stay organized, focused, and aligned — all in one orbit.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <GoogleButton />
        </CardContent>
      </Card>
    </div>
  );
};

export default AuthPages;
