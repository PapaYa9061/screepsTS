import { Role } from "./Role";

export class Builder extends Role {

    private static BUILDING = "building";
    private static REFILLING = "refilling";

    private static currentId: number = 1;

    public constructionSite: ConstructionSite<BuildableStructureConstant> | undefined = undefined;

    constructor() {
        super("Builder_" + (Builder.currentId++));
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
            // TODO: collect energy from somewhere
            if (creep.carry.energy >= creep.carryCapacity) {
                creep.memory.state = Builder.BUILDING;
            }
        }
    }

}
