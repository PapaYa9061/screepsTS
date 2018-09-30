import { StaticHarvester } from "role/StaticHarvester";
import { CreepResource } from "room/CreepResource";
import { RoomAdministration } from "room/RoomAdministration";
import { TaskForce } from "./TaskForce";

export class StaticEnergyHarvest extends TaskForce {

    private roleHarvest: StaticHarvester;
    public source: Source;

    constructor(administration: RoomAdministration, source: Source) {
        super(administration, "StaticEnergyHarvest_" + source.id);
        this.source = source;

        this.roleHarvest = new StaticHarvester(source);

        this.calculateWorkersRequired(source);
    }

    public tick() {
        super.tick();
    }

    public queueForRetrieval(creep: CreepResource) {

    }

    protected createNextWorkerResource(): CreepResource {
        return new CreepResource([WORK, WORK, CARRY, MOVE], this.administration, this, this.roleHarvest);
    }

    private calculateWorkersRequired(source: Source) {
        const prox = source.room.lookForAtArea(LOOK_TERRAIN, source.pos.y - 1, source.pos.x - 1, source.pos.y + 1, source.pos.x + 1, true);
        this.workersRequired = 0;
        for (const look of prox) {
            if (look.terrain !== "wall") {
                this.workersRequired++;
            }
        }
    }


}
