import { auth } from "@/auth";
import SidebarButton from "@/components/button/sidebar-button";
import SelectProject from "@/components/input/select-project";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div className="p-4">
      <div>
        <div className="flex items-center space-x-3">
          <SidebarButton />
          <h1 className="text-2xl font-semibold">Mind Orbit</h1>
          <SelectProject />
        </div>
      </div>
      <div className="my-4">
        Dashboard Page
        {session?.user?.id}
        {session?.user?.name}
        {session?.user?.email}
      </div>
    </div>
  );
};

export default DashboardPage;
