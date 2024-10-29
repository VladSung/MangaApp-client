'use client'
import Image from 'next/image'

import classes from './styles.module.css'

export const ChapterImage = ({ index, path, }: { index: number, path?: string | null }) => {

    return (
        <Image
            fill
            data-loaded='false'
            onLoad={event => {
                event.currentTarget.dataset.loaded = 'true'
            }}
            className={classes.image}
            priority={index === 0 || index === 1}
            sizes='(max-width: 928px) 100vw, 928px'
            quality={95}
            src={path || ''}
            alt={''}
        />
    )
}
