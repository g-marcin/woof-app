import { Spinner } from '@assets/svg/Spinner'
import type { FC } from 'react'

export const Loader: FC = () => {
    return (
        <div className="align-self-center justify-self-center p-30">
            <Spinner color="#1f83bb" className="animate-spin text-color-red-500" />
        </div>
    )
}
