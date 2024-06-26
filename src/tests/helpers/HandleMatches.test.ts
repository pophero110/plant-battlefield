import handleMatches, { hasMatchesInBoard } from "../../helpers/HandleMatches";
import {
  createMockGameScene,
  createMockTileEntityGridFromPattern,
} from "../common/MockData";

describe("Handle Matches", () => {
  it("should disable tile selection when has matches", () => {
    const gameScene = createMockGameScene();
    const tileTypePattern: number[][] = [
      [1, 3, 1, 0, 2, 0],
      [1, 3, 3, 2, 2, 0],
      [2, 3, 1, 3, 0, 3],
      [2, 2, 0, 0, 2, 2],
      [3, 1, 2, 1, 0, 0],
      [3, 2, 1, 2, 0, 0],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);
    gameScene.tileEntityGrid = tileEntityGrid;

    handleMatches(gameScene);

    expect(gameScene.canSelectTile).toBeFalsy();
  });

  it("should enable tile selection when has no match", () => {
    const gameScene = createMockGameScene();
    const tileTypePattern: number[][] = [
      [1, 3, 1, 0, 2, 0],
      [1, 1, 3, 2, 2, 0],
      [2, 3, 1, 3, 0, 3],
      [2, 2, 0, 0, 2, 2],
      [3, 1, 2, 1, 0, 0],
      [3, 2, 1, 2, 0, 0],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);
    gameScene.tileEntityGrid = tileEntityGrid;

    handleMatches(gameScene);

    expect(gameScene.canSelectTile).toBeTruthy();
  });
});
describe("Has Match", () => {
  it("should return true when has a horizontal match at the beginning of grid", () => {
    const tileTypePattern: number[][] = [
      [1, 1, 1, 0, 2, 0],
      [1, 0, 2, 2, 0, 0],
      [2, 3, 1, 1, 3, 3],
      [2, 3, 2, 3, 2, 2],
      [3, 2, 2, 1, 0, 0],
      [3, 2, 1, 0, 0, 0],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);

    const actual = hasMatchesInBoard(tileEntityGrid);

    expect(actual).toBeTruthy();
  });

  it("should return true when has a horizontal match at the end of grid", () => {
    const tileTypePattern: number[][] = [
      [1, 1, 0, 0, 2, 0],
      [1, 0, 2, 2, 0, 0],
      [2, 3, 1, 1, 3, 3],
      [2, 3, 2, 3, 2, 2],
      [3, 2, 2, 1, 0, 0],
      [3, 2, 1, 0, 0, 0],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);

    const actual = hasMatchesInBoard(tileEntityGrid);

    expect(actual).toBeTruthy();
  });

  it("should return true when has a vertical match at the beginning of grid", () => {
    const tileTypePattern: number[][] = [
      [1, 1, 0, 0, 2, 0],
      [1, 0, 2, 2, 0, 0],
      [1, 3, 1, 1, 3, 3],
      [2, 3, 2, 3, 2, 2],
      [3, 2, 2, 1, 0, 2],
      [3, 2, 1, 0, 0, 2],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);

    const actual = hasMatchesInBoard(tileEntityGrid);

    expect(actual).toBeTruthy();
  });

  it("should return true when has a vertical match at the end of grid", () => {
    const tileTypePattern: number[][] = [
      [1, 1, 0, 0, 2, 0],
      [1, 0, 2, 2, 0, 0],
      [2, 3, 1, 1, 3, 3],
      [2, 3, 2, 3, 2, 2],
      [3, 2, 2, 1, 0, 2],
      [3, 2, 1, 0, 0, 2],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);

    const actual = hasMatchesInBoard(tileEntityGrid);

    expect(actual).toBeTruthy();
  });

  it("should return false when no match", () => {
    const tileTypePattern: number[][] = [
      [1, 1, 0, 0, 2, 0],
      [1, 0, 2, 2, 0, 0],
      [2, 3, 1, 1, 3, 3],
      [2, 3, 2, 3, 2, 2],
      [3, 2, 2, 1, 0, 0],
      [3, 2, 1, 2, 0, 0],
    ];
    const tileEntityGrid = createMockTileEntityGridFromPattern(tileTypePattern);

    const actual = hasMatchesInBoard(tileEntityGrid);

    expect(actual).toBeFalsy();
  });
});
