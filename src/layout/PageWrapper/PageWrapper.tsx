import { FC, PropsWithChildren } from 'react';
import styled from './pageWrapper.module.css';

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styled.pageWrapper}>{children}</div>;
};
