/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';

type cardProps = {
    cardStyle?: string;

    title: string;
    titleStyle?: string;

    icon?: boolean;
    iconlink?: string;

    price: string;
    priceStyle?: string;

    id?: string;
    onSelect?: (id: string) => void;

    children?: React.ReactNode;
    childrenStyle?: string;
};

const Card: React.FC<cardProps> = ({title, titleStyle, cardStyle, icon, iconlink, price, priceStyle, id, onSelect, children, childrenStyle}) => {
    // const [toggled, setToggled] = React.useState(false);

    // const handleToggle = () => {
    //     setToggled(!toggled);
    // };

    return (
        <div 
            className={`
                bg-white 
                rounded-xl 
                flex-grow
                w-card-sm-w 
                border-2 
                flex 
                flex-col 
                justify-between 
                border-purplish-blue
                hover:border-2 
                hover:border-primary-purplish-blue 
                hover:cursor-pointer
                hover:bg-primary-transparent-purplish-blue2 ${cardStyle}
            `}
            onClick={() => {id && onSelect && onSelect(id)}}
        >
            <div className="flex p-4 mb-10">
                {icon && <img src={iconlink} alt="icon" className="w-12"/>}
            </div>
            <div className="txt p-4">
                <h3 className={`text-xl font-semibold ${titleStyle}`}>{title}</h3>
                <div className={`${childrenStyle}`}>{children}</div>
            </div>
        </div>
    );
};
export default Card;