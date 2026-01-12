import { FC, useEffect, useState } from 'react';
import { Spinner } from '@assets/svg/Spinner';

export const Loader: FC = () => {
    const [isTimeout, setIsTimeout] = useState(false);
    useEffect(() => {
        setTimeout(() => setIsTimeout(true), 4000);
    }, []);

    return (
        <div className='align-self-center justify-self-center p-30'>
            {isTimeout ? (
                <div>No data available</div>
            ) : (
                <Spinner color="#1f83bb" className="animate-spin text-color-red-500" />
            )}
        </div>
    );
};
