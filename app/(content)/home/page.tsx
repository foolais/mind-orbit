import AlertSelectProjectButton from "@/components/button/alert-select-project-button";
import Badge from "@/components/ui/badge";
import { getProjectById } from "@/lib/action/action-project";
import { PriorityOptions, StatusOptions } from "@/lib/data";
import { cn } from "@/lib/utils";

interface HomePageProps {
  searchParams: Promise<{ [key: string]: string | undefined }>;
}

interface ProjectData {
  name: string;
  id: string;
  description: string | null;
  ownerId: string;
  createdAt: Date;
  updatedAt: Date;
  members: {
    id: string;
    user: {
      id: string;
      name: string;
    };
    role: string;
  }[];
  tasks: {
    id: string;
    title: string;
    priority: string;
    status: string;
    dueDate: Date;
  }[];
}

const HomePage = async ({ searchParams }: HomePageProps) => {
  const { project } = await searchParams;

  const data = (await getProjectById(project || "")) as ProjectData;

  const getTaskStatusColor = (status: string) => {
    const color = StatusOptions.find(
      (option) => option.value === status
    )?.color;
    return color;
  };

  return (
    <div>
      <div className="grid items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-wide">Home Page</h2>
        <span className="text-muted-foreground text-sm">
          View all of your desks here
        </span>
      </div>
      {!project ? (
        <AlertSelectProjectButton />
      ) : (
        <div className="border rounded-md p-4 max-w-2xl">
          <div className="flex items-center gap-2 mb-2">
            Project:
            <h2 className="bg-primary w-max py-1 px-4 rounded-sm text-white">
              {data?.name}
            </h2>
          </div>
          <p className="text-muted-foreground text-sm">{data?.description}</p>
          <div className="border border-dashed mb-4 mt-2" />
          <div>
            <span className="font-semibold">List Members:</span>
            {data?.members &&
              data?.members?.map((member) => (
                <div
                  key={member.user.id}
                  className="flex items-center gap-2 bg-muted p-2 rounded-md my-2 w-max capitalize"
                >
                  <div className="size-4 bg-primary rounded-full" />
                  <h3 className="text-sm">{member.user.name}</h3>
                </div>
              ))}
          </div>
          <div className="border border-dashed my-4" />
          <div>
            <span className="font-semibold">Latest Tasks:</span>
            {data?.tasks && data?.tasks.length > 0 ? (
              data?.tasks?.map((task) => (
                <div
                  key={task.id}
                  className="flex items-center gap-2 bg-muted p-2 rounded-md my-2 w-max capitalize"
                >
                  <div
                    className={cn("size-4 rounded-full")}
                    style={{
                      backgroundColor: getTaskStatusColor(task.status),
                    }}
                  />
                  <h3 className="text-sm truncate">{task.title}</h3>
                  <div className="hidden sm:block">
                    <Badge
                      option={
                        PriorityOptions.find(
                          (option) => option.value === task.priority
                        ) || PriorityOptions[0]
                      }
                    />
                  </div>
                </div>
              ))
            ) : (
              <p className="text-muted-foreground text-sm">No tasks found</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;
