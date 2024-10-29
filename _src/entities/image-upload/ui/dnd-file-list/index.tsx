'use client'
import { DragDropContext, Draggable, Droppable } from '@hello-pangea/dnd';
import { ActionIcon, rem, ScrollArea, Text } from '@mantine/core';
import { FileWithPath } from '@mantine/dropzone';
import { IconGripVertical, IconTrash } from '@tabler/icons-react';
import cx from 'clsx';

import classes from './DndListHandle.module.css';

export function DndFileList({ list, setValue }: { list: FileWithPath[], setValue: (files: FileWithPath[]) => void }) {

    const reorder = (to: number, from: number) => {
        const newList = [...list];
        newList.splice(to, 0, newList.splice(from, 1)[0]);
        console.log(newList, to, from);
        setValue(newList);
    };

    const removeFile = (index: number) => {
        list.splice(index, 1);
        setValue(list);
    };

    const items = list.map((item, index) => (
        <Draggable key={item.name} index={index} draggableId={item.name}>
            {(provided, snapshot) => {
                const url = URL.createObjectURL(item);

                return (
                    <div
                        className={cx(classes.item, {
                            [classes.itemDragging]: snapshot.isDragging,
                        })}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                    >
                        <div
                            {...provided.dragHandleProps}
                            className={classes.dragHandle}
                            style={{ cursor: 'grab' }}
                        >
                            <IconGripVertical style={{ width: rem(20), height: rem(20) }} />
                        </div>
                        <div style={{ width: 32, height: 32, marginRight: 16 }}>
                            <img
                                style={{ objectFit: 'contain', objectPosition: 'center' }}
                                width={32}
                                height={32}
                                src={url}
                                alt=""
                            />
                        </div>
                        <div>
                            <Text>{item.name}</Text>
                        </div>
                        <div style={{ marginLeft: 'auto' }}>
                            <ActionIcon
                                bg="red"
                                aria-label="remove"
                                onClick={() => {
                                    URL.revokeObjectURL(url);
                                    removeFile(index);
                                }}
                            >
                                <IconTrash size={18} />
                            </ActionIcon>
                        </div>
                    </div>
                );
            }}
        </Draggable>
    ));

    return (
        <DragDropContext
            onDragEnd={({ destination, source }) => reorder(destination?.index || 0, source.index)}
        >
            <Droppable droppableId="dnd-list" direction="vertical">
                {(provided) => (
                    <div ref={provided.innerRef}>
                        {items} {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    );
}
