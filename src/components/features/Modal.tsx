'use client';
import { useModalStore } from '@/lib/stores/modal-store';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import ArcadeGame from './ArcadeGames';
import AboutMe from './AboutMe__legacy';
import MyWorks from './MyWorks';
import { cn } from '@/lib/utils';

const dialogSizeMap: Record<string, string> = {
    arcade: "max-w-[100px]",
    aboutme: "!max-w-2xl !max-h-[90vh] !overflow-y-auto no-scrollbar no-scrollbar-x",
    myworks: "!max-w-4xl",
}

function Modal() {
    const activeModal = useModalStore((state) => state.activeModal);
    const clearModal = useModalStore((state) => state.clearModal);
    
    return (
        <Dialog
            open={!!activeModal}
            onOpenChange={(open) => {
                if (!open) clearModal();
            }}
        >
            <DialogContent 
                className={
                    cn(
                        "bg-sidebar! border-primary shadow-[0_0_40px_rgba(255,107,107,0.98)] transition-all duration-300 max-h-[90vh] overflow-scroll",
                        activeModal ? dialogSizeMap[activeModal] : "",
                        "no-scrollbar no-scrollbar-x"
                    )
                }
                showCloseButton={false}
            >
    
                <DialogHeader className='sr-only'>
                    <DialogTitle className="text-3xl font-bold text-center">
                    TITLE
                    </DialogTitle>
                </DialogHeader> 
    
                {activeModal === 'arcade' && <ArcadeGame />}
                {activeModal === "aboutme" && <AboutMe />}
                {activeModal === 'myworks' && <MyWorks />}
            </DialogContent>
        </Dialog>
    )
}

export default Modal