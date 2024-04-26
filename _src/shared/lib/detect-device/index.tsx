'use client'
import { headers } from "next/headers";

import { DetectDeviceProvider as DetectDevice } from "./detect-device";

export const DetectDeviceProvider = (props: React.PropsWithChildren) => {

    return <DetectDevice headers={headers()}>{props.children}</DetectDevice>
}
