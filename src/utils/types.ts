import { tableColumns } from './tools';

type Option = {
  id: string;
  parentId: string | null;
  label?: string;
};

type ObjectFromList<T extends ReadonlyArray<string>, V = string> = {
  [K in (T extends ReadonlyArray<infer U> ? U : never)]: V
};

type LineLevel = ObjectFromList<typeof tableColumns, Option | null>;

type InfiniteTableLine = {
  id: string;
  levels: LineLevel
};

export type {
  Option,
  InfiniteTableLine,
  LineLevel
}