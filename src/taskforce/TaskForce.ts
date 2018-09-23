import { CreepResource } from "room/CreepResource";
import { RoomAdministration } from "room/RoomAdministration";

export class TaskForce {

    public id: string;
    protected workers: CreepResource[] = [];
    public workersRequired: number = 1;

    constructor(public administration: RoomAdministration, subId: string) {
        this.id = administration.room.name + "_" + subId;
    }

    public assign(worker: CreepResource) {
        this.workers.push(worker);
    }

    public tick() {
        for (const worker of this.workers) {
            worker.tick();
        }
    }

}
