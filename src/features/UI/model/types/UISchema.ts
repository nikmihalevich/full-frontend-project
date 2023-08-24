// <Address of page, position of scroll>
export type ScrollSchema = Record<string, number>;

export interface UISchema {
	scroll: ScrollSchema;
}
