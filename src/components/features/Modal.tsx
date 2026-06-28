'use client';
import type { CSSProperties } from 'react';
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

const modalStyles: Record<string, CSSProperties> = {
    arcade: {
        backgroundColor: 'var(--sidebar)',
        maxWidth: '100px',
    },
    aboutme: {
        backgroundColor: 'var(--sidebar)',
        maxWidth: '42rem',
        maxHeight: '90vh',
        overflowY: 'auto',
    },
    myworks: {
        backgroundColor: 'var(--sidebar)',
        maxWidth: '56rem',
    },
};

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
                style={activeModal ? modalStyles[activeModal] : undefined}
                className={cn(
                    "border-primary shadow-[0_0_40px_rgba(255,107,107,0.98)] transition-all duration-300 overflow-scroll",
                    "no-scrollbar no-scrollbar-x"
                )}
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
