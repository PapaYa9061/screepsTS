import { Government } from "global/Government";

export abstract class Role {

    public id: string;
    public requiredParts: BodyPartConstant[] = [WORK, CARRY, MOVE];

    constructor(id: string) {
        this.id = id;
        Government.roles[id] = this;
    }

    public abstract tick(creep: Creep): void;

}
