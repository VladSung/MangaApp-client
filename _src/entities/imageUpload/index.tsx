/** @jsxImportSource @emotion/react */
import { Card, CardActionArea, CardContent, CardMedia, CardProps, Typography } from '@mui/material';
import { useCallback, useMemo } from 'react';
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { useFormContext } from 'react-hook-form';

const Content = ({
    isOver,
    canDrop,
    imageProvided,
    recommendedResolution,
}: {
    isOver: boolean;
    canDrop: boolean;
    imageProvided: boolean;
    recommendedResolution: string;
}) => {
    // текст по умолчанию если изображение отсутствует
    if (isOver) {
        return (
            <Typography variant={'subtitle2'} component={'span'}>
                Отпустите изображение для загрузки.
            </Typography>
        );
    }

    // перетаскиваемый файл находится за областью загрузки
    if (canDrop) {
        return (
            <Typography variant={'subtitle2'} component={'span'}>
                Чтобы загрузить изображение, переместите его сюда.
            </Typography>
        );
    }
    if (imageProvided) return <></>;
    return (
        <Typography variant={'subtitle2'} component={'span'}>
            Для загрузки изображения, вы можете нажать или переместить его сюда.
            <Typography variant="caption">({recommendedResolution})</Typography>
        </Typography>
    );
};

export const ImageUpload = ({
    recommendedResolution,
    ...properties
}: CardProps & { recommendedResolution: string }) => {
    const { register, setValue, watch } = useFormContext<{ image: FileList }>();

    const imageFile = watch('image')?.[0];
    const onDrop = useCallback(
        (files: FileList) => {
            if (files && files?.[0]?.name) {
                setValue('image', files);
            }
        },
        [setValue]
    );

    const [{ canDrop, isOver }, drop] = useDrop(() => ({
        accept: [NativeTypes.FILE],
        drop(item: { files: FileList }) {
            if (onDrop && item.files?.[0]) {
                onDrop(item.files);
            }
        },
        canDrop() {
            return true;
        },
        collect: (monitor: DropTargetMonitor) => {
            return {
                isOver: monitor.isOver(),
                canDrop: monitor.canDrop(),
            };
        },
    }));

    const Media = useMemo(() => {
        let imageURL = undefined;
        try {
            if (imageFile?.name) imageURL = URL.createObjectURL(imageFile);
        } catch (err) {
            imageURL = undefined;
        }

        return (
            <CardMedia sx={{ width: '100%', height: '100%' }} component={'div'} image={imageURL} />
        );
    }, [imageFile]);

    return (
        <Card
            sx={{
                height: '270px',
                width: '180px',
                position: 'relative',
                ...properties.sx,
            }}
            {...properties}
            ref={drop}
        >
            <CardActionArea sx={{ height: '100%' }}>
                {Media}
                <CardContent
                    sx={{
                        'position': 'absolute',
                        'display': 'flex',
                        'top': 0,
                        'textAlign': 'center',
                        'alignItems': 'center',
                        'borderRadius': '4px',
                        'height': '100%',
                        'width': '100%',

                        'span': {
                            color: (theme) => theme.palette.primary.main,
                            fontWeight: 600,
                        },

                        '&.dropping': {
                            background: (theme) => theme.palette.background.paper,
                            border: '3px dashed',
                            borderColor: (theme) => theme.palette.primary.main,
                        },
                    }}
                    className={canDrop ? 'dropping' : ''}
                >
                    <input
                        {...register('image')}
                        title={imageFile?.name || 'Файл не выбран'}
                        // onChange={handleChange}
                        style={{
                            position: 'absolute',
                            width: '100%',
                            height: '100%',
                            left: 0,
                            cursor: 'pointer',
                            opacity: 0,
                        }}
                        type="file"
                    />
                    <Content
                        isOver={isOver}
                        canDrop={canDrop}
                        recommendedResolution={recommendedResolution}
                        imageProvided={!!imageFile?.name}
                    />
                </CardContent>
            </CardActionArea>
        </Card>
    );
};
