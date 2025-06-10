import { FaSpinner } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <FaSpinner className="size-14 text-primary animate-spin" />
    </div>
  );
};

export default Loading;
