import AlertSelectProjectButton from "@/components/button/alert-select-project-button";

interface InvitationPageProps {
  searchParams: { project?: string };
}

const InvitationPage = async ({ searchParams }: InvitationPageProps) => {
  const { project } = await searchParams;

  return (
    <div>
      <div className="grid items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-wide">Invitation Page</h2>
        <span className="text-muted-foreground text-sm">
          View all of your invitations project
        </span>
      </div>
      {!project ? <AlertSelectProjectButton /> : <div></div>}
    </div>
  );
};

export default InvitationPage;
