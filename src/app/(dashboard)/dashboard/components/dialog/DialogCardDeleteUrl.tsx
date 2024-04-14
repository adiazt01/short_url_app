import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { DropdownMenuItem } from "@/components/ui/dropdown-menu"
import { Trash } from "lucide-react"

export function DialogCardDeleteUrl({id}:{
    id: string
}) {

    const handleDelete = () => {
        console.log('Delete URL with ID:', id)
    }

    return (
        <Dialog>
            <DialogTrigger>
              <DropdownMenuItem
                className="cursor-pointer"
                onSelect={(e) => e.preventDefault()}
              >
                <Trash className="w-5 h-5 mr-4" />
                Delete
              </DropdownMenuItem>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Are you sure you want to delete this URL?
                </DialogTitle>
                <DialogDescription>
                  This action is irreversible. Please confirm your action.
                </DialogDescription>
                <DialogFooter className="flex flex-row items-center justify-center w-full gap-4 pt-4">
                  <Button variant="outline">Cancel</Button>
                  <Button onClick={() => handleDelete()} size="sm" variant="destructive">
                    Delete
                  </Button>
                </DialogFooter>
              </DialogHeader>
            </DialogContent>
          </Dialog>
    )
}