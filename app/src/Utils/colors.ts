export enum Color {
  Primary = "#161d2f",
  Background = "#10141f",
  White = "#FFFFFF",
}

export function getColors(): Record<string, string> {
  return Color;
}
