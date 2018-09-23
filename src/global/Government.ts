import { Role } from "role/Role";
import { CreepResource } from "room/CreepResource";
import { RoomAdministration } from "room/RoomAdministration";

export class Government {

    public static roles: { [roleId: string]: Role } = {};
    public static rooms: { [roomId: string]: RoomAdministration } = {};

    public static establish() {

        console.log("[GOV] Establish: Establishing room administrations...");
        for (const roomId in Game.rooms) {
            const room = Game.rooms[roomId];
            if (room.find(FIND_MY_SPAWNS).length > 0) {
                const administration = new RoomAdministration(Game.rooms[roomId]);
                Government.rooms[roomId] = administration;
                administration.createTaskForces();
            }
        }

        console.log("[GOV] Establish: Assigning existing creeps to taskforces...");

        for (const creepName in Game.creeps) {

            const creep = Game.creeps[creepName];
            if (creep.memory.role === undefined || creep.memory.room === undefined || creep.memory.taskforce === undefined || creep.memory.available === undefined) {
                console.log(`[GOV] WARN: Creep ${creepName} has corrupted memory and could not be assigned to a taskforce.`);
                creep.memory = {
                    available: true,
                    role: "None",
                    room: creep.room.name,
                    state: undefined,
                    taskforce: "None"
                }
                continue;
            }

            const administration = Government.rooms[creep.memory.room];

            if (administration !== undefined) {
                const role = Government.roles[creep.memory.role];
                const taskforce = administration.taskForces[creep.memory.taskforce];
                const requiredParts: BodyPartConstant[] = [];
                creep.body.forEach((part) => requiredParts.push(part.type));

                if (taskforce !== undefined && role !== undefined) {
                    const resource = new CreepResource(requiredParts, administration, taskforce, role);
                    resource.creepName = creepName;
                    creep.memory.available = false;
                    taskforce.assign(resource);
                } else {
                    console.log(`[GOV] WARN: Creep ${creepName} belongs to unknown taskforce \"${creep.memory.taskforce}\" or role \"${creep.memory.role}\"`);
                    creep.memory.available = true;
                }

            } else {
                console.log(`[GOV] WARN: Creep ${creepName} belongs to unknown room administration \"${creep.memory.room}\"`);
                creep.memory.available = true;
            }
        }

        console.log("[GOV] Government established.");
        Memory.governmentEstablished = true;
    }

    public static tick() {
        for (const roomId in Government.rooms) {
            Government.rooms[roomId].tick();
        }
    }


}
