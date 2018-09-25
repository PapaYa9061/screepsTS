import { Role } from "./Role";

export class StaticHarvester extends Role {

    public requiredParts: BodyPartConstant[] = [WORK, WORK, CARRY, MOVE]

    constructor(public source: Source) {
        super("StaticHarvester_" + source.id);
    }

    public tick(creep: Creep) {
        if (creep.harvest(this.source) === ERR_NOT_IN_RANGE) {
            creep.moveTo(this.source);
        }
    }

}
