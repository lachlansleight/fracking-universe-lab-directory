import centrifugeRecipes from "./data/recipes/centrifugeRecipes.json";
import extractionRecipes from "./data/recipes/extractionRecipes.json";
import woodenCentrifuge from "./data/recipes/woodenCentrifuge.json";
import ironCentrifuge from "./data/recipes/ironCentrifuge.json";
import industrialCentrifuge from "./data/recipes/industrialCentrifuge.json";
import labCentrifuge from "./data/recipes/labCentrifuge.json";
import gasCentrifuge from "./data/recipes/gasCentrifuge.json";
import electricFurnace from "./data/recipes/electricFurnace.json";
import blastFurnace from "./data/recipes/blastFurnace.json";
import arcSmelter from "./data/recipes/arcSmelter.json";
import rockBreaker from "./data/recipes/rockBreaker.json";
import rockCrusher from "./data/recipes/rockCrusher.json";
import woodenSifter from "./data/recipes/woodenSifter.json";
import powderSifter from "./data/recipes/powderSifter.json";
import handmill from "./data/recipes/handmill.json";
import extractionLab from "./data/recipes/extractionLab.json";
import extractionLabAdv from "./data/recipes/extractionLabAdv.json";

export type OutputRarity = "rarest" | "rare" | "uncommon" | "normal" | "common";

export type CentrifugeOutput = {
    item: string;
    chance: number;
};

export interface ExtractionRecipe {
    inputCount: number;
    outputs: {
        item: string;
        count: number;
    }[];
    timeScale?: number;
}

export type SmeltingBonusOutput = {
    item: string;
    chance: number;
};

export interface SmeltingRecipe {
    inputCount: 2;
    output: string;
    bonusOutputs: SmeltingBonusOutput[];
}

export interface FuData {
    woodenCentrifuge: { [key: string]: CentrifugeOutput[] };
    ironCentrifuge: { [key: string]: CentrifugeOutput[] };
    industrialCentrifuge: { [key: string]: CentrifugeOutput[] };
    labCentrifuge: { [key: string]: CentrifugeOutput[] };
    gasCentrifuge: { [key: string]: CentrifugeOutput[] };

    handMill: { [key: string]: ExtractionRecipe };
    extractionLab: { [key: string]: ExtractionRecipe };
    advancedExtractionLab: { [key: string]: ExtractionRecipe };

    electricFurnace: { [key: string]: SmeltingRecipe };
    blastFurnace: { [key: string]: SmeltingRecipe };
    arcSmelter: { [key: string]: SmeltingRecipe };

    woodenSifter: { [key: string]: CentrifugeOutput[] };
    powderSifter: { [key: string]: CentrifugeOutput[] };

    rockBreaker: { [key: string]: CentrifugeOutput[] };
    rockCrusher: { [key: string]: CentrifugeOutput[] };
}

const mapData = (data: any): FuData => {
    //todo - make the data that the repo spits out in the more useful form outlined in FuData :)
    const fuData: FuData = {
        woodenCentrifuge: {},
        ironCentrifuge: {},
        industrialCentrifuge: {},
        labCentrifuge: {},
        gasCentrifuge: {},

        handMill: {},
        extractionLab: {},
        advancedExtractionLab: {},

        electricFurnace: {},
        blastFurnace: {},
        arcSmelter: {},

        woodenSifter: {},
        powderSifter: {},

        rockBreaker: {},
        rockCrusher: {},
    };

    //centrifuges, sifters and breakers
    const getCentrifugeOutputs = (inputData: any, baseChances: any): CentrifugeOutput[] => {
        const outputs: CentrifugeOutput[] = [];
        Object.keys(inputData).forEach(key => {
            outputs.push({
                item: key,
                chance: baseChances[inputData[key][0]] / inputData[key][1],
            });
        });
        return outputs;
    };
    Object.keys(data.centrifugeRecipes.itemMapFarm).forEach(key => {
        fuData.woodenCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapFarm[key],
            data.woodenCentrifuge.itemChances
        );
        fuData.ironCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapFarm[key],
            data.ironCentrifuge.itemChances
        );
        fuData.industrialCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapFarm[key],
            data.industrialCentrifuge.itemChances
        );
        fuData.labCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapFarm[key],
            data.labCentrifuge.itemChances
        );
        fuData.gasCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapFarm[key],
            data.gasCentrifuge.itemChances
        );
    });
    Object.keys(data.centrifugeRecipes.itemMapBees).forEach(key => {
        fuData.woodenCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapBees[key],
            data.woodenCentrifuge.itemChances
        );
        fuData.ironCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapBees[key],
            data.ironCentrifuge.itemChances
        );
        fuData.industrialCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapBees[key],
            data.industrialCentrifuge.itemChances
        );
        fuData.labCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapBees[key],
            data.labCentrifuge.itemChances
        );
        fuData.gasCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapBees[key],
            data.gasCentrifuge.itemChances
        );
    });
    Object.keys(data.centrifugeRecipes.itemMapLiquids).forEach(key => {
        fuData.ironCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapLiquids[key],
            data.ironCentrifuge.itemChances
        );
        fuData.industrialCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapLiquids[key],
            data.industrialCentrifuge.itemChances
        );
        fuData.labCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapLiquids[key],
            data.labCentrifuge.itemChances
        );
        fuData.gasCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapLiquids[key],
            data.gasCentrifuge.itemChances
        );
    });
    Object.keys(data.centrifugeRecipes.itemMapIsotopes).forEach(key => {
        fuData.gasCentrifuge[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapIsotopes[key],
            data.gasCentrifuge.itemChances
        );
    });
    Object.keys(data.centrifugeRecipes.itemMapPowder).forEach(key => {
        fuData.woodenSifter[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapPowder[key],
            data.woodenSifter.itemChances
        );
        fuData.powderSifter[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapPowder[key],
            data.powderSifter.itemChances
        );
    });
    Object.keys(data.centrifugeRecipes.itemMapRocks).forEach(key => {
        fuData.rockBreaker[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapRocks[key],
            data.rockBreaker.itemChances
        );
        fuData.rockCrusher[key] = getCentrifugeOutputs(
            data.centrifugeRecipes.itemMapRocks[key],
            data.rockCrusher.itemChances
        );
    });

    //extraction lab
    data.extractionRecipes.forEach((recipe: any) => {
        const item = Object.keys(recipe.inputs)[0];
        const outputItems = Object.keys(recipe.outputs);
        fuData.handMill[item] = {
            inputCount:
                recipe.inputs[item].length === 1 ? recipe.inputs[item] : recipe.inputs[item][0],
            outputs: outputItems.map(itemName => ({
                item: itemName,
                count: recipe.outputs[itemName][0],
            })),
        };
        if (recipe.timeScale) fuData.handMill[item].timeScale = recipe.timeScale[0];

        fuData.extractionLab[item] = {
            inputCount:
                recipe.inputs[item].length === 1 ? recipe.inputs[item] : recipe.inputs[item][1],
            outputs: outputItems.map(itemName => ({
                item: itemName,
                count: recipe.outputs[itemName][1],
            })),
        };
        if (recipe.timeScale) fuData.extractionLab[item].timeScale = recipe.timeScale[1];

        fuData.advancedExtractionLab[item] = {
            inputCount:
                recipe.inputs[item].length === 1 ? recipe.inputs[item] : recipe.inputs[item][2],
            outputs: outputItems.map(itemName => ({
                item: itemName,
                count: recipe.outputs[itemName][2],
            })),
        };
        if (recipe.timeScale) fuData.advancedExtractionLab[item].timeScale = recipe.timeScale[2];
    });

    //furnace
    const getFurnaceData = (inputData: any): { [key: string]: SmeltingRecipe } => {
        const outputData: { [key: string]: SmeltingRecipe } = {};
        Object.keys(inputData.inputsToOutputs).forEach(input => {
            outputData[input] = {
                inputCount: 2,
                output: inputData.inputsToOutputs[input],
                bonusOutputs: [],
            };
        });
        Object.keys(inputData.bonusOutputs).forEach((input: any) => {
            let sum = 0;
            Object.keys(inputData.bonusOutputs[input]).forEach((output: any) => {
                const chance =
                    (Number(inputData.bonusOutputs[input][output]) *
                        Number(inputData.fu_extraProductionChance)) /
                    100;
                if (!outputData[input]) {
                    outputData[input] = {
                        inputCount: 2,
                        output: "",
                        bonusOutputs: [
                            {
                                item: output,
                                chance: chance * (1 - sum),
                            },
                        ],
                    };
                } else {
                    outputData[input].bonusOutputs.push({
                        item: output,
                        chance: chance * (1 - sum),
                    });
                }
                sum += chance;
            });
        });
        return outputData;
    };

    fuData.electricFurnace = getFurnaceData(data.electricFurnace);
    fuData.blastFurnace = getFurnaceData(data.blastFurnace);
    fuData.arcSmelter = getFurnaceData(data.arcSmelter);

    return fuData;
};

export const getData = (): FuData => {
    return mapData({
        centrifugeRecipes,
        extractionRecipes,

        woodenCentrifuge,
        ironCentrifuge,
        industrialCentrifuge,
        labCentrifuge,
        gasCentrifuge,

        electricFurnace,
        blastFurnace,
        arcSmelter,

        rockBreaker,
        rockCrusher,

        woodenSifter,
        powderSifter,

        handmill,
        extractionLab,
        extractionLabAdv,
    });
};
