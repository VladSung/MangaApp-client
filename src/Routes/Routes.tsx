import { Route, Routes, Navigate } from "react-router-dom";
import { Layout } from "src/Layout";
import { lazy, Suspense, useContext } from "react";
import Settings from "src/pages/Settings";
import { Loader } from "src/components/Loader";
import { AuthContext } from "src/utils/contexts/AuthContext";
import Page404 from "src/pages/Page404/Page404";

const Home = lazy(() => import('src/pages/Home'));
const Manga = lazy(() => import('src/pages/Manga'));
const MangaCatalog = lazy(() => import('src/pages/MangaCatalog'));
const Reader = lazy(() => import('src/pages/Reader'));
const SignUp = lazy(() => import('src/pages/SignUp/SignUp'));
const Login = lazy(() => import('src/pages/Login/Login'));
const Dashboard = lazy(() => import('src/pages/Dashboard/Dashboard'));
const AddManga = lazy(() => import('src/pages/Dashboard/AddManga/AddManga'));
const MangaEdit = lazy(() => import('src/pages/Dashboard/AddChapter/AddChapter'));


const WithSuspense = (props: any) => {
    return (
        <Suspense fallback={<Loader />}>
            {props.children}
        </Suspense>
    )
}

export const AppRoutes = () => {
    const { data } = useContext(AuthContext);

    return (
        <Routes>
            <Route path='/' element={<Layout />}>
                {/*home page*/}
                <Route path={'/'} element={
                    <WithSuspense children={<Home />} />
                } />

                {/*Manga page routers*/}
                <Route path={'/manga'}>
                    <Route path={':id'} element={
                        <WithSuspense children={<Manga />} />
                    } />
                    <Route path={':id/ch/'} element={
                        <Navigate to='1'replace={true} />
                    } />
                    <Route path={':id/ch/:id/'} element={
                        <WithSuspense children={<Reader />} />
                    } />
                    <Route path={''} element={
                        <WithSuspense children={<MangaCatalog />} />
                    } />
                </Route>

                {/* dashdoard pages */}
                <Route path={'/dashboard'}>
                    <Route path={'create'} element={
                        <WithSuspense children={<AddManga />} />
                    } />
                    <Route path={':id'} element={
                        <WithSuspense children={<AddManga />} />
                    } />
                    <Route path={':id/chapters'} element={
                        <WithSuspense children={<MangaEdit />} />
                    } />
                    <Route path={''} element={
                        <WithSuspense children={<Dashboard />} />
                    } />
                </Route>
                {/*settings page routes*/}
                <Route path={'/settings'} element={<Settings />} />

                {/*auth page routes*/}
                <Route path={'/signup'} element={
                     data?.auth?.id ? <Navigate to='/' />
                     :  <WithSuspense children={<SignUp />} />
                } />
                <Route path={'/login'} element={
                    data?.auth?.id ? <Navigate to='/' />
                        :  <WithSuspense children={<Login />} />
                } />
                <Route path={'*'} element={
                    <Page404 />
                } />
            </Route>
        </Routes>
    )
}