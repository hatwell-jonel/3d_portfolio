'use client';
import React, { useState } from "react";
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from "@/components/ui/dialog"
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { games } from "@/lib/data";

export default function ArcadeGame() {
    const [selectedGame, setSelectedGame] = useState<string | null>(null);
    const activeGame = games.find(g => g.value === selectedGame)
    if (!selectedGame) {
        return (
        <>
            <div>
                <div className="text-3xl font-bold text-center">
                    <span className='bg-linear-to-b from-purple-500 via-pink-500 to-red-500 bg-clip-text text-transparent'>ARCADE</span> 
                </div>
                <div className="text-foreground text-center">Choose your game and let the fun begin!</div>
            </div>
            <ScrollArea className="h-100 w-full pt-2">
                <div>
                    {games.map((game) => (
                    <React.Fragment key={game.name}>
                        <div
                            onClick={() => setSelectedGame(game.value)}
                            className={
                                cn(
                                    "group relative overflow-hidden p-4 transition-all duration-300 cursor-pointer",
                                    "hover:scale-[1.01] hover:shadow-lg hover:border-b-4 hover:border-[#ff6b6b]"
                                )
                            }
                        >
                        <div className="flex items-start gap-4">
                            <div className="text-4xl transition-transform duration-300 group-hover:scale-110">{game.image}</div>
                            <div className="flex-1">
                            <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-primary transition-colors">
                                {game.name}
                            </h3>
                            <p className="text-sm text-gray-400 line-clamp-2">{game.description}</p>
                            </div>
                        </div>
                        <div className="absolute inset-0 bg-linear-to-r from-purple-500/0 via-pink-500/0 to-red-500/0 group-hover:from-purple-500/5 group-hover:via-pink-500/5 group-hover:to-red-500/5 transition-all duration-300 pointer-events-none" />
                        </div>
                    </React.Fragment>
                    ))}
                </div>
            </ScrollArea>
        </>
        );
    }
    
    return (
        <Dialog 
            open={!!selectedGame} 
            onOpenChange={() => setSelectedGame(null)}

        >
            <DialogContent 
                className="bg-gray-900 border-[#ff6b6b] shadow-[0_0_40px_rgba(255,107,107,0.98)]"
                showCloseButton={false}
                onInteractOutside={(e) => e.preventDefault()}
            >

                <DialogTitle className='sr-only'>
                {activeGame?.name ?? 'Arcade Game'}
                </DialogTitle>


                {/* Game Area */}
                <div className="relative h-full w-full overflow-hidden">
                    {activeGame?.component}
                </div>

                {/* Footer */}
                <DialogFooter className="border-t pt-2">
                <button
                    onClick={() => setSelectedGame(null)}
                    className="bg-[#ff6b35] px-4 py-2 text-sm font-bold text-white hover:opacity-90 transition cursor-pointer"
                >
                    ← Back
                </button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}