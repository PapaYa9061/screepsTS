import { CreepResource } from "./CreepResource";

export class RoomGovernment {

    private creepConstructionQueue: CreepResource[] = [];
    private creepId: number = 1;

    constructor(public room: Room) {

    }

    public tick() {
        let nextConstruction = this.creepConstructionQueue.shift();
        for (const spawn of this.room.find(FIND_MY_SPAWNS)) {
            if (nextConstruction === undefined) {
                break;
            }
            const result = this.trySpawnCreep(spawn, nextConstruction!.requiredParts);
            if (result.resultCode === OK) {
                nextConstruction!.creepName = result.creepName;
                nextConstruction!.producedAt = spawn;
                nextConstruction = this.creepConstructionQueue.shift();
            }
        }
    }

    public acquireCreepResource(requiredParts: BodyPartConstant[]): CreepResource {
        let resource = this.acquireIdleCreep(requiredParts);
        if (resource === null) {
            resource = this.acquireNewCreep(requiredParts);
        }
        return resource;
    }

    private acquireIdleCreep(requiredParts: BodyPartConstant[]): CreepResource | null {
        for (const creep of this.room.find(FIND_MY_CREEPS)) {
            let hasAllParts: boolean = true;
            for (const part of requiredParts) {
                if (!(part in creep.body) {
                    hasAllParts = false;
                    break;
                }
            }
            if (hasAllParts && !creep.memory.working) {
                const resource = new CreepResource();
                resource.creepName = creep.name;
                resource.creep = creep;
                resource.requiredParts = requiredParts;
                return resource;
            }
        }
        return null;
    }

    private acquireNewCreep(requiredParts: BodyPartConstant[]): CreepResource {
        const resource = new CreepResource();
        resource.requiredParts = requiredParts;
        this.creepConstructionQueue.push(resource);
        return resource;
    }

    private trySpawnCreep(spawn: StructureSpawn, requiredParts: BodyPartConstant[]): { resultCode: ScreepsReturnCode, creepName: string } {
        const creepName: string = this.room.name + "_" + this.creepId;
        const resultCode = spawn.spawnCreep(requiredParts, creepName, { memory: { role: "", room: this.room.name, working: true } });
        if (resultCode === ERR_NAME_EXISTS) {
            this.creepId++;
            this.trySpawnCreep(spawn, requiredParts);
        }
        return { resultCode, creepName };
    }

}
