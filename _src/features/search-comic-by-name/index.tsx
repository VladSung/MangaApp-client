import { QueryReference, useLoadableQuery } from "@apollo/client"
import { useReadQuery } from "@apollo/experimental-nextjs-app-support/ssr"
import { Input, Loader, Modal, ScrollAreaAutosize, Stack, Text } from "@mantine/core"
import { useDebouncedState } from "@mantine/hooks"
import { ComicListItem } from "@src/entities/comic"
import { Exact, graphql, SearchComicsBySearchTextQuery } from "@src/shared/api/graphql"
import { Suspense, useEffect } from "react"
import { Error } from "@src/entities/error"

const searchComicsQuery = graphql(`
    query searchComicsBySearchText($search: String!) {
        comics(where:{searchText:$search}){
            id
            title
            alternativeTitles
            cover
    }
    }
`)

export const SearchComicByName = ({ opened, onClose }: { opened: boolean, onClose: () => void }) => {
    const [searchText, setSearchText] = useDebouncedState('', 800)
    const [loadComics, queryRef] = useLoadableQuery(searchComicsQuery, { errorPolicy: 'all' })

    useEffect(() => {
        if (searchText.length > 2) loadComics({ search: searchText })
    }, [searchText])

    return (
        <Modal title={'Search comic by name'} scrollAreaComponent={ScrollAreaAutosize} opened={opened} onClose={onClose} size='lg'>

            <Input mb='lg' placeholder="Please enter more than 2 characters to search" onChange={(e) => setSearchText(e.target.value.trim())} />

            <Suspense fallback={<Stack align='center'><Loader /></Stack>}>
                {queryRef && <List onClose={onClose} queryRef={queryRef} />}
            </Suspense>
        </Modal>
    )
}

const List = ({ queryRef, onClose }: {
    queryRef: QueryReference<SearchComicsBySearchTextQuery | undefined, Exact<{
        search: string;
    }>>,
    onClose: () => void
}) => {
    const { data, error } = useReadQuery(queryRef)

    return (<Stack>
        {error && <Error message={error.message} errorCode={error.name} />}
        {!data?.comics?.length && <Text ta='center'>No results</Text>}
        {data?.comics?.map((comic) => comic && <ComicListItem onClick={onClose} key={comic?.id} href={`/comic/${comic?.id}`} data={{ ...comic, subtitle: comic.alternativeTitles }} />)}
    </Stack>)
}