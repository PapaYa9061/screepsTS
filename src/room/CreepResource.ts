import { Role } from "role/Role";
import { TaskForce } from "taskforce/TaskForce";
import { RoomAdministration } from "./RoomAdministration";

export class CreepResource {

    public administration: RoomAdministration;
    public creepName: string | undefined = undefined;
    public inProduction: boolean = false;
    public requiredParts: BodyPartConstant[];
    public producedAt: StructureSpawn | undefined = undefined;
    public released: boolean = false;
    public role: Role;
    public taskforce: TaskForce;

    constructor(requiredParts: BodyPartConstant[], administration: RoomAdministration, taskforce: TaskForce, role: Role) {
        this.requiredParts = requiredParts;
        this.administration = administration;
        this.taskforce = taskforce;
        this.role = role;
    }

    public tick() {
        if (!this.inProduction) {
            if (this.creepName !== undefined) {
                const creep = Game.creeps[this.creepName];

                if (creep === undefined) {
                    console.log(`[CSR] Creep ${this.creepName} is dead and will be replaced.`);
                    delete Memory.creeps[this.creepName!];
                    this.administration!.creepDepartment.acquireCreepResource(this);
                    return;
                }

                if (this.role !== undefined) {
                    this.role.tick(creep);
                } else {
                    console.log(`[CRS] WARN: Creep ${this.creepName} has role ${this.role}!`);
                }

            } else {
                console.log("[CRS] ERR: CreepResource without creepName!");
            }
        } else {
            if (this.creepName !== undefined && this.creepName in Game.creeps) {
                this.inProduction = false;
                this.createMemory();
            }
        }
    }

    public release() {
        const creep = Game.creeps[this.creepName!];
        if (creep !== undefined) {
            creep.memory.role = "None";
            creep.memory.taskforce = "None";
            creep.memory.available = true;

            this.creepName = undefined;
            this.requiredParts = [];
            this.producedAt = undefined;
        }
        this.released = true;
    }

    public createMemory() {
        Memory.creeps[this.creepName!] = {
            available: false,
            role: this.role.id,
            room: this.administration.id,
            state: undefined,
            taskforce: this.taskforce.id
        };
    }
}
