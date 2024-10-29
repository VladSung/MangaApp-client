type GetUploadUrlResponse = {
    data: {
        url: string;
        key: string;
    };
};

export const getHeightAndWidthFromDataUrl = (dataURL: string) =>
    new Promise<{ height: number; width: number }>((resolve) => {
        const img = new Image();

        img.addEventListener('load', () => {
            resolve({
                height: img.height,
                width: img.width,
            });
        });

        img.src = dataURL;
    });

export const uploadImage = async (file: File, withAspectRatio?: boolean, authToken?: string) => {
    try {
        const dimensions = await getHeightAndWidthFromDataUrl(URL.createObjectURL(file));

        const uploadUrlResponse = await fetch(
            'http://localhost:5000/get-upload-url?' +
                new URLSearchParams({
                    filename: file.name,
                    mimeType: file.type,
                }).toString(),
            {
                method: 'GET',
                headers: { authorization: `Bearer ${authToken}` },
            }
        );

        const { data }: GetUploadUrlResponse = await uploadUrlResponse.json();

        await fetch(data.url, {
            method: 'PUT',
            body: file,
        });

        return {
            data: {
                ...data,
                aspectRatio: withAspectRatio
                    ? `${dimensions.width}/${dimensions.height}`
                    : undefined,
            },
        };
    } catch (error) {
        return {
            error: error as Error,
        };
    }
};
