import { createContext } from "react"
import { User } from 'src/graphql/types'

export interface AuthData {
    data: {
        auth: User,   
    } | undefined
    loading: boolean
    errors?: [
        {
            message: string
            extensions: {
                code: string
            }
        }
    ]
}

export const AuthContext = createContext<AuthData>({data: undefined, loading: true});

export const AuthProvider = AuthContext.Provider