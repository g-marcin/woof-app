import { FC, useEffect, useState, useCallback } from 'react'
import { RoundButton } from '../../../components'

interface ImageModalProps {
    imageUrl: string
    imageList?: string[]
    onClose: () => void
}

export const ImageModal: FC<ImageModalProps> = ({
    imageUrl,
    imageList,
    onClose,
}) => {
    const [currentIndex, setCurrentIndex] = useState(0)

    useEffect(() => {
        if (imageList) {
            const index = imageList.indexOf(imageUrl)
            if (index !== -1) {
                setCurrentIndex(index)
            }
        }
    }, [imageUrl, imageList])

    const handlePrevious = useCallback(() => {
        if (imageList && imageList.length > 0) {
            setCurrentIndex(prev =>
                prev === 0 ? imageList.length - 1 : prev - 1
            )
        }
    }, [imageList])

    const handleNext = useCallback(() => {
        if (imageList && imageList.length > 0) {
            setCurrentIndex(prev => (prev + 1) % imageList.length)
        }
    }, [imageList])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            } else if (imageList && imageList.length > 0) {
                if (e.key === 'ArrowLeft') {
                    handlePrevious()
                } else if (e.key === 'ArrowRight') {
                    handleNext()
                }
            }
        }
        document.addEventListener('keydown', handleKeyDown)
        document.body.style.overflow = 'hidden'
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = ''
        }
    }, [handlePrevious, handleNext, imageList, onClose])

    const displayImage =
        imageList && imageList.length > 0 ? imageList[currentIndex] : imageUrl
    const showArrows = imageList && imageList.length > 1

    return (
        <div
            className="fixed inset-0 bg-black/90 flex items-center justify-center z-[1000] p-5"
            onClick={onClose}
        >
            <div
                className="flex flex-col w-[90vw] h-[85vh]"
                onClick={e => e.stopPropagation()}
            >
                <div className="flex justify-end pb-2">
                    <RoundButton onClick={onClose} aria-label="Close">×</RoundButton>
                </div>
                <div className="flex flex-1 min-h-0 items-center gap-2">
                    <RoundButton
                        onClick={e => { e.stopPropagation(); handlePrevious() }}
                        aria-label="Previous image"
                        hidden={!showArrows}
                    >
                        ‹
                    </RoundButton>
                    <div className="flex-1 min-h-0 h-full overflow-hidden">
                        <img
                            src={displayImage}
                            alt="zoomed"
                            className="w-full h-full object-contain rounded-lg"
                        />
                    </div>
                    <RoundButton
                        onClick={e => { e.stopPropagation(); handleNext() }}
                        aria-label="Next image"
                        hidden={!showArrows}
                    >
                        ›
                    </RoundButton>
                </div>
            </div>
        </div>
    )
}
