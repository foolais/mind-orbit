import { auth } from "@/auth";

const DashboardPage = async () => {
  const session = await auth();

  return (
    <div>
      Dashboard Page
      {session?.user?.name}
    </div>
  );
};

export default DashboardPage;
