import { ContextualMenuItem } from "./ContextualMenuItem";

export interface TableColumn {
    name: string,
    display: string,
    centered?: boolean,
    expanded?: boolean,
    type?: TableColumnType,
    menuItems?: ContextualMenuItem[]
}

declare type TableColumnType = 'menu' | 'logo';