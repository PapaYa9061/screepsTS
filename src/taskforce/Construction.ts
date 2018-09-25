import { Builder } from "role/Builder";
import { CreepResource } from "room/CreepResource";
import { TaskForce } from "./TaskForce";
import { RoomAdministration } from "room/RoomAdministration";

export class Construction extends TaskForce {

    private static currentId: number = 1;

    private roleBuilder: Builder;

    public constructionSite: ConstructionSite | undefined = undefined;

    constructor(administration: RoomAdministration) {
        super(administration, "Construction_" + Construction.currentId++);
        this.roleBuilder = new Builder(this.administration.room.find(FIND_SOURCES)[0]);
    }


    public tick() {
        if (this.constructionSite !== undefined) {

        }
        super.tick();
    }

    protected createNextWorkerResource(): CreepResource {
        return new CreepResource([WORK, CARRY, MOVE], this.administration, this, this.roleBuilder);
    }

    private findNearestStorage(): StructureContainer | StructureStorage | undefined {
        if (this.administration.room.storage !== undefined) {
            return this.administration.room.storage;
        }
        for (const container of this.administration.room.find(FIND_STRUCTURES, s => s.structureType === STRUCTURE_CONTAINER) {

        }
    }

}
