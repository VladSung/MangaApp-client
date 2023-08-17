'use client';
import { Experimental_CssVarsProvider as CssVarsProvider } from '@mui/material/styles';
import * as React from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import NextAppDirEmotionCacheProvider from './EmotionCache';
import theme from './theme';
import { getInitColorSchemeScript } from '@mui/material/styles';

export default function ThemeRegistry({ children }: { children: React.ReactNode }) {
    return (
        <>
            {getInitColorSchemeScript()}
            <NextAppDirEmotionCacheProvider
                options={{
                    key: 'mui',
                }}
            >
                <CssVarsProvider theme={theme} defaultMode="system">
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />
                    {children}
                </CssVarsProvider>
            </NextAppDirEmotionCacheProvider>
        </>
    );
}
