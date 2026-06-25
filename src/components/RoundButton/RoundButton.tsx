import { FC, MouseEvent, ReactNode } from 'react'

interface RoundButtonProps {
    onClick: (e: MouseEvent) => void
    'aria-label': string
    children: ReactNode
    hidden?: boolean
}

export const RoundButton: FC<RoundButtonProps> = ({
    onClick,
    'aria-label': ariaLabel,
    children,
    hidden,
}) => (
    <button
        className={`bg-white/90 border-none rounded-full w-10 h-10 cursor-pointer flex items-center justify-center transition-all duration-300 hover:bg-white flex-shrink-0 typography-bold typography-primary text-2xl${hidden ? ' invisible pointer-events-none' : ''}`}
        onClick={onClick}
        aria-label={ariaLabel}
        aria-hidden={hidden}
    >
        {children}
    </button>
)
