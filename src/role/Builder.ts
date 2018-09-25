import { Role } from "./Role";

export class Builder extends Role {

    private static BUILDING = "building";
    private static REFILLING = "refilling";

    private static currentId: number = 1;

    public constructionSite: ConstructionSite<BuildableStructureConstant> | undefined = undefined;
    public energySource: Source | Structure<StructureConstant> | Tombstone;

    constructor(energySource: Source | Structure<StructureConstant> | Tombstone) {
        super("Builder_" + (Builder.currentId++));
        this.energySource = energySource;
    }

    public tick(creep: Creep) {
        if (creep.memory.state === Builder.BUILDING) {
            if (this.constructionSite !== undefined) {
                if (creep.build(this.constructionSite) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(this.constructionSite);
                }
            }
            if (creep.carry.energy <= 0) {
                creep.memory.state = Builder.REFILLING;
            }
        } else {
            if (this.energySource instanceof Source) {
                if (creep.harvest(this.energySource) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(this.energySource);
                }
            } else {
                if (creep.withdraw(this.energySource, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
                    creep.moveTo(this.energySource);
                }
            }
            if (creep.carry.energy >= creep.carryCapacity) {
                creep.memory.state = Builder.BUILDING;
            }
        }
    }

}
