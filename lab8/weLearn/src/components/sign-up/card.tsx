/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';

type cardProps = {
    cardStyle?: string;

    title: string;
    titleStyle?: string;

    image?: boolean;
    imagelink?: string;

    detail: string;

    id?: number | string;
    onSelect?: (id: number | string) => void;

    children?: React.ReactNode;
    childrenStyle?: string;

    className? : string,
};

const Card: React.FC<cardProps> = ({title, titleStyle, cardStyle, image, imagelink, id, onSelect, children, childrenStyle, detail, className}) => {
    const isSelected = className?.includes('selected');

    return (
        <div 
            className={`
                bg-white 
                rounded-xl 
                flex-grow
                w-card-sm-w 
                h-card-sm-h
                border-2 
                flex 
                flex-col 
                justify-between 
                border-purplish-blue
                hover:border-2 
                hover:border-primary-purplish-blue 
                hover:cursor-pointer
                hover:bg-primary-transparent-purplish-blue2 ${cardStyle}
                ${image && `bg-[url('${imagelink}')]`}
                ${isSelected && `border-2 border-primary-purplish-blue`}
                dark:bg-dark-card-bg dark:border-2
            `}
            onClick={() => {id && onSelect && onSelect(id)}}
            
        >
            <div className={`bg-[url(${imagelink})]`}>
            
            </div>
            <div className="txt p-4 bg-primary-pastel-blue text-black font-montserrat">
                <h3 className={`text-xl font-semibold whitespace-nowrap  ${titleStyle}`}>{title}</h3>
                <div className={`${childrenStyle}`}>{[children, detail]}</div>
            </div>
        </div>
    );
};
export default Card;