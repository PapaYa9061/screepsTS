export function getAdjacentPositions(pos: RoomPosition): Array<RoomPosition | null> {

    const adjacentPositions: Array<RoomPosition | null> = [];
    const room = Game.rooms[pos.roomName];
    adjacentPositions[0] = room.getPositionAt(pos.x + 1, pos.y);
    adjacentPositions[1] = room.getPositionAt(pos.x + 1, pos.y + 1);
    adjacentPositions[2] = room.getPositionAt(pos.x, pos.y + 1);
    adjacentPositions[3] = room.getPositionAt(pos.x - 1, pos.y + 1);
    adjacentPositions[4] = room.getPositionAt(pos.x - 1, pos.y);
    adjacentPositions[5] = room.getPositionAt(pos.x - 1, pos.y - 1);
    adjacentPositions[6] = room.getPositionAt(pos.x, pos.y - 1);
    adjacentPositions[7] = room.getPositionAt(pos.x + 1, pos.y - 1);

    return adjacentPositions;

}
