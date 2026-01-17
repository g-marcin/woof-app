import { FC } from 'react';
import { Link } from 'react-router-dom';
import { ShieldDogSolid } from '@assets/svg/ShieldDogSolid';

export const Header: FC = () => {
    return (
        <header className={`flex justify-between items-center h-[50px] z-[5] p-[15px] bg-secondary fixed w-full hidden md:flex`}>
            <Link className="flex items-center gap-1" to="/">
                <ShieldDogSolid className='h-[30px] w-[30px]' />
                <span className='font-poppins text-2xl font-semibold typography-secondary no-underline'>woof-app</span>
            </Link>
        </header>
    );
};
