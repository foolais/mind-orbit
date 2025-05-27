import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { PriorityOptions, StatusOptions } from "@/lib/data";
import Badge from "../ui/badge";
import { Table, TableBody, TableCell, TableRow } from "../ui/table";
import { formatDate } from "@/lib/utils";

const TableTask = () => {
  return (
    <Accordion type="multiple" className="w-full">
      {StatusOptions.map((status) => (
        <AccordionItem key={status.value} value={status.value} className="pb-4">
          <AccordionTrigger className="px-4 hover:no-underline flex items-center cursor-pointer">
            <div className="flex items-center gap-3 w-full">
              <Badge option={status} />
              <span className="ml-auto text-xs text-muted-foreground">
                {" "}
                0 Task
              </span>
            </div>
          </AccordionTrigger>
          <AccordionContent className="px-4 py-2">
            <Table>
              <TableBody>
                {Array.from({ length: 3 }).map((_, index) => (
                  <TableRow
                    key={index}
                    className="cursor-pointer hover:bg-muted"
                  >
                    <TableCell className="font-medium max-w-[200px] truncate md:w-auto">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit.
                      Provident odio vel quisquam asperiores laborum commodi
                      voluptates ipsa pariatur quo iste!
                    </TableCell>
                    <TableCell className="hidden md:table-cell max-w-[200px] truncate">
                      Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                      At consequuntur veritatis a amet laborum. Tenetur
                      blanditiis nisi numquam ratione sit.
                    </TableCell>
                    <TableCell className="hidden md:table-cell font-medium">
                      {formatDate(new Date())}
                    </TableCell>
                    <TableCell className="text-right w-[100px]">
                      <Badge option={PriorityOptions[1]} />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
};

export default TableTask;
