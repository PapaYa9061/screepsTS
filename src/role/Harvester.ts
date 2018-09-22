import { Role } from "./Role";

export class RoleHarvester extends Role {

    private source: Source;
    private transferTarget: Structure<StructureConstant>;

    constructor(source: Source, transferTarget: Structure<StructureConstant>) {
        super();
        this.source = source;
        this.transferTarget = transferTarget;
    }

    public tick(creep: Creep) {
        if (creep.carry.energy < creep.carryCapacity) {
            if (creep.harvest(this.source) === ERR_NOT_IN_RANGE) {
                creep.moveTo(this.source);
            }
        } else {
            if (creep.transfer(this.transferTarget, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                creep.moveTo(this.transferTarget);
            }
        }
    }

}
