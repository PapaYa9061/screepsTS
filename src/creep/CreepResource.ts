export class CreepResource {

    public creepName: string;
    public creep: Creep | null = null;
    public producedAt: StructureSpawn | null = null;

    constructor(creepName: string) {
        this.creepName = creepName;
    }

}
