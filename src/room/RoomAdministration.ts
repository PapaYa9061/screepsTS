import { EnergyHarvest } from "taskforce/EnergyHarvest";
import { TaskForce } from "taskforce/TaskForce";
import { CreepDepartment } from "./CreepDepartment";

export class RoomAdministration {

    public id: string;

    public creepDepartment: CreepDepartment;

    public taskForces: { [id: string]: TaskForce } = {};

    constructor(public room: Room) {
        this.creepDepartment = new CreepDepartment(this);
        this.id = room.name;
    }

    public createTaskForces() {

        const target = this.room.find(FIND_MY_SPAWNS)[0];
        if (target !== undefined) {
            for (const source of this.room.find(FIND_SOURCES)) {
                const harvest = new EnergyHarvest(this, source, target);
                this.taskForces[harvest.id] = harvest;
            }
        }

        if (this.room.controller !== undefined) {
            for (const source of this.room.find(FIND_SOURCES)) {
                const harvest = new EnergyHarvest(this, source, this.room.controller!);
                harvest.workersRequired = 4;
                this.taskForces[harvest.id] = harvest;
            }
        }
    }

    public tick() {
        this.creepDepartment.tick();

        for (const tfid in this.taskForces) {
            this.taskForces[tfid].tick();
        }
    }








}
