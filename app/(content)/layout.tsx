import SidebarButton from "@/components/button/sidebar-button";
import SelectProject from "@/components/input/select-project";
import UserAvatar from "@/components/ui/user-avatar";

const ContentLayout = () => {
  return (
    <div className="p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <SidebarButton />
          <h1 className="text-2xl font-semibold">Mind Orbit</h1>
          <SelectProject />
        </div>
        <UserAvatar />
      </div>
    </div>
  );
};

export default ContentLayout;
