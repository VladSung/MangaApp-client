import {useEffect, useState} from "react";
// import {useDeepCompare} from "src/utils/hooks/useDeepCompare";

interface ListItem {
    id: string,
    route: string,
    name: {
    "ru": string,
    "en": string
    },
    poster: {
    "high": string,
    "mid": string,
    "low": string
    },
    chaptersCount: number
}

export const MangaCatalog = ()=>{
    const [list] = useState<Array<ListItem>>([]);

    useEffect(()=>{
        const getData = async ()=>{
            console.log('MangaCatalog: get user data');
            
            //setList('');
        };
        getData().then();
        // useDeepCompare([list])
    }, [])
    return(
        <div>
            {list.map((item)=>(<p key={item.id}> {item.id} {item.name.ru}</p>))}
        </div>
    )
}