import type { FallbackProps } from 'react-error-boundary'

export const QueryErrorFallback = ({ error, resetErrorBoundary }: FallbackProps) => {
    const message = error instanceof Error ? error.message : 'Unknown error'

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-4">
            <p className="typography-primary">Something went wrong: {message}</p>
            <button type="button" onClick={resetErrorBoundary} className="typography-primary underline">
                Retry
            </button>
        </div>
    )
}
