import {
    Container,
    AppShellMain,
    Button,
    Paper,
    Image,
} from '@mantine/core';
import { PageProps } from '@src/shared/types';
import { getClient } from '@src/shared/lib/apollo/client';
import { graphql } from '@src/shared/api/graphql';
import { ProfileContent, ProfileHeader } from '@src/entities/profile';


const ProfileQuery = graphql(`
    query ProfileQuery {
        me{
            name
            avatar
            description
            background
            member{
                role
                id
                team{
                    id
                    name
                    avatar
                    description
                    comics{
                        id
                        title
                        cover
                    }
                }
            }
        }
    }
`)

const ProfilePage = async ({ params }: PageProps) => {
    const { data, error } = await getClient().query({ query: ProfileQuery, errorPolicy: 'all' });

    // if (!data?.me || error?.graphQLErrors.length) {
    //     redirect('/api/auth/login');
    // }


    const comics = data?.me?.member?.map((member) => member?.team?.comics)?.flat() ?? [];
    const teams = data?.me?.member?.map((member) => member?.team) ?? [];

    return (
        <AppShellMain>
            <Container pt='lg' size='lg'>
                {data.me?.background && <Paper mb='lg' radius='md' withBorder>
                    <Image src={data.me?.background} h='14dvw' radius='md' mah='172' mih={90} />
                </Paper>}
                <ProfileHeader user={data.me} mb='xl'>
                    <Button variant='default' size='xs'>Edit profile</Button>
                </ProfileHeader>
                <ProfileContent comics={comics} teams={teams} />
            </Container>
        </AppShellMain >
    );
};



export default ProfilePage;