'use client'
import { useRef, useState } from 'react';
import { Group, Text, Button, rem } from '@mantine/core';
import { IconUpload, IconPhoto, IconX } from '@tabler/icons-react';
import { Dropzone, DropzoneFullScreen, IMAGE_MIME_TYPE } from '@mantine/dropzone';

export function Demo() {
    const [active, setActive] = useState(false);
    const ref = useRef(global.window)
    console.log(global.window)
    return (
        <>
            <Group justify="center">
                <Button color={active ? 'red' : 'blue'} onClick={() => setActive((d) => !d)}>
                    {active ? 'Deactivate' : 'Activate'} full screen dropzone
                </Button>
            </Group>
            dropzone
            <DropzoneFullScreen
                active={active}
                ref={ref}
                accept={IMAGE_MIME_TYPE}
                onDrop={(files) => {
                    console.log(files);
                    setActive(false);
                }}
            >
                <Group justify="center" gap="xl" mih={220} style={{ pointerEvents: 'none' }}>
                    <Dropzone.Accept>
                        <IconUpload
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-blue-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Accept>
                    <Dropzone.Reject>
                        <IconX
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-red-6)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Reject>
                    <Dropzone.Idle>
                        <IconPhoto
                            style={{ width: rem(52), height: rem(52), color: 'var(--mantine-color-dimmed)' }}
                            stroke={1.5}
                        />
                    </Dropzone.Idle>

                    <div>
                        <Text size="xl" inline>
                            Drag images here or click to select files
                        </Text>
                        <Text size="sm" c="dimmed" inline mt={7}>
                            Attach as many files as you like, each file should not exceed 5mb
                        </Text>
                    </div>
                </Group>
            </DropzoneFullScreen>
        </>
    );
}