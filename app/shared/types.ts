/* eslint-disable  @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment*/
export type PageProps = { params: { lng: string } };

type RecursivelyReplaceNullWithUndefined<T> = T extends null
    ? undefined
    : T extends (infer U)[]
    ? RecursivelyReplaceNullWithUndefined<U>[]
    : T extends Record<string, unknown>
    ? { [K in keyof T]: RecursivelyReplaceNullWithUndefined<T[K]> }
    : T;

export function nullsToUndefined<T>(obj: T): RecursivelyReplaceNullWithUndefined<T> {
    if (obj === null || obj === undefined) {
        return undefined as any;
    }

    if ((obj as any).constructor.name === 'Object' || Array.isArray(obj)) {
        for (const key in obj) {
            obj[key] = nullsToUndefined(obj[key]) as any;
        }
    }

    return obj as any;
}
