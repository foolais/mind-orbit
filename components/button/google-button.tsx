import { signIn } from "@/auth";
import { Button } from "../ui/button";
import Google from "@/public/google.svg";
import Image from "next/image";

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
      <Image src={Google} alt="Google" width={24} height={24} />
      <span className="font-medium">Sign in with Google</span>
    </Button>
  );
};

export default GoogleButton;
