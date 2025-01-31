export function orderById<T>(data: T[], idKey: keyof T) {
  return data.sort(
    (a, b) => (b[idKey] as unknown as number) - (a[idKey] as unknown as number)
  );
}
