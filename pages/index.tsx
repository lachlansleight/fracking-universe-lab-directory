import axios from "axios";
import CentrifugeOutputs from "components/fu/CentrifugeOutputs";
import ExtractionOutputs from "components/fu/ExtractionOutputs";
import Item from "components/fu/Item";
import ItemIcon from "components/fu/ItemIcon";
import SmeltingOutputs from "components/fu/SmeltingOutputs";
import ItemInput from "components/ui/ItemInput";
import { FuData, getData } from "lib/fu-data";
import { FuItem, getItems } from "lib/fu-items";
import React, { useEffect, useState } from "react";
import Layout from "../components/layout/Layout";

export const Home = (): JSX.Element => {
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<FuData>();
    const [items, setItems] = useState<FuItem[]>([]);
    const [selectedItem, setSelectedItem] = useState<FuItem>();
    const [asInputs, setAsInputs] = useState<any>({});
    const [centrifuge, setCentrifuge] = useState<
        | "woodenCentrifuge"
        | "ironCentrifuge"
        | "industrialCentrifuge"
        | "labCentrifuge"
        | "gasCentrifuge"
    >("gasCentrifuge");
    const [sifter, setSifter] = useState<"woodenSifter" | "powderSifter">("powderSifter");
    const [crusher, setCrusher] = useState<"rockBreaker" | "rockCrusher">("rockCrusher");
    const [extractor, setExtractor] = useState<
        "handMill" | "extractionLab" | "advancedExtractionLab"
    >("advancedExtractionLab");
    const [smelter, setSmelter] = useState<"electricFurnace" | "blastFurnace" | "arcSmelter">(
        "arcSmelter"
    );
    const [asOutputs, setAsOutputs] = useState<any>({
        centrifuge: {},
        sifter: {},
        crusher: {},
        extractor: {},
        smelter: {},
    });

    useEffect(() => {
        const loadAll = async () => {
            const data = getData();
            const items = getItems();
            setItems(items);
            setData(data);
            setLoading(false);
        };

        loadAll();
    }, []);

    useEffect(() => {
        if (!data) return;
        if (!selectedItem) return;

        const asInput: any = {};
        if (data.woodenCentrifuge[selectedItem.itemName])
            asInput.woodenCentrifuge = data.woodenCentrifuge[selectedItem.itemName];
        if (data.ironCentrifuge[selectedItem.itemName])
            asInput.ironCentrifuge = data.ironCentrifuge[selectedItem.itemName];
        if (data.industrialCentrifuge[selectedItem.itemName])
            asInput.industrialCentrifuge = data.industrialCentrifuge[selectedItem.itemName];
        if (data.labCentrifuge[selectedItem.itemName])
            asInput.labCentrifuge = data.labCentrifuge[selectedItem.itemName];
        if (data.gasCentrifuge[selectedItem.itemName])
            asInput.gasCentrifuge = data.gasCentrifuge[selectedItem.itemName];

        if (data.woodenSifter[selectedItem.itemName])
            asInput.woodenSifter = data.woodenSifter[selectedItem.itemName];
        if (data.powderSifter[selectedItem.itemName])
            asInput.powderSifter = data.powderSifter[selectedItem.itemName];

        if (data.rockBreaker[selectedItem.itemName])
            asInput.rockBreaker = data.rockBreaker[selectedItem.itemName];
        if (data.rockCrusher[selectedItem.itemName])
            asInput.rockCrusher = data.rockCrusher[selectedItem.itemName];

        if (data.handMill[selectedItem.itemName])
            asInput.handMill = data.handMill[selectedItem.itemName];
        if (data.extractionLab[selectedItem.itemName])
            asInput.extractionLab = data.extractionLab[selectedItem.itemName];
        if (data.advancedExtractionLab[selectedItem.itemName])
            asInput.advancedExtractionLab = data.advancedExtractionLab[selectedItem.itemName];

        if (data.electricFurnace[selectedItem.itemName])
            asInput.electricFurnace = data.electricFurnace[selectedItem.itemName];
        if (data.blastFurnace[selectedItem.itemName])
            asInput.blastFurnace = data.blastFurnace[selectedItem.itemName];
        if (data.arcSmelter[selectedItem.itemName])
            asInput.arcSmelter = data.arcSmelter[selectedItem.itemName];
        setAsInputs(asInput);

        const asOutput: any = {
            centrifuge: {},
            sifter: {},
            crusher: {},
            extractor: {},
            smelter: {},
        };
        switch (centrifuge) {
            case "woodenCentrifuge":
                Object.keys(data.woodenCentrifuge)
                    .filter(key => {
                        return !!data.woodenCentrifuge[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.centrifuge[key] = data.woodenCentrifuge[key]));
                break;
            case "ironCentrifuge":
                Object.keys(data.ironCentrifuge)
                    .filter(key => {
                        return !!data.ironCentrifuge[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.centrifuge[key] = data.ironCentrifuge[key]));
                break;
            case "industrialCentrifuge":
                Object.keys(data.industrialCentrifuge)
                    .filter(key => {
                        return !!data.industrialCentrifuge[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.centrifuge[key] = data.industrialCentrifuge[key]));
                break;
            case "labCentrifuge":
                Object.keys(data.labCentrifuge)
                    .filter(key => {
                        return !!data.labCentrifuge[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.centrifuge[key] = data.labCentrifuge[key]));
                break;
            case "gasCentrifuge":
                Object.keys(data.gasCentrifuge)
                    .filter(key => {
                        return !!data.gasCentrifuge[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.centrifuge[key] = data.gasCentrifuge[key]));
                break;
        }
        switch (sifter) {
            case "woodenSifter":
                Object.keys(data.woodenSifter)
                    .filter(key => {
                        return !!data.woodenSifter[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.sifter[key] = data.woodenSifter[key]));
                break;
            case "powderSifter":
                Object.keys(data.powderSifter)
                    .filter(key => {
                        return !!data.powderSifter[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.sifter[key] = data.powderSifter[key]));
                break;
        }
        switch (crusher) {
            case "rockBreaker":
                Object.keys(data.rockBreaker)
                    .filter(key => {
                        return !!data.rockBreaker[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.crusher[key] = data.rockBreaker[key]));
                break;
            case "rockCrusher":
                Object.keys(data.rockCrusher)
                    .filter(key => {
                        return !!data.rockCrusher[key]?.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.crusher[key] = data.rockCrusher[key]));
                break;
        }
        switch (extractor) {
            case "handMill":
                Object.keys(data.handMill)
                    .filter(key => {
                        return !!data.handMill[key]?.outputs.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.extractor[key] = data.handMill[key]));
                break;
            case "extractionLab":
                Object.keys(data.extractionLab)
                    .filter(key => {
                        return !!data.extractionLab[key]?.outputs.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.extractor[key] = data.extractionLab[key]));
                break;
            case "advancedExtractionLab":
                Object.keys(data.advancedExtractionLab)
                    .filter(key => {
                        return !!data.advancedExtractionLab[key]?.outputs.find(
                            output => output.item === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.extractor[key] = data.advancedExtractionLab[key]));
                break;
        }
        switch (smelter) {
            case "electricFurnace":
                Object.keys(data.electricFurnace)
                    .filter(key => {
                        return (
                            !!data.electricFurnace[key]?.bonusOutputs.find(
                                output => output.item === selectedItem.itemName
                            ) || data.electricFurnace[key]?.output === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.smelter[key] = data.electricFurnace[key]));
                break;
            case "blastFurnace":
                Object.keys(data.blastFurnace)
                    .filter(key => {
                        return (
                            !!data.blastFurnace[key]?.bonusOutputs.find(
                                output => output.item === selectedItem.itemName
                            ) || data.blastFurnace[key]?.output === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.smelter[key] = data.blastFurnace[key]));
                break;
            case "arcSmelter":
                Object.keys(data.arcSmelter)
                    .filter(key => {
                        return (
                            !!data.arcSmelter[key]?.bonusOutputs.find(
                                output => output.item === selectedItem.itemName
                            ) || data.arcSmelter[key]?.output === selectedItem.itemName
                        );
                    })
                    .forEach(key => (asOutput.smelter[key] = data.arcSmelter[key]));
                break;
        }
        setAsOutputs(asOutput);
    }, [selectedItem, data, centrifuge, sifter, crusher, extractor, smelter]);

    if (loading)
        return (
            <Layout>
                <h1 className="text-2xl font-pixel">Loading</h1>
            </Layout>
        );

    return (
        <Layout>
            <div className="flex gap-4 items-center my-4">
                <ItemIcon item={selectedItem || items[0]} border={true} className="w-12 h-12" />
                <ItemInput
                    label="Item"
                    id="item-input"
                    items={items}
                    onChange={(item: FuItem) => setSelectedItem(item)}
                    value={selectedItem || items[0]}
                    className="bg-gray-800 font-pixel w-full h-12 rounded px-4"
                />
            </div>
            {selectedItem && (
                <>
                    {selectedItem.shortDescription === "..." ? (
                        <div>
                            <p className="font-pixel text-2xl text-center mt-8 text-shadow-hard">
                                Enter an item to get started
                            </p>
                        </div>
                    ) : (
                        <Item item={selectedItem} />
                    )}
                    {Object.keys(asInputs).length === 0 ? null : (
                        <div className="flex flex-col gap-4 mt-4">
                            <h1 className="font-pixel border-t border-b w-full bg-black bg-opacity-10 text-4xl px-4 py-2">
                                As Input
                            </h1>
                            {(asInputs.woodenCentrifuge ||
                                asInputs.ironCentrifuge ||
                                asInputs.industrialCentrifuge ||
                                asInputs.labCentrifuge ||
                                asInputs.gasCentrifuge) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {asInputs.woodenCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="woodenCentrifuge"
                                            outputs={asInputs.woodenCentrifuge}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.ironCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="ironCentrifuge"
                                            outputs={asInputs.ironCentrifuge}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.industrialCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="industrialCentrifuge"
                                            outputs={asInputs.industrialCentrifuge}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.labCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="labCentrifuge"
                                            outputs={asInputs.labCentrifuge}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.gasCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="gasCentrifuge"
                                            outputs={asInputs.gasCentrifuge}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                </div>
                            )}
                            {(asInputs.woodenSifter || asInputs.powderSifter) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {asInputs.woodenSifter && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="woodenSifter"
                                            outputs={asInputs.woodenSifter}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.powderSifter && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="powderSifter"
                                            outputs={asInputs.powderSifter}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                </div>
                            )}
                            {(asInputs.rockBreaker || asInputs.rockCrusher) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {asInputs.rockBreaker && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="rockBreaker"
                                            outputs={asInputs.rockBreaker}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.rockCrusher && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="rockCrusher"
                                            outputs={asInputs.rockCrusher}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                </div>
                            )}
                            {(asInputs.handMill ||
                                asInputs.extractionLab ||
                                asInputs.advancedExtractionLab) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {asInputs.handMill && (
                                        <ExtractionOutputs
                                            input={selectedItem}
                                            station="handMill"
                                            recipe={asInputs.handMill}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.extractionLab && (
                                        <ExtractionOutputs
                                            input={selectedItem}
                                            station="extractionLab"
                                            recipe={asInputs.extractionLab}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.advancedExtractionLab && (
                                        <ExtractionOutputs
                                            input={selectedItem}
                                            station="advancedExtractionLab"
                                            recipe={asInputs.advancedExtractionLab}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                </div>
                            )}
                            {(asInputs.electricFurnace ||
                                asInputs.blastFurnace ||
                                asInputs.arcSmelter) && (
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {asInputs.electricFurnace && (
                                        <SmeltingOutputs
                                            input={selectedItem}
                                            station="electricFurnace"
                                            recipe={asInputs.electricFurnace}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.blastFurnace && (
                                        <SmeltingOutputs
                                            input={selectedItem}
                                            station="blastFurnace"
                                            recipe={asInputs.blastFurnace}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                    {asInputs.arcSmelter && (
                                        <SmeltingOutputs
                                            input={selectedItem}
                                            station="arcSmelter"
                                            recipe={asInputs.arcSmelter}
                                            allItems={items}
                                            onItemClick={setSelectedItem}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    )}

                    {Object.keys(asOutputs.centrifuge).length +
                        Object.keys(asOutputs.sifter).length +
                        Object.keys(asOutputs.crusher).length +
                        Object.keys(asOutputs.extractor).length +
                        Object.keys(asOutputs.smelter).length >
                        0 && (
                        <div className="flex flex-col gap-4 mt-8">
                            <h1 className="font-pix`el border-t border-b w-full bg-black bg-opacity-10 text-4xl px-4 py-2">
                                As Output
                            </h1>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {asOutputs.centrifuge &&
                                    Object.keys(asOutputs.centrifuge).map(itemName => {
                                        const item = items.find(i => i.itemName === itemName);
                                        if (!item) return null;
                                        return (
                                            <CentrifugeOutputs
                                                key={centrifuge + "_" + item.itemName}
                                                input={item}
                                                station={centrifuge}
                                                outputs={asOutputs.centrifuge[itemName]}
                                                allItems={items}
                                                onItemClick={setSelectedItem}
                                            />
                                        );
                                    })}
                            </ul>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {asOutputs.sifter &&
                                    Object.keys(asOutputs.sifter).map(itemName => {
                                        const item = items.find(i => i.itemName === itemName);
                                        if (!item) return null;
                                        return (
                                            <CentrifugeOutputs
                                                key={sifter + "_" + item.itemName}
                                                input={item}
                                                station={sifter}
                                                outputs={asOutputs.sifter[itemName]}
                                                allItems={items}
                                                onItemClick={setSelectedItem}
                                            />
                                        );
                                    })}
                            </ul>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {asOutputs.crusher &&
                                    Object.keys(asOutputs.crusher).map(itemName => {
                                        const item = items.find(i => i.itemName === itemName);
                                        if (!item) return null;
                                        return (
                                            <CentrifugeOutputs
                                                key={crusher + "_" + item.itemName}
                                                input={item}
                                                station={crusher}
                                                outputs={asOutputs.crusher[itemName]}
                                                allItems={items}
                                                onItemClick={setSelectedItem}
                                            />
                                        );
                                    })}
                            </ul>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {asOutputs.extractor &&
                                    Object.keys(asOutputs.extractor).map(itemName => {
                                        const item = items.find(i => i.itemName === itemName);
                                        if (!item) return null;
                                        return (
                                            <ExtractionOutputs
                                                key={crusher + "_" + item.itemName}
                                                input={item}
                                                station={extractor}
                                                recipe={asOutputs.extractor[itemName]}
                                                allItems={items}
                                                onItemClick={setSelectedItem}
                                            />
                                        );
                                    })}
                            </ul>
                            <ul className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {asOutputs.smelter &&
                                    Object.keys(asOutputs.smelter).map(itemName => {
                                        const item = items.find(i => i.itemName === itemName);
                                        if (!item) return null;
                                        return (
                                            <SmeltingOutputs
                                                key={smelter + "_" + item.itemName}
                                                input={item}
                                                station={smelter}
                                                recipe={asOutputs.smelter[itemName]}
                                                allItems={items}
                                                onItemClick={setSelectedItem}
                                            />
                                        );
                                    })}
                            </ul>
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
};

export default Home;
