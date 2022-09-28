import './App.css';
import { ThemeProvider, CssBaseline } from "@mui/material";
import { useNewTheme, ThemeContext } from "src/utils/hooks/useNewTheme";
import {AppRoutes} from "src/Routes";
import { AUTH } from 'src/graphql/queries/user';
import { useQuery } from '@apollo/client';
import { Loader } from './components/Loader';
import { AuthProvider, AuthData } from './utils/contexts/AuthContext';

function App() {
    const [theme, setTheme] = useNewTheme();
    const {loading, data}:AuthData = useQuery(AUTH);
    
    return (
        <ThemeContext.Provider value={setTheme}>
            <ThemeProvider theme={theme}>
                <CssBaseline/>
                <AuthProvider value={{data, loading}}>
                    {
                        loading ? <Loader/>
                        :<AppRoutes/>

                    }
                </AuthProvider>
            </ThemeProvider>
        </ThemeContext.Provider>
    );
}

export default App;