import { Box, MantineSize } from "@mantine/core"
import Image, { ImageProps } from "next/image"
import { ElementType } from "react"

type Props = Omit<ImageProps, 'src' | 'alt' | 'height' | 'width'> & {
    src?: string | null
    alt?: string | null
    size?: MantineSize | number

    component?: 'span'
}

const sizes = {
    xs: 16,
    sm: 26,
    md: 38,
    lg: 56,
    xl: 84
}

const getSize = (size?: MantineSize | number) => {
    if (!size) {
        return sizes.md
    }

    if (typeof size === 'number') {
        return size;
    }

    return sizes[size]
}


export const Avatar = (props: Props) => {
    const { src, alt, component, size, ...restProps } = props

    const gettedSize = getSize(size)

    return <Box component={component} style={{ height: gettedSize, width: gettedSize, minWidth: gettedSize, borderRadius: '50%', overflow: "hidden" }}>
        <Image
            {...restProps}
            loading='lazy'
            src={src || '/assets/avatar.png'}
            height={gettedSize}
            width={gettedSize}
            alt={alt || ''}
        />
    </Box>
}
