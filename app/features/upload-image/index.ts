type uploadManyImagesResult = {
    data: {
        path: string;
        aspectRatio: string;
    }[];
};

export const uploadImages: (
    files: File[],
    title: string,
    authToken?: string
) => Promise<uploadManyImagesResult> = async (files, title, authToken) => {
    const formData = new FormData();

    for (const file of files) {
        formData.append('files', file);
    }

    formData.append('title', title);

    const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        headers: { authorization: `Bearer ${authToken}` },
    });

    return await response.json() as uploadManyImagesResult;
};
