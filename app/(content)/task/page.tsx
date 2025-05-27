import DialogTask from "@/components/dialog/dialog-create-task";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import React from "react";

const TaskPage = () => {
  return (
    <div>
      <div className="grid items-center justify-between mb-4">
        <h2 className="text-xl font-semibold tracking-wide">Task</h2>
        <span className="text-muted-foreground text-sm">
          View all of your tasks here
        </span>
      </div>
      <div className="border p-4 rounded-sm">
        <Tabs defaultValue="table">
          <div className="flex items-center justify-between mb-2">
            <TabsList className="w-[200px] sm:w-[300px]">
              <TabsTrigger value="table">Table</TabsTrigger>
              <TabsTrigger value="kanban">Kanban</TabsTrigger>
            </TabsList>
            <DialogTask type="CREATE" />
          </div>
          <div className="border border-dashed" />
          <Button variant="outline" className="my-1">
            Filter
          </Button>
          <div className="border border-dashed" />
          <TabsContent value="table">Table</TabsContent>
          <TabsContent value="kanban">Kanban</TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default TaskPage;
