import { Government } from "global/Government";

export abstract class Role {

    public id: string;

    constructor(id: string) {
        this.id = id;
        Government.roles[id] = this;
    }

    public abstract tick(creep: Creep): void;

}
