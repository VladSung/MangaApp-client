import Image, { ImageProps } from "next/image"
import { AvatarProps, Avatar as MantineAvatar } from "@mantine/core"
type Props = Omit<ImageProps, 'src' | 'alt' | 'height' | 'width'> & {
    src?: string | null
    alt?: string | null
    size?: keyof (typeof sizes) | number

    component?: 'span'
} & {
    variant?: AvatarProps['variant'],
    radius?: AvatarProps['radius']
}

const sizes = {
    xs: 16,
    sm: 26,
    md: 38,
    lg: 56,
    "2lg": 56 * 2,
    xl: 84,
    "2xl": 84 * 2
}

const getSize = (size?: keyof (typeof sizes) | number) => {
    if (!size) {
        return sizes.md
    }

    if (typeof size === 'number') {
        return size;
    }

    return sizes[size]
}


export const Avatar = (props: Props) => {
    const { src, alt, component, size, variant, radius, ...restProps } = props

    const gettedSize = getSize(size)

    return <MantineAvatar variant={variant} radius={radius} alt={src ? undefined : alt ?? undefined} component={component} style={{ height: gettedSize, width: gettedSize, minWidth: gettedSize, borderRadius: '50%', overflow: "hidden" }}>
        {src && <Image
            {...restProps}
            style={{ objectFit: 'cover' }}
            loading='lazy'
            src={src}
            height={gettedSize}
            width={gettedSize}
            alt={alt || ''}
        />}
    </MantineAvatar>
}
