import { errorClientLink } from './client-links';
import { apolloLinks, errorServerLink } from './links';

const Links = () => {
    if (window! === undefined) {
        return [errorClientLink, ...apolloLinks];
    }

    return [errorServerLink, ...apolloLinks];
};

export { Links as apolloLinks };
