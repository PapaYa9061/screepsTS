import { Role } from "./Role";

export class RoleHarvester extends Role {

    private static HARVESTING: string = "harvesting";
    private static TRANSFERING: string = "tranfering";

    private source: Source;
    private transferTarget: Structure<StructureConstant>;

    constructor(source: Source, transferTarget: Structure<StructureConstant>) {
        super("SimpleHarvester_" + source.id + "_" + transferTarget.id);
        this.source = source;
        this.transferTarget = transferTarget;
    }

    public tick(creep: Creep) {
        if (creep.memory.state === RoleHarvester.HARVESTING) {
            if (creep.harvest(this.source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(this.source);
            }
            if (creep.carry.energy >= creep.carryCapacity) {
                creep.memory.state = RoleHarvester.TRANSFERING;
            }
        } else {
            if (creep.transfer(this.transferTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(this.transferTarget);
            }
            if (creep.carry.energy <= 0) {
                creep.memory.state = RoleHarvester.HARVESTING;
            }
        }
    }

}
