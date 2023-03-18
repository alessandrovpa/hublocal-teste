export default function formatText(
  mask: string,
  document: HTMLInputElement
): void {
  const i = document.value.length;
  const output = mask.substring(0, 1);
  const text = mask.substring(i);

  if (text.substring(0, 1) !== output) {
    document.value += text.substring(0, 1);
  }
}
