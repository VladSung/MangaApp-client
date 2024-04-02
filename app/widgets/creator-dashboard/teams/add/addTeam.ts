'use server'
import { graphql } from '@/app/shared/api/graphql';
import { teamsQuery } from '../../sidebar/queries';
import { AddTeamFormInput } from '@/app/entities/team';
import { uploadImages } from '@/app/features/upload-image';
import { getClient } from '@/app/shared/lib/apollo/client';

const addTeamMutation = graphql(`
    mutation AddTeamMutation($input: AddTeamInput!) {
        createTeam(input: $input) {
            id
            name
            avatar
        }
    }
`);

export const AddTeam: (data: AddTeamFormInput) => void = async (data) => {

        if (!data?.cover) {
            throw new Error('image not set');
        }

        const imageData = await uploadImages([data.cover], data.name);

        const newTeam = await getClient().mutate({
            mutation: addTeamMutation,
            variables: {
                input: {
                    avatar: imageData.data[0].path,
                    name: data.name,
                    tagline: data.tagline,
                },
            },
            update:(cache, {data: addTeam})=>{
                const teams = cache.readQuery({query:teamsQuery})
                cache.updateQuery({query: teamsQuery}, (data)=>{
                    if(data?.me?.member) {
                        return ({
                        me:{
                            member:[
                            ...data?.me?.member,
                                {
                                team: addTeam?.createTeam
                                }]
                            }
                        })
                    } else {
                        return ({
                            me:{
                            member:[
                                {
                                team: addTeam?.createTeam
                            }]
                        }
                        })
                    }
                })
            }
        });

    };