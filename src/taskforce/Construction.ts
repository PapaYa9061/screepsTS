import { Builder } from "role/Builder";
import { CreepResource } from "room/CreepResource";
import { TaskForce } from "./TaskForce";

export class Construction extends TaskForce {

    private roleBuilder: Builder = new Builder();

    protected createNextWorkerResource(): CreepResource {
        return new CreepResource([WORK, CARRY, MOVE], this.administration, this, this.roleBuilder);
    }

}
