import React from 'react'
import { Button } from '../ui/button'
import { BotMessageSquare } from 'lucide-react'

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

const ChatWithMe = () => {
    return (
        <Dialog >
            <DialogTrigger asChild>
                <div className="mt-12">
                    <Button variant="ghost" className="text-xl p-0 hover:bg-transparent hover:text-primary group cursor-pointer">
                        <span>Chat with me</span>
                        <BotMessageSquare  className="ml-1 inline-block h-4 w-4 shrink-0 transition-transform group-hover:-translate-y-1 group-hover:translate-x-1 motion-reduce:transition-none" />
                    </Button>
                </div>
            </DialogTrigger>
            <DialogContent 
                onInteractOutside={(e) => e.preventDefault()}
                // onEscapeKeyDown={(e) => e.preventDefault()}
            >
                <DialogHeader>
                    <DialogTitle>Are you absolutely sure?</DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently delete your account
                        and remove your data from our servers.
                    </DialogDescription>
                </DialogHeader>
            </DialogContent>
        </Dialog>
        
    )
}

export default ChatWithMe