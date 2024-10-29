import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Account'
}

export { /* @next-codemod-error `AccountPage` export is re-exported. Check if this component uses `params` or `searchParams`*/
AccountPage as default } from '@src/pages/account';
