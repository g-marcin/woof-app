import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import { Header, MainWrapper, Navbar, PageWrapper } from '.';

export const Layout: FC = () => {
    return (
        <MainWrapper>
            <Header />
            <PageWrapper>
                <Outlet />
            </PageWrapper>
            <Navbar />
        </MainWrapper>
    );
};
