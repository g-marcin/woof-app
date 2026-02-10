import { FC, PropsWithChildren } from 'react'

export const PageWrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
        <div className="pt-[55px] max-h-[calc(100vh_-_60px)] overflow-y-scroll overflow-x-hidden max-sm:p-0">
            {children}
        </div>
    )
}
