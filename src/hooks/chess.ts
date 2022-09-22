import { resolve } from "path";

type pointer = {
  x: number;
  y: number;
};
const MAX_ROW = 10;
const MAX_CLUM = 10;
const SINGLE_WIDTH = 50;
const SINGLE_HEIGHT = 50;

const MAX_LEVEL = 5;

export class Chess {
  public id: number;
  private pointer: pointer;
  private level: number;
  public type: number;
  private parent?: Chess;
  private Children: Chess[];
  static _id=0;
  constructor(pointer: pointer, level: number, parent?: Chess) {
    if (level >= MAX_LEVEL) {
      throw new Error(`gt ${MAX_LEVEL} level`);
    }

    this.pointer = pointer;
    this.level = level;
    parent && (this.parent = parent)
    this.Children = [];
    this.type = this.getRamdomType(5);
    this.id = Chess._id++
  }

  private getRamdomType(typeCount: number = 1) {
    const roll = Math.random();
    let i = 1;
    while (i <= typeCount) {
      if (
        Math.min(0, i / typeCount) <= roll &&
        Math.min(1, i / typeCount) > roll
      ) {
        break;
      }
      i++;
    }
    return i;
  }
}

export class Checkerboard {
  private size: number;
  private chesses: Chess[];

  constructor(size: number) {
    this.size = size;
    this.chesses = [];
  }

  public add(chess: Chess) {
    this.chesses.push(chess);
    this.chessFilter(chess).then(() => {
      this.healthCheck();
    });
  }

  public clearAll(){
    this.chesses = []
  }

  private clearSameChesses(sameChesses: Chess[]) {
    const sameIds = sameChesses.map((item) => item.id).slice(0, 3);
    this.chesses = this.chesses.filter(
      (chess, index) => !sameIds.includes(chess.id)
    );
  }
  private chessFilter(chess: Chess) {
    return new Promise<void>((resolve, reject) => {
      const sameChesses = this.chesses.filter(
        (item) => item.type === chess.type
      );

      if (sameChesses.length >= 3) {
        console.log('find same chess more than 3',sameChesses)
        this.clearSameChesses(sameChesses);
      }
      resolve();
    });
  }
  private healthCheck() {
    console.log(this.chesses)
    if (this.chesses.length >= this.size) {
        
      throw new Error("超过最大限制，失败啦");
    }
  }
}
