import { Role } from "role/Role";

export class CreepResource {

    public creepName: string | null = null;
    public creep: Creep | null = null;
    public requiredParts: BodyPartConstant[] = [];
    public producedAt: StructureSpawn | null = null;
    public role: Role | null = null;

    public tick() {
        if (this.creep !== null && this.role !== null) {
            this.role.tick(this.creep);
        }
    }
}
