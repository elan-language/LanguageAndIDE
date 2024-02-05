import { Selectable } from "./selectable";

export interface Collapsible extends Selectable {
    isCollapsible: boolean;
    expandCollapse(): void;
}