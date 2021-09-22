import axios from "axios";

export type OutputRarity = "rarest" | "rare" | "uncommon" | "normal" | "common";

export type CentrifugeOutput = {
    rarity: OutputRarity;
    divisor: number;
}

export interface ExtractionRecipe {
    inputCount: number;
    outputs: {
        item: string;
        count: number;
    }[],
    timeScale?: number;
    essence?: number;
}

export type SmeltingBonusOutput = {
    item: string;
    chance: number;
}

export interface SmeltingRecipe {
    inputCount: 2;
    output: string;
    bonusOutputs: SmeltingBonusOutput[];
}

export interface FuData {
    woodenCentrifuge: {[key: string]: CentrifugeOutput[]};
    ironCentrifuge: {[key: string]: CentrifugeOutput[]};
    industrialCentrifuge: {[key: string]: CentrifugeOutput[]};
    labCentrifuge: {[key: string]: CentrifugeOutput[]};
    gasCentrifuge: {[key: string]: CentrifugeOutput[]};

    handMill: {[key: string]: ExtractionRecipe};
    extractionLab: {[key: string]: ExtractionRecipe};
    advancedExtractionLab: {[key: string]: ExtractionRecipe};

    electricFurnace: {[key: string]: SmeltingRecipe};
    blastFurnace: {[key: string]: SmeltingRecipe};
    arcSmelter: {[key: string]: SmeltingRecipe};

    woodenSifter: {[key: string]: CentrifugeOutput[]};
    powderSifter: {[key: string]: CentrifugeOutput[]};

    rockBreaker: {[key: string]: CentrifugeOutput[]};
    rockCrusher: {[key: string]: CentrifugeOutput[]};
}

const mapData = (data: any): FuData => {
    //todo - make the data that the repo spits out in the more useful form outlined in FuData :)
}

export const getData = async(): Promise<any> => {
    const repoBase = "https://raw.githubusercontent.com/sayterdarkwynd/FrackinUniverse/master";

    const prepareJson = (raw: string): any => {
        const rawIsString = typeof raw === "string";
        if(!rawIsString) return raw;
        return JSON.parse(raw.replace(/\r/g, "").replace(/\t/g, "").replace(/\""/g, "\"").split("\n").filter(line => {
            return line.trim().substr(0, 2) !== "//";
        }).map(line => {
            const comment = line.split("//");
            return comment[0];
        }).join("\n"));
    }
    
    const fetchJson = async (url: string): Promise<any> => {
        return await prepareJson((await axios(url)).data)
    }

    const centrifugeRecipes = await fetchJson(`${repoBase}/objects/generic/centrifuge_recipes.config`);
    const extractionRecipes = await fetchJson(`${repoBase}/objects/generic/extractionlab_recipes.config`);

    const woodenCentrifuge = await fetchJson(`${repoBase}/objects/bees/woodencentrifuge/woodencentrifuge.object`);
    const ironCentrifuge = await fetchJson(`${repoBase}/objects/bees/ironcentrifuge/ironcentrifuge.object`);
    const industrialCentrifuge = await fetchJson(`${repoBase}/objects/bees/industrialcentrifuge/industrialcentrifuge.object`);
    const labCentrifuge = await fetchJson(`${repoBase}/objects/power/centrifuge/centrifuge.object`);
    const gasCentrifuge = await fetchJson(`${repoBase}/objects/power/centrifuge2/centrifuge2.object`);

    const electricFurnace = await fetchJson(`${repoBase}/objects/power/electricfurnace/electricfurnace.object`);
    const blastFurnace = await fetchJson(`${repoBase}/objects/power/fu_blastfurnace/fu_blastfurnace.object`);
    const arcSmelter = await fetchJson(`${repoBase}/objects/power/isn_arcsmelter/isn_arcsmelter.object`);

    const rockBreaker = await fetchJson(`${repoBase}/objects/power/fu_rockbreaker/fu_rockbreaker.object`);
    const rockCrusher = await fetchJson(`${repoBase}/objects/power/fu_rockcrusher/fu_rockcrusher.object`);

    const woodenSifter = await fetchJson(`${repoBase}/objects/crafting/fu_woodensifter/fu_woodensifter.object`);
    const powderSifter = await fetchJson(`${repoBase}/objects/power/isn_powdersifter/isn_powdersifter.object`);

    const handmill = await fetchJson(`${repoBase}/objects/crafting/handmill/handmill.object`);
    const extractionLab = await fetchJson(`${repoBase}/objects/crafting/extractionlab/extractionlab.object`);
    const extractionLabAdv = await fetchJson(`${repoBase}/objects/crafting/extractionlabadv/extractionlabadv.object`);

    return {
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
    }
}