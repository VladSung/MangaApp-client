/** @jsxImportSource @emotion/react */
import { ChangeEventHandler, useCallback} from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Typography, Card, CardActionArea, CardContent, CardMedia, CardProps, ImageList, ImageListItem} from "@mui/material";
import {css} from '@emotion/react'
import { forEach } from "lodash-es";

const cssCard = css`
    position: relative;

    button{
      height:100%;
    }
`

const cssMedia = css`
  width:100%;
  height:100%; 
`

const cssCardContent = (theme: any)=> css`
    position: absolute;
    display: flex;
   ${cssMedia}
    top: 0;
    text-align: center;
    align-items: center;
    border-radius: 4px;
    border: 3px dashed;
    border-color: ${theme.palette.primary.main};

    span {
        color:  ${theme.palette.primary.main};
        font-weight: 600;
    }

    &.dropping {
        background: ${theme.extPalette.background.over};
    }
`
const cssCardInput = css`
    position: absolute;
   ${cssMedia}
    left:0;
    cursor: pointer;
    opacity: 0;
`

interface Props extends CardProps{
  droppedFiles: FileList | null
  setDroppedFiles:(file:FileList)=> void
}

const ManyFilesUpload = ({droppedFiles, setDroppedFiles, ...props}:Props) => {

  const onDrop = useCallback(
    (file: FileList) => {
      if (file) {
        setDroppedFiles(file)
      }
    },
    [setDroppedFiles],
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: FileList }) {
        if (onDrop) {
          if(item.files)  onDrop(item.files);
        }
      },
      canDrop() {
        return true
      },
      collect: (monitor: DropTargetMonitor) => {
        return {
          isOver: monitor.isOver(),
          canDrop: monitor.canDrop()
        }
      },
    }),
  )

  const handleChange:ChangeEventHandler<HTMLInputElement> = (e) => {
    const files = e?.target?.files;
    if(files) onDrop(files);
  }

  
  const Previews = droppedFiles && Array.from(droppedFiles as unknown as File[]).map(item => (
    <ImageListItem key={item?.name+item?.size}>
      <img
        height={64}
        src={`${URL.createObjectURL(item)}`}
        alt={item?.name}
        loading="lazy"
      />
    </ImageListItem>
  ));

  // const imageURL = droppedFiles ? URL.createObjectURL(droppedFiles): '';

  const Content = () => {
    // текст по умолчанию если изображение отсутствует
    if (!droppedFiles && !canDrop) return  <Typography variant={'subtitle2'}>Нажмите или переташите сюда изображения, для загрузки </Typography>;

    // перетаскиваемый файл находится над областью загрузки 
    if (isOver) {
      return <Typography  variant={'subtitle2'} component={'span'}>Отпустите, чтобы загрузить изображение</Typography>;
    }

    // перетаскиваемый файл находится за областью загрузки 
    if (canDrop) {
      if (!isOver) return <Typography variant={'subtitle2'} component={'span'}>Перетащите сюда изображение</Typography>;
    }

    return <></>
  }

  return (
      <Card sx={{width: 240, height: 128}} {...props} ref={drop} css={cssCard}>
        <CardActionArea>
          <ImageList variant="masonry" cols={3} gap={8}>
            {Previews || ''}
          </ImageList>
          <CardContent css={cssCardContent} className={canDrop ? 'dropping' :''}>
            <input multiple title={droppedFiles ? '' : 'Файлы не выбран'} onChange={handleChange} css={cssCardInput} type='file'/>
            <Content />
          </CardContent>
        </CardActionArea>
      </Card>    
  )
};

export default ManyFilesUpload