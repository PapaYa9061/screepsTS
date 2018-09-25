import { CreepResource } from "room/CreepResource";
import { RoomAdministration } from "room/RoomAdministration";

export abstract class TaskForce {

    public id: string;
    protected workers: CreepResource[] = [];
    public workersRequired: number = 1;

    constructor(public administration: RoomAdministration, subId: string) {
        this.id = administration.room.name + "_" + subId;
    }

    public assign(worker: CreepResource) {
        this.workers.push(worker);
    }

    public getSize(): number {
        return this.workers.length;
    }

    public tick() {
        for (const worker of this.workers) {
            worker.tick();
        }
        if (this.workers.length < this.workersRequired) {
            const resource = this.createNextWorkerResource();
            this.administration.creepDepartment.acquireCreepResource(resource);
            this.assign(resource);
        }
    }

    public dissolve() {
        for (const worker of this.workers) {
            worker.release();
        }
        this.workers = [];
        delete this.administration.taskForces[this.id];
    }

    protected abstract createNextWorkerResource(): CreepResource;

    protected releaseExcessWorkerResources() {
        while (this.workers.length > this.workersRequired) {
            delete this.workers[this.workersRequired];
        }
    }

}
