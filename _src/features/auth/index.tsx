'use client'
import { ProfileMenu } from '@src/entities/profile';

import { AuthButton } from './auth-button';

const ProfileOrLoginMenu = ({ avatar, id }: { avatar?: string | null, id?: string | null }) => {
    if (id) {
        return <ProfileMenu avatar={avatar} />;
    }

    return (
        <>
            <AuthButton />
        </>
    )
}

export default ProfileOrLoginMenu
