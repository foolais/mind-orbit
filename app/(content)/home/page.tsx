import AlertSelectProjectButton from "@/components/button/alert-select-project-button";

interface HomePageProps {
  searchParams: { project?: string };
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { project } = await searchParams;

  return (
    <div>
      <div className="grid items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-wide">Home Page</h2>
        <span className="text-muted-foreground text-sm">
          View all of your desks here
        </span>
      </div>
      {!project ? <AlertSelectProjectButton /> : <div></div>}
    </div>
  );
};

export default HomePage;
