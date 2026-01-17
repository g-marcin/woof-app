import { FC, PropsWithChildren } from 'react';

export const MainWrapper: FC<PropsWithChildren> = ({ children }) => {
    return <div className='py-[25px] px-0 pb-[65px] overflow-hidden'>{children}</div>;
};
