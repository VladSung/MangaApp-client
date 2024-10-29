export type PageProps<T = {}> = { params: Promise<T & { lng: string }> };
