import AlertSelectProjectButton from "@/components/button/alert-select-project-button";
import { CreateTaskButton } from "@/components/button/task-button";
import FormFilter from "@/components/input/form-filter";
import KanbanTask from "@/components/table/kanban-task";
import TableTask from "@/components/table/table-task";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getTasksByProjectId } from "@/lib/action/action-task";
import { Task, TaskPriority } from "@prisma/client";

interface TaskPageProps {
  searchParams: { project?: string; search?: string; priority?: string };
}

const TaskPage = async ({ searchParams }: TaskPageProps) => {
  const { project, search, priority } = await searchParams;
  const result = (await getTasksByProjectId(
    project || "",
    search,
    priority && ["HIGH", "MEDIUM", "LOW"].includes(priority)
      ? (priority as TaskPriority)
      : "ALL"
  )) as Task[];

  const groupedTasks =
    result &&
    result.length > 0 &&
    result?.reduce((acc, task) => {
      if (!acc[task.status]) {
        acc[task.status] = [];
      }
      acc[task.status].push(task);
      return acc;
    }, {} as Record<string, Task[]>);

  return (
    <div>
      <div className="grid items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-wide">My Task</h2>
        <span className="text-muted-foreground text-sm">
          View all of your tasks here
        </span>
      </div>
      {!project ? (
        <AlertSelectProjectButton />
      ) : (
        <div className="border p-4 rounded-sm">
          <Tabs defaultValue="table">
            <div className="flex items-center justify-between mb-2">
              <TabsList className="w-[200px] sm:w-[300px]">
                <TabsTrigger value="table">Table</TabsTrigger>
                <TabsTrigger value="kanban">Kanban</TabsTrigger>
              </TabsList>
              <CreateTaskButton />
            </div>
            <div className="border border-dashed" />
            <FormFilter />
            <div className="border border-dashed" />
            <TabsContent value="table">
              <TableTask groupedTasks={groupedTasks || {}} />
            </TabsContent>
            <TabsContent value="kanban">
              <KanbanTask groupedTasks={groupedTasks || {}} />
            </TabsContent>
          </Tabs>
        </div>
      )}
    </div>
  );
};

export default TaskPage;
