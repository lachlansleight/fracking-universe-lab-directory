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
    const [asOutputs, setAsOutputs] = useState<any>({});

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
    }, [selectedItem, data]);

    if (loading)
        return (
            <Layout>
                <h1 className="text-2xl font-pixel">Loading</h1>
            </Layout>
        );

    console.log(data);

    return (
        <Layout>
            <h1 className="text-2xl font-pixel">Fracking Universe Lab Directory</h1>
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
                    <Item item={selectedItem} />
                    {asInputs === {} ? (
                        <div>
                            <h2 className="text-2xl font-pixel">No inputs</h2>
                        </div>
                    ) : (
                        <div className="flex flex-col gap-4 mt-4">
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
                                        />
                                    )}
                                    {asInputs.ironCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="ironCentrifuge"
                                            outputs={asInputs.ironCentrifuge}
                                            allItems={items}
                                        />
                                    )}
                                    {asInputs.industrialCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="industrialCentrifuge"
                                            outputs={asInputs.industrialCentrifuge}
                                            allItems={items}
                                        />
                                    )}
                                    {asInputs.labCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="labCentrifuge"
                                            outputs={asInputs.labCentrifuge}
                                            allItems={items}
                                        />
                                    )}
                                    {asInputs.gasCentrifuge && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="gasCentrifuge"
                                            outputs={asInputs.gasCentrifuge}
                                            allItems={items}
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
                                        />
                                    )}
                                    {asInputs.powderSifter && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="powderSifter"
                                            outputs={asInputs.powderSifter}
                                            allItems={items}
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
                                        />
                                    )}
                                    {asInputs.rockCrusher && (
                                        <CentrifugeOutputs
                                            input={selectedItem}
                                            station="rockCrusher"
                                            outputs={asInputs.rockCrusher}
                                            allItems={items}
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
                                        />
                                    )}
                                    {asInputs.extractionLab && (
                                        <ExtractionOutputs
                                            input={selectedItem}
                                            station="extractionLab"
                                            recipe={asInputs.extractionLab}
                                            allItems={items}
                                        />
                                    )}
                                    {asInputs.advancedExtractionLab && (
                                        <ExtractionOutputs
                                            input={selectedItem}
                                            station="advancedExtractionLab"
                                            recipe={asInputs.advancedExtractionLab}
                                            allItems={items}
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
                                        />
                                    )}
                                    {asInputs.blastFurnace && (
                                        <SmeltingOutputs
                                            input={selectedItem}
                                            station="blastFurnace"
                                            recipe={asInputs.blastFurnace}
                                            allItems={items}
                                        />
                                    )}
                                    {asInputs.arcSmelter && (
                                        <SmeltingOutputs
                                            input={selectedItem}
                                            station="arcSmelter"
                                            recipe={asInputs.arcSmelter}
                                            allItems={items}
                                        />
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                </>
            )}
        </Layout>
    );
};

export default Home;
