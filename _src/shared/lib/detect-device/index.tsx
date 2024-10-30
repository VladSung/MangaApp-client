'use client'
import { headers } from "next/headers";

import { DetectDeviceProvider as DetectDevice } from "./detect-device";
import { use } from 'react';

export const DetectDeviceProvider = (props: React.PropsWithChildren) => {

    const header = use(headers());
    return <DetectDevice headers={header}>{props.children}</DetectDevice>;
}
