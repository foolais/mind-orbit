import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import DeleteButton from "../button/delete-button";

interface DialogFormProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: React.ReactNode;
  canDelete?: boolean;
  onDelete?: () => void;
  text?: string;
}

const DialogForm = ({
  isOpen,
  onClose,
  title,
  description,
  children,
  canDelete = false,
  onDelete = () => {},
  text,
}: DialogFormProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
      >
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3">
            {title}
            {canDelete && text && (
              <DeleteButton onDelete={onDelete} text={text} />
            )}
          </DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default DialogForm;
