import { FuItem } from "lib/fu-items";
import { applyColors } from "lib/fu-utils";
import ItemIcon from "./ItemIcon";

const Item = ({ item }: { item: FuItem }): JSX.Element => {
    return (
        <div className="w-full md:w-72 border border-black border-2 rounded">
            <div className="flex items-center gap-2 bg-black bg-opacity-10 border-b-2 border-black px-2 py-1">
                <ItemIcon item={item} className="w-8 h-8" border={true} />
                <h2 className="font-pixel text-shadow-hard">{item.shortDescription}</h2>
            </div>
            <div className="flex flex-col bg-black bg-opacity-20 items-center p-4 gap-4">
                <ItemIcon item={item} className="w-24 h-24" />
                <p className="font-pixel">{applyColors(item.description)}</p>
            </div>
        </div>
    );
};

export default Item;
