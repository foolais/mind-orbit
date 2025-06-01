import AlertSelectProjectButton from "@/components/button/alert-select-project-button";

interface ProfilePageProps {
  searchParams: { project?: string };
}

const ProfilePage = async ({ searchParams }: ProfilePageProps) => {
  const { project } = await searchParams;

  return (
    <div>
      <div className="grid items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-wide">Profile Page</h2>
        <span className="text-muted-foreground text-sm">View your profile</span>
      </div>
      {!project ? <AlertSelectProjectButton /> : <div></div>}
    </div>
  );
};

export default ProfilePage;
