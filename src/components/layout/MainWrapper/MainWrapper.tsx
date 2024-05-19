import { FC, PropsWithChildren } from 'react';
import styles from './MainWrapper.module.css';

export const MainWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className={styles.mainWrapper}>{children}</div>;
};
