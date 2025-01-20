export default function addVariablesToTailwindClass(
  baseClass: string,
  ...additionalClasses: unknown[]
) {
  return `${baseClass.trim()} ${additionalClasses.join(' ').trim()}`;
}
