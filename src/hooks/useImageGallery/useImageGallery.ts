import { useCallback, useEffect, useState } from 'react'

interface UseImageGalleryParams {
    imageUrl: string
    imageList?: string[]
    onClose: () => void
}

export const useImageGallery = ({
    imageUrl,
    imageList,
    onClose,
}: UseImageGalleryParams) => {
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
    const showArrows = Boolean(imageList && imageList.length > 1)

    return {
        displayImage,
        showArrows,
        handlePrevious,
        handleNext,
    }
}
