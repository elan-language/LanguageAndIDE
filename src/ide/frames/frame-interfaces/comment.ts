export interface Comment {
  isDirective(): boolean;

  directive(): string | undefined;
}
