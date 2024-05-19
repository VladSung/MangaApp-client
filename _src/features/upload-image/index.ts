import { getUserToken } from '@src/shared/api/getUserToken';

type UploadManyImagesResult = {
    data: {
        path: string;
        aspectRatio: string;
    }[];
};

type UploadTypes = 'cover' | 'avatar' | 'background' | 'chapter';

export const uploadImages: (
    files: File[],
    title: string,
    type: UploadTypes,
    authToken?: string
) => Promise<UploadManyImagesResult> = async (files, title, type, authToken) => {
    const formData = new FormData();

    for (const file of files) {
        formData.append('files', file);
    }

    formData.append('title', title);
    formData.append('type', type);

    const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        headers: { authorization: `Bearer ${authToken}` },
    });

    return (await response.json()) as UploadManyImagesResult;
};

export async function mutationWithUploadImages<
    TMutation extends (images?: UploadManyImagesResult) => void,
>(
    mutation: TMutation,
    filesOptions?: {
        type: UploadTypes;
        fileFolder: string;
        files?: File[];
    },
    setLoading?: (loading: boolean) => void
) {
    if (!filesOptions?.files?.length) return mutation();
    setLoading && setLoading(true);
    const images = await uploadImages(
        filesOptions?.files,
        filesOptions?.fileFolder,
        filesOptions.type
    );
    setLoading && setLoading(false);
    mutation(images);
}
