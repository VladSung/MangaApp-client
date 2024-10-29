import { createInstance,KeyPrefix, Namespace } from 'i18next';
import resourcesToBackend from 'i18next-resources-to-backend';
import { initReactI18next } from 'react-i18next/initReactI18next';

import { getOptions } from './config';

const initI18next = async (lng?: string, ns?: string) => {
    const i18nInstance = createInstance();

    await i18nInstance
        .use(initReactI18next)
        .use(
            resourcesToBackend(
                (language: string, namespace: string) =>
                    import(`./locales/${language}/${namespace}.json`)
            )
        )
        .init(getOptions(lng, ns));

    return i18nInstance;
};

export async function fetchTranslation(
    lng?: string,
    ns?: string | undefined,
    options?: { keyPrefix: KeyPrefix<Namespace> }
) {
    const i18nextInstance = await initI18next(lng, ns);

    return {
        t: i18nextInstance.getFixedT(
            lng || null,
            (Array.isArray(ns) ? ns[0] : ns) as string,
            options?.keyPrefix
        ),
        i18n: i18nextInstance,
    };
}
