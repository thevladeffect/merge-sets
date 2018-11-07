import {Merger, sorted} from './sorted-set.helper';

describe('Helpers', () => {

  it('should create sorted', () => {
    const set = ['a/12', 'a/1', 'c/2', 'b/23', 'b/21'];
    expect(sorted(set)).toEqual(['a/1', 'a/12', 'b/21', 'b/23', 'c/2']);
  });

  it('merges arrays', () => {
    const merger = new Merger(['a/1', 'a/12', 'b/21', 'b/23', 'c/2'], ['a/1', 'a/3', 'b/21', 'c/21']);
    expect(merger.getResult()).toEqual(['a/1', 'a/3', 'a/12', 'b/21', 'b/23', 'c/2', 'c/21']);
  });
});
