import liquids from "./data/liquids.json";
import materials from "./data/materials.json";
import items from "./data/items.json";
import currency from "./data/currency.json";

export type FuItem = {
    itemName: string;
    itemType: "liquid" | "material" | "item" | "currency";
    rarity: "common" | "uncommon" | "rare" | "legendary" | "essential";
    icon: string;
    description: string;
    shortDescription: string;
};

const formatItem = (item: any, type: "liquid" | "material" | "item" | "currency"): FuItem => {
    const shortDescriptionPieces = item.shortdescription.split(";");
    const output: FuItem = {
        itemName: item.itemName,
        itemType: type,
        rarity: item.rarity.toLowerCase() || "common",
        icon: item.inventoryIcon,
        description: item.description,
        shortDescription:
            shortDescriptionPieces.length === 1
                ? shortDescriptionPieces[0]
                : shortDescriptionPieces[1].split("^")[0],
    };
    return output;
};

export const getItems = (): FuItem[] => {
    return [
        ...liquids.map(item => formatItem(item, "liquid")),
        ...materials.map(item => formatItem(item, "material")),
        ...items.map(item => formatItem(item, "item")),
        ...currency.map(item => formatItem(item, "currency")),
    ].sort((a, b) => a.shortDescription.localeCompare(b.shortDescription));
};
