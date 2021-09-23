import { CentrifugeOutput } from "lib/fu-data";
import { FuItem } from "lib/fu-items";
import ItemIcon from "./ItemIcon";
import RawIcon from "./RawIcon";

const getIcon = (station: string) => {
    switch (station) {
        case "woodenCentrifuge":
            return "/icons/stations/woodencentrifugeicon.png";
        case "ironCentrifuge":
            return "/icons/stations/ironcentrifugeicon.png";
        case "industrialCentrifuge":
            return "/icons/stations/industrialcentrifugeicon.png";
        case "labCentrifuge":
            return "/icons/stations/centrifugeicon.png";
        case "gasCentrifuge":
            return "/icons/stations/centrifuge2icon.png";
        case "electricFurnace":
            return "/icons/stations/electricfurnace_inv.png";
        case "blastFurnace":
            return "/icons/stations/fu_blastfurnace_inv.png";
        case "arcSmelter":
            return "/icons/stations/isn_arcsmelter_inv.png";
        case "rockBreaker":
            return "/icons/stations/fu_rockbreakericon.png";
        case "rockCrusher":
            return "/icons/stations/fu_rockcrushericon.png";
        case "woodenSifter":
            return "/icons/stations/fu_woodensiftericon.png";
        case "powderSifter":
            return "/icons/stations/isn_powdersiftericon.png";
        case "handmill":
            return "/icons/stations/handmillicon.png";
        case "extractionLab":
            return "/icons/stations/extractionlabicon.png";
        case "extractionLabAdv":
            return "/icons/stations/extractionlabicon.png"; //same icon as normal lab
    }

    return "";
};

const camelCaseToTitleCase = (str: string) => {
    return str.replace(/([A-Z])/g, " $1").replace(/^./, function (str) {
        return str.toUpperCase();
    });
};

const CentrifugeOutputs = ({
    input,
    station,
    outputs,
    allItems,
}: {
    input: FuItem;
    station: string;
    outputs: CentrifugeOutput[];
    allItems: FuItem[];
}) => {
    return (
        <div className="border border-black rounded bg-black bg-opacity-10">
            <div className="flex items-center gap-4 border-b border-black px-2 py-1">
                <RawIcon url={getIcon(station)} className="w-12 h-12" />
                <h2 className="font-pixel">{camelCaseToTitleCase(station)}</h2>
            </div>
            <div className="p-4 flex items-center gap-2 bg-black bg-opacity-10 border-b border-black">
                <h3 className="font-pixel">Input:</h3>
                <ItemIcon item={input} border={true} className="w-8 h-8" />
                <h3 className="font-pixel">{input.shortDescription} x 1</h3>
            </div>
            <ul className="p-4 flex flex-col gap-2 bg-black bg-opacity-10">
                {outputs
                    .sort((a, b) => b.chance - a.chance)
                    .map(output => {
                        const item = allItems.find(i => i.itemName === output.item);
                        if (!item)
                            return (
                                <li
                                    key={station + "_" + output.item}
                                    className="flex flex-row items-center gap-2"
                                >
                                    <div className="w-8 h-8 grid place-items-center bg-red-800 rounded text-black font-pixel p-0 relative">
                                        <span className="text-white text-shadow-hard text-2xl relative left-0.5 top-0.5">
                                            !
                                        </span>
                                    </div>
                                    <h3 className="font-pixel">{output.item}</h3>
                                    <h3 className="font-pixel">
                                        {output.chance < 0.001
                                            ? Math.round(output.chance * 10000) / 100
                                            : Math.round(output.chance * 1000) / 10}
                                        %
                                    </h3>
                                </li>
                            );
                        return (
                            <li
                                key={station + "_" + output.item}
                                className="flex flex-row items-center gap-2"
                            >
                                <ItemIcon item={item} border={true} className="w-8 h-8" />
                                <h3 className="font-pixel">{item.shortDescription}</h3>
                                <h3 className="font-pixel">
                                    {output.chance < 0.001
                                        ? Math.round(output.chance * 10000) / 100
                                        : Math.round(output.chance * 1000) / 10}
                                    %
                                </h3>
                            </li>
                        );
                    })}
            </ul>
        </div>
    );
};

export default CentrifugeOutputs;
