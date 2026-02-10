import { FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link, useNavigate } from 'react-router-dom'
import { Loader, Tag } from '../components'
import { useDogList } from '../hooks/useDogList'

const Listing: FC = () => {
    const { dogEntries, isLoading } = useDogList()

    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <>
            {isLoading ? (
                <div className="flex flex-col h-screen max-w-[680px] mx-auto pl-2.5 justify-center">
                    <Loader />
                </div>
            ) : (
                <div className="flex flex-col gap-4 max-w-[1200px] mx-auto px-5 pb-[100px]">
                    <h1 className="text-center typography-header-large typography-bold typography-primary">
                        {t('headers.dogList')}
                    </h1>
                    {dogEntries.map(([dog, variants]) => {
                        return (
                            <Link
                                to={`/search/${dog}`}
                                className="no-underline"
                                key={dog}
                            >
                                <div className="flex items-center justify-between gap-4 p-4 bg-[color:var(--secondary)] rounded-lg hover:opacity-80 transition-opacity duration-300 text-[color:var(--typography-secondary)]">
                                    {dog}

                                    <div className="flex flex-wrap content-center gap-1.5">
                                        {variants.map(variant => {
                                            return (
                                                <Tag
                                                    key={variant}
                                                    as="button"
                                                    onClick={e => {
                                                        e.preventDefault()
                                                        e.stopPropagation()
                                                        navigate(
                                                            `/search/${dog}/${variant}`
                                                        )
                                                    }}
                                                    className="!bg-[color:var(--primary)] !text-[color:var(--typography-tertiary)] !border-[color:var(--typography-secondary)]"
                                                >
                                                    {variant}
                                                </Tag>
                                            )
                                        })}
                                    </div>
                                </div>
                            </Link>
                        )
                    })}
                </div>
            )}
        </>
    )
}

export default Listing
