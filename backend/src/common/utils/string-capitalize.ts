export function stringCapitalize(name: string): string {
  const nameArray = name.split(' ');
  const formattedName = nameArray
    .map(
      (localName) =>
        localName[0].toUpperCase() + localName.slice(1).toLowerCase(),
    )
    .join(' ');

  return formattedName;
}
