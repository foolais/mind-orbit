import { FaTriangleExclamation } from "react-icons/fa6";

const AlertSelectProjectButton = () => {
  return (
    <div className="tracking-wide bg-primary w-max py-1.5 px-4 rounded-sm text-white flex items-center gap-2 break-words whitespace-pre-wrap max-w-4/5 md:max-w-full">
      <FaTriangleExclamation />
      <span>Please select a project or create a new one first!</span>
    </div>
  );
};

export default AlertSelectProjectButton;
