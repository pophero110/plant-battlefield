import TileEntity from "../entities/TileEntity";
import { destoryMatches } from "./DestoryMatches";
import { findTileIndicesByPosition } from "./FindTile";
import { hasMatchesInBoard } from "./HasMatch";
import { markMatches } from "./MarkMatches";
import swapTile from "./SwapTile";
import GameScene from "../scenes/GameScene";

export function onSwapTile(pointer: Phaser.Input.Pointer) {
  if (this.canSwapTile && this.selectedTile != null) {
    const sourceTileIndices = findTileIndicesByPosition(
      this.selectedTile.sprite.x,
      this.selectedTile.sprite.y,
      this.tileSize,
      this.boardRows,
      this.boardCols
    );

    const deltaX = pointer.x - this.selectedTile.sprite.x;
    const deltaY = pointer.y - this.selectedTile.sprite.y;
    const distanceThreshold = 50;

    if (
      Math.abs(deltaX) > distanceThreshold ||
      Math.abs(deltaY) > distanceThreshold
    ) {
      const direction = determineDirection(deltaX, deltaY);
      if (direction) {
        const { sourceTile, destinationTile } = swapTile(
          sourceTileIndices,
          direction,
          this.tileEntityGrid
        );
        if (sourceTile && destinationTile) {
          animateSwappedTile(sourceTile, destinationTile, this);
        }
      }
    }
  }
}

export function determineDirection(
  deltaX: number,
  deltaY: number
): string | null {
  if (Math.abs(deltaX) > Math.abs(deltaY)) {
    return deltaX > 0 ? "right" : "left";
  } else {
    return deltaY > 0 ? "down" : "up";
  }
}

export function animateSwappedTile(
  sourceTile: TileEntity,
  destinationTile: TileEntity,
  gameScene: GameScene
) {
  const sourceSpriteX = sourceTile.sprite.x;
  const sourceSpriteY = sourceTile.sprite.y;

  gameScene.tweens.add({
    targets: sourceTile.sprite,
    x: destinationTile.sprite.x,
    y: destinationTile.sprite.y,
    duration: gameScene.swapSpeed,
  } as any);

  gameScene.tweens.add({
    targets: destinationTile.sprite,
    x: sourceSpriteX,
    y: sourceSpriteY,
    duration: gameScene.swapSpeed,
    onComplete: () => {
      if (hasMatchesInBoard(gameScene.tileEntityGrid)) {
        markMatches(gameScene);
        destoryMatches(gameScene);
      }
    },
  } as any);
}
