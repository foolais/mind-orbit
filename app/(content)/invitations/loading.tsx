import { FaSpinner } from "react-icons/fa6";

const Loading = () => {
  return (
    <div className="flex items-center justify-center">
      <FaSpinner className="ml-2 h-4 w-4 animate-spin" />
    </div>
  );
};

export default Loading;
