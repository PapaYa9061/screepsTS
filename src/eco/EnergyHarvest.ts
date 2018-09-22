import { RoleHarvester } from "role/Harvester";
import { CreepResource } from "gov/CreepResource";
import { RoomGovernment } from "gov/RoomGovernment";

export class EnergyHarvest {

    private workers: CreepResource[] = [];

    constructor(public government: RoomGovernment, public source: Source, public supplyTarget: Structure<StructureConstant>) {

    }

    public tick() {
        for (const worker of this.workers) {
            worker.tick();
        }
        if (this.workers.length < 3) {
            this.government.acquireCreepResource([WORK, CARRY, MOVE]);
        }
    }

}
