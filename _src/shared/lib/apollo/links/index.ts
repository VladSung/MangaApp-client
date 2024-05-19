import { errorClientLink } from './clientLinks';
import { apolloLinks, errorServerLink } from './links';

const Links = () => {
    if (typeof window! === 'undefined') {
        return [errorClientLink, ...apolloLinks];
    }
    return [errorServerLink, ...apolloLinks];
};

export { Links as apolloLinks };
