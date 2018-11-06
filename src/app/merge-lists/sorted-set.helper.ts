export function sorted(set: Set<string>): Set<string> {
  const sortFunction = (first, second) => {
    const f = first.split('/');
    const s = second.split('/');
    if (f[0] < s[0]) { return -1; }
    if (f[0] > s[0]) { return 1; }
    return parseInt(f[1], 10) - parseInt(s[1], 10);
  };

  const array = Array.from(set);
  array.sort(sortFunction);
  return new Set(array);
}

export function union(...sets): Set<string> {
  return new Set([].concat(...sets.map(set => Array.from(set))));
}
