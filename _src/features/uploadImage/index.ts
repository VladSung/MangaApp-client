import axios from 'axios';

type uploadImageArguments = {
    image: File;
    tags?: string[];
    crop?: string;
};

interface GetSignatureParameters {
    ({ tags, crop }: { tags?: string[]; crop?: string }): Promise<{
        data: { signature: string; timestamp: string };
    }>;
}

const getSignatureParameters: GetSignatureParameters = async ({ tags, crop: c_crop }) => {
    const result = await axios.post<
        { tags?: string[] },
        { data: { signature: string; timestamp: string } }
    >(
        'http://localhost:5000/signature',
        { tags, c_crop },
        {
            headers: {
                'Access-Control-Allow-Origin': 'Content-Type',
            },
        }
    );

    return result;
};

export const uploadImage: ({
    tags,
    image,
}: uploadImageArguments) => Promise<{ data: { public_id: string } }> = async ({
    tags,
    image,
    crop,
}) => {
    const { data } = await getSignatureParameters({ tags, crop });
    console.log(data);
    const formData = new FormData();

    if (tags) {
        formData.append('tags', tags.join(', '));
    }

    formData.append('api_key', '679427116467124');
    formData.append('c_crop', '160');
    formData.append('file', image);
    formData.append('timestamp', data.timestamp);
    formData.append('signature', data.signature);

    return await axios.post(`https://api.cloudinary.com/v1_1/dd5xzevrq/image/upload`, formData);
};
