import { RoleHarvester } from "role/RoleHarvester";
import { CreepResource } from "room/CreepResource";
import { RoomAdministration } from "room/RoomAdministration";
import { TaskForce } from "./TaskForce";

export class EnergyHarvest extends TaskForce {

    private roleHarvest: RoleHarvester;
    public source: Source;
    public supplyTarget: Structure<StructureConstant>;

    constructor(administration: RoomAdministration, source: Source, supplyTarget: Structure<StructureConstant>) {
        super(administration, "EnergyHarvest_" + source.id + "_" + supplyTarget.id);
        this.source = source;
        this.supplyTarget = supplyTarget;
        this.roleHarvest = new RoleHarvester(source, supplyTarget);
    }

    public tick() {
        super.tick();
    }

    protected createNextWorkerResource(): CreepResource {
        return new CreepResource([WORK, CARRY, MOVE], this.administration, this, this.roleHarvest);
    }

}
