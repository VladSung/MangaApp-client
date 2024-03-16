
import { userAgent } from "next/server";
import { PropsWithChildren, createContext } from "react";

const DetectDevice = createContext('')

export const DetectDeviceProvider = (props: PropsWithChildren & { headers: Headers }) => {

    const { device } = userAgent({ headers: props.headers });
    const viewport = device.type === 'mobile' ? 'mobile' : 'desktop';

    return (<DetectDevice.Provider value={viewport}>
        {props.children}
    </DetectDevice.Provider>)
}