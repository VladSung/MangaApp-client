type uploadManyImagesResult = {
    data: {
        path: string;
        aspectRatio: string;
    }[];
};

export const uploadImage: (
    file: File,
    title: string,
    authToken?: string
) => Promise<{
    data: { path: string };
}> = async (file, title, authToken) => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('title', title);

    let response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        headers: { authorization: `Bearer ${authToken}` },
    });
    return response.json();
};

export const uploadManyImages: (
    files: File[],
    title: string,
    authToken?: string
) => Promise<uploadManyImagesResult> = async (files, title, authToken) => {
    const formData = new FormData();

    for (let file of files) {
        formData.append('files', file);
    }
    formData.append('title', title);

    let response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
        headers: { authorization: `Bearer ${authToken}` },
    });
    return response.json();
};
