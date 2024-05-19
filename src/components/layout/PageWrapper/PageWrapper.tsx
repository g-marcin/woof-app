import { FC, PropsWithChildren } from 'react';
import styled from './PageWrapper.module.css';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styled.pageWrapper}>{children}</div>;
};
