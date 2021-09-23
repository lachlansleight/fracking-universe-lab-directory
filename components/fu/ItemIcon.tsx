import { FuItem } from "lib/fu-items";

const ItemIcon = ({
    item,
    className,
    border,
}: {
    item: FuItem;
    className?: string;
    border?: boolean;
}): JSX.Element => {
    return (
        <div className={`relative ${className || ""}`}>
            {border && (
                <img
                    src={`/icons/generic/itemborder${item.rarity}.png`}
                    className="absolute left-0 top-0 w-full h-full rendering-pixelated"
                />
            )}
            <img
                src={`/icons/${item.itemType}/${item.icon}`}
                className={`w-full h-full rendering-pixelated object-contain ${
                    border ? "p-1" : ""
                }`}
            />
        </div>
    );
};

export default ItemIcon;
