import { RoleHarvester } from "role/Harvester";

export class EnergyHarvest {

    private workers: Creep[] = [];
    private workerRoles: { [creepName: string]: RoleHarvester } = {};

    constructor(public source: Source, public supplyTarget: Structure<StructureConstant>) {

    }

    public tick() {

    }

}
