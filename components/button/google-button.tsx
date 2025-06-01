import { signIn } from "@/auth";
import { Button } from "../ui/button";
import { FaGoogle } from "react-icons/fa6";

const GoogleButton = () => {
  return (
    <Button
      className="px-8 py-6 cursor-pointer w-full gap-2"
      variant={"outline"}
      onClick={async () => {
        "use server";
        await signIn("google", { redirectTo: "/home" });
      }}
    >
      <FaGoogle className="size-5" />
      <span className="font-medium">Sign in with Google</span>
    </Button>
  );
};

export default GoogleButton;
