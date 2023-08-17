import { AuthAvatar, LoginButton } from '@/_src/features/auth';
import { PageProps } from '@/_src/shared/types';
import { getSession } from '@auth0/nextjs-auth0';

export const LoginButtonOrAvatar = async ({ params }: PageProps) => {
    const session = await getSession();
    if (session?.user) {
        return <AuthAvatar user={session?.user} />;
    }

    return <LoginButton params={params} />;
};
