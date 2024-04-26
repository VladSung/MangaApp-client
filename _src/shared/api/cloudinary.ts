/**
 * Demo:
 * https://tx.cloudinary.com/
 *
 * Documentation
 * https://cloudinary.com/documentation/
 */
export const getImageLink = (publicId: string, options?: string) => {
    return `https://res.cloudinary.com/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload/${options ? options + '/' : '/'}${publicId}`;
};
