import {sorted, union} from './sorted-set.helper';

describe('Helpers', () => {

  it('should create sorted', () => {
    const set = new Set(['a/12', 'a/1', 'c/2', 'b/23', 'b/21']);
    expect(sorted(set)).toEqual(new Set(['a/1', 'a/12', 'b/21', 'b/23', 'c/2']));
  });

  it('should make union', () => {
    const first = new Set(['a/12', 'a/1', 'c/2', 'b/23', 'b/21']);
    const second = new Set(['a/1', 'a/13', 'c/2', 'b/20', 'b/21']);
    expect(union(first, second)).toEqual(new Set(['a/12', 'a/1', 'c/2', 'b/23', 'b/21', 'a/1', 'a/13', 'b/20']));
  });
});
