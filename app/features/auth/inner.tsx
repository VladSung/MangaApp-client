'use client'
import { ProfileMenu } from '@/app/entities/profile';

import { AuthButton } from './auth-button';

const Inner = ({ avatar, id }: { avatar?: string | null, id?: string | null }) => {


    if (id) {
        return <ProfileMenu avatar={avatar} />;
    }

    return (
        <AuthButton />
    )
}

export default Inner
