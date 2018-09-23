import { CreepResource } from "./CreepResource";
import { RoomAdministration } from "./RoomAdministration";

export class CreepDepartment {

    private creepConstructionQueue: CreepResource[] = [];
    private resourceAssigns: CreepResource[] = [];
    private creepId: number = 1;

    constructor(public administration: RoomAdministration) {
    }

    public tick() {

        let nextConstruction: CreepResource | undefined = this.creepConstructionQueue[0];
        for (const spawn of this.administration.room.find(FIND_MY_SPAWNS)) {
            if (nextConstruction === undefined) {
                break;
            }
            const result = this.trySpawnCreep(spawn, nextConstruction);
            if (result === OK) {
                nextConstruction!.producedAt = spawn;
                nextConstruction!.inProduction = true;
                console.log(`[ADM] ${this.administration.id}: Creep ${nextConstruction.creepName} under construction.`);
                nextConstruction = this.creepConstructionQueue.shift();
            }
        }
    }

    public acquireCreepResource(resource: CreepResource): void {
        resource.administration = this.administration;
        if (!this.acquireIdleCreep(resource)) {
            this.acquireNewCreep(resource);
        }
    }

    private acquireIdleCreep(resource: CreepResource): boolean {
        for (const creep of this.administration.room.find(FIND_MY_CREEPS)) {
            let hasAllParts: boolean = true;
            const bodyParts: BodyPartConstant[] = [];
            creep.body.forEach((part) => bodyParts.push(part.type));
            for (const part of resource.requiredParts) {
                if (!(bodyParts.includes(part))) {
                    hasAllParts = false;
                    break;
                }
            }
            if (hasAllParts && creep.memory.available) {
                resource.creepName = creep.name;
                resource.createMemory();
                return true;
            }
        }
        return false;
    }

    private acquireNewCreep(resource: CreepResource) {
        resource.creepName = this.nextName();
        resource.inProduction = true;
        this.creepConstructionQueue.push(resource);
        console.log(`[ADM] ${this.administration.id} Construction of creep ${resource.creepName} queued.`);
    }

    private trySpawnCreep(spawn: StructureSpawn, resource: CreepResource): ScreepsReturnCode {
        const resultCode = spawn.spawnCreep(resource.requiredParts, resource.creepName!);
        return resultCode;
    }

    private nextName(): string {
        let creepName: string = this.administration.room.name + "_" + this.creepId;
        this.creepId++;
        if (creepName in Game.creeps) {
            creepName = this.nextName();
        }
        return creepName;
    }

}
