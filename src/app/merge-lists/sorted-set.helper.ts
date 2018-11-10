import {add, Matrix} from 'mathjs';
import {matrix} from 'mathjs';

export function sorted(array: string[]): string[] {
  const sortFunction = (first, second) => {
    const f = first.split('/');
    const s = second.split('/');
    if (f[0] < s[0]) { return -1; }
    if (f[0] > s[0]) { return 1; }
    return parseInt(f[1], 10) - parseInt(s[1], 10);
  };
  return array.sort(sortFunction);
}

export class Merger {
  private height: number;
  private width: number;
  private letters: string[];

  constructor(
    private first: string[],
    private second: string[],
  ) {
    this.height = this.getHeight();
    this.width = this.getWidth();
    this.letters = this.getAllLetters();
  }

  private static asMatrix(arr: string[], height: number, width: number): Matrix {
    const layered = arr.reduce((accumulator, currentValue) => {
      if (!accumulator[0] || Merger.letter(Merger.lastElement(Merger.lastElement(accumulator))) !== Merger.letter(currentValue)) {
        accumulator.push([]);
      }
      accumulator[accumulator.length - 1].push(currentValue);
      return accumulator;
    }, []);

    while (layered.length < height) {
      layered.push([]);
    }

    return matrix(
      layered.map((row: string[]) => new Array(width)
        .fill(0)
        .map((_, index) => new RegExp('\/' + (index + 1) + '(,.*)?$').test(row.join()) ? 1 : 0))
    );
  }

  private static lastElement<T>(array: T[]): T | undefined {
    return array.slice(-1)[0];
  }

  private static flattenArray(array: string[][]): string[] {
    return [].concat(...array);
  }

  private static getLetters(set: string[]): string[] {
    return Array.from(new Set(set.map((item: string) => Merger.letter(item))));
  }

  private static letter(item: string): string {
    return item.split('/')[0];
  }

  private static asArray(m: Matrix, letters: string[]): string[] {
    return Merger.flattenArray(
      (<number[][]>m.toArray())
        .map((row: number[], index) => row
          .map((item: number, column: number) => `${letters[index]}/${item ? column + 1 : '*'}`)
          .filter((item: string) => item.indexOf('*') === -1)
        )
    );
  }

  private getHeight() {
    return Math.max(
      Merger.getLetters(this.first).length,
      Merger.getLetters(this.second).length
    );
  }

  private getWidth() {
    return Math.max(
      Math.max(...this.first.map((item) => parseInt(item.split('/')[1], 10))),
      Math.max(...this.second.map((item) => parseInt(item.split('/')[1], 10)))
    );
  }

  private getAllLetters() {
    return Array.from(
      new Set([].concat(Merger.getLetters(this.first), Merger.getLetters(this.second)))
    );
  }

  public getResult(): string[] {
    return Merger.asArray(<Matrix>add(
      Merger.asMatrix(this.first, this.height, this.width),
      Merger.asMatrix(this.second, this.height, this.width),
    ), this.letters);
  }
}
