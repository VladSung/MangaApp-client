'use client';
import { PropsWithChildren } from 'react';
import { DndProvider as DndProviderInstance } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
// import { TouchBackend } from 'react-dnd-touch-backend';

export const DndProvider = ({ children }: PropsWithChildren) => {
    return <DndProviderInstance backend={HTML5Backend}>{children}</DndProviderInstance>;
};
