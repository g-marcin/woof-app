import { FC, ReactNode, MouseEvent } from 'react';

interface TagProps {
    children: ReactNode;
    isActive?: boolean;
    onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
    as?: 'button' | 'span';
    className?: string;
}

export const Tag: FC<TagProps> = ({ 
    children, 
    isActive = false, 
    onClick, 
    as = 'span',
    className = ''
}) => {
    const baseStyles = 'inline-flex items-center rounded-xl px-3 py-1 text-xs transition-all duration-200';
    const activeStyles = 'bg-[color:var(--link-active)] text-[color:var(--typography-active)]';
    const inactiveStyles = 'bg-[color:var(--secondary)] text-[color:var(--typography-secondary)] hover:opacity-80';
    const buttonStyles = 'cursor-pointer border border-[color:var(--typography-tertiary)] hover:bg-[color:var(--link-active)] hover:border-[color:var(--link-active)] hover:text-[color:var(--typography-active)]';

    const styles = `${baseStyles} ${isActive ? activeStyles : inactiveStyles} ${onClick || as === 'button' ? buttonStyles : ''} ${className}`;

    if (as === 'button' || onClick) {
        return (
            <button onClick={onClick} className={styles}>
                {children}
            </button>
        );
    }

    return <span className={styles}>{children}</span>;
};

