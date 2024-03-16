'use client'
import { useMediaQuery } from "@mantine/hooks";
import { em } from "@mantine/core";
import Comic from "./comic";
import ComicDesktop from "./comic-pc";

type Props = {
    params: {
        id: string;
        lng: string;
    };
};

const AutoComicPage = ({ ...props }: Props) => {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    if (isMobile) return <Comic {...props} />
    return <ComicDesktop {...props} />
}
export default AutoComicPage