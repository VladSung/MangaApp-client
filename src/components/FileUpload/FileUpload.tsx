/** @jsxImportSource @emotion/react */
import { ChangeEventHandler, useEffect, useState, useCallback} from "react";
import { DropTargetMonitor, useDrop } from 'react-dnd';
import { NativeTypes } from 'react-dnd-html5-backend';
import { Typography, Card, CardActionArea, CardContent, CardMedia, CardProps} from "@mui/material";
import {css} from '@emotion/react'
import axios from "axios";
import { Loader } from "../Loader";

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

    span {
        color:  ${theme.palette.primary.main};
        font-weight: 600;
    }

    &.dropping {
        background: ${theme.extPalette.background.over};
        border: 3px dashed;
        border-color: ${theme.palette.primary.main};
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
  droppedFile: File | null
  setDroppedFile:(file:File)=> void
}

const FileUpload = ({droppedFile, setDroppedFile, ...props}:Props) => {

  const onDrop = useCallback(
    (file: File) => {
      if (file) {
        setDroppedFile(file)
      }
    },
    [setDroppedFile],
  );

  const [{ canDrop, isOver }, drop] = useDrop(
    () => ({
      accept: [NativeTypes.FILE],
      drop(item: { files: File[] }) {
        if (onDrop) {
          if(item.files[0])  onDrop(item.files[0]);
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
    if(files) onDrop(files[0]);
  }

  const imageURL = droppedFile ? URL.createObjectURL(droppedFile): '';

  const Content = () => {
    // текст по умолчанию если изображение отсутствует
    if (!imageURL && !canDrop) return <Typography variant={'subtitle2'}>Нажмите или переташите сюда изображение, для загрузки </Typography>;

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
      <Card {...props} ref={drop} css={cssCard}>
        <CardActionArea>
          <CardMedia css={cssMedia} component={'div'} image={imageURL} />
          <CardContent css={cssCardContent} className={canDrop ? 'dropping' :''}>
            <input title={droppedFile ? droppedFile?.name : 'Файл не выбран'} onChange={handleChange} css={cssCardInput} type='file'/>
            <Content />
          </CardContent>
        </CardActionArea>
      </Card>    
  )
};

export default FileUpload