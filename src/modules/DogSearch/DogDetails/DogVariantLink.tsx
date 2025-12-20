import { FC } from 'react';
import { NavLink, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import { NavLinkState } from '../../../types';

interface DogVariantLinkProps {
    variant: string;
    breedName: string;
    navLinkState: (state: NavLinkState) => string;
}

export const DogVariantLink: FC<DogVariantLinkProps> = ({ variant, breedName, navLinkState }) => {
    const navigate = useNavigate();
    const { variant: currentVariant } = useParams();
    const [searchParams] = useSearchParams();

    const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
        const target = e.target as Element;
        if (target.innerHTML === currentVariant) {
            e.preventDefault();
            const mode = searchParams.get('mode');
            const url = mode ? `/search/${breedName}?mode=${mode}` : `/search/${breedName}`;
            navigate(url);
        }
    };

    const mode = searchParams.get('mode');
    const to = mode ? `/search/${breedName}/${variant}?mode=${mode}` : `/search/${breedName}/${variant}`;

    return (
        <NavLink
            onClick={handleClick}
            to={to}
            className={navLinkState}
        >
            {variant}
        </NavLink>
    );
};

