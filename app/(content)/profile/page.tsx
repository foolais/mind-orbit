import AlertSelectProjectButton from "@/components/button/alert-select-project-button";

interface ProfilePageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

const ProfilePage = async ({ searchParams }: ProfilePageProps) => {
  const { project } = await searchParams;

  return (
    <div>
      <div className="grid items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-wide">Profile Page</h2>
        <span className="text-muted-foreground text-sm">View your profile</span>
      </div>
      {!project ? (
        <AlertSelectProjectButton />
      ) : (
        <div className="flex items-center justify-center  mt-10">
          <p className="text-xl  tracking-wider text-muted-foreground">
            Comming soon
          </p>
        </div>
      )}
    </div>
  );
};

export default ProfilePage;
