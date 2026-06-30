import { FC } from 'react'
import { RoundButton } from '../../../components'
import { useImageGallery } from '../../../hooks'

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
    const { displayImage, showArrows, handlePrevious, handleNext } =
        useImageGallery({ imageUrl, imageList, onClose })

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
