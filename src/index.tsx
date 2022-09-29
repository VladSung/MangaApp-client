import React from 'react';
import './index.css';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import { GlobalStyles, StyledEngineProvider } from '@mui/material';

import { ApolloProvider } from '@apollo/client/react';
import { ApolloClient, InMemoryCache, from } from '@apollo/client';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { createUploadLink } from 'apollo-upload-client';
import { removeTypenameFromMutationLink } from 'apollo-remove-typename-mutation-link';


const container = document.getElementById('root')!;
const root = createRoot(container);

const client = () => {
    return new ApolloClient({
        cache: new InMemoryCache(),
        credentials: 'same-origin',
        link: from([removeTypenameFromMutationLink, createUploadLink({ uri: process.env.REACT_APP_API_SERVER })]),
    });
};
root.render(
    <React.StrictMode>
        <ApolloProvider client={client()}>
            <DndProvider backend={HTML5Backend}>
                <BrowserRouter>
                    <StyledEngineProvider injectFirst>
                        <GlobalStyles styles={'default'} />
                        <App />
                    </StyledEngineProvider>
                </BrowserRouter>
            </DndProvider>
        </ApolloProvider>
    </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals(console.log);
