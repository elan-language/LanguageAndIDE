import { Selectable } from "./selectable";

export interface Collapsible extends Selectable {
  isCollapsible: boolean;
  isCollapsed(): boolean;
  expand(): void;
  collapse(): void;
  expandCollapse(): void;
}
