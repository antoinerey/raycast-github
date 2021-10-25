/**
 * What the fuck is going on? What are all those types? Why are they necessary?
 *
 * 1. We want to make sure that the key passed to the function is a key
 *    available on each object in the array. If, at least, one of the
 *    objects doesn't have the key, we want to throw an error.
 * 2. We want to make sure that the property registered under the given key
 *    in each object is a string. We do not want to group by a number, nor
 *    a boolean, for example.
 * 3. We want to make sure that the key passed to the function is a string.
 *
 * As simple as that.
 */
export function groupBy<Item extends { [key in Key]: string }, Key extends keyof Item & string>(
  array: Item[],
  key: Key
): Record<string, Item[]> {
  return array.reduce((acc, item) => {
    if (Array.isArray(acc[item[key]])) {
      return {
        ...acc,
        [item[key]]: [...acc[item[key]], item],
      }
    }

    return {
      ...acc,
      [item[key]]: [item],
    }
  }, {} as Record<string, Item[]>)
}
