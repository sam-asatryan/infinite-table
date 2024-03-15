import React from "react";
import { produce } from "immer";
import { InfiniteTableLine, Option } from "./types";

const BATCH_SIZE = 200;
const tableColumnNames = [ '', 'Уровень 1', 'Уровень 2', 'Уровень 3', 'Уровень 4', 'Уровень 5' ];
const tableColumns = [ 'level1', 'level2', 'level3', 'level4', 'level5' ];

const defaultLines: InfiniteTableLine[] = [
  {
    id: 'one',
    levels: {
      level1: { id: '1.1', parentId: null },
      level2: null,
      level3: null,
      level4: null,
      level5: null,
    },
  },
  {
    id: 'two',
    levels: {
      level1: { id: '2.1', parentId: null },
      level2: null,
      level3: null,
      level4: { id: '2.2', parentId: null },
      level5: null,
    },
  },
  {
    id: 'three',
    levels: {
      level1: { id: '3.1', parentId: null },
      level2: { id: '3.2', parentId: null },
      level3: null,
      level4: null,
      level5: null,
    },
  },
];

const defaultOptions = {
  one: [
    {
      id: "1.1",
      parentId: null,
    },
    {
      id: "1.2",
      parentId: "1.1",
    }
  ],
  two: [
    {
      id: "2.1",
      parentId: null,
    },
    {
      id: "2.2",
      parentId: "1.1",
    }
  ],
  three: [
    {
      id: "3.1",
      parentId: null,
    },
    {
      id: "3.2",
      parentId: "1.1",
    }
  ],
};

const generateNewLines = (count: number) => {
  return produce([], (draft: InfiniteTableLine[]) => {
    for (let i = 0; i < count; i++) {
      draft.push(createLine());
    }
  });
}

const applySetAction = (
  totalNewLines: number,
  setLines: React.Dispatch<React.SetStateAction<InfiniteTableLine[]>>
) => {
  let remainingNewLines = totalNewLines;
  while (remainingNewLines > 0) {
    const batchToAdd = Math.min(BATCH_SIZE, remainingNewLines);
    const newLines = generateNewLines(batchToAdd);
    setLines(oldLines => oldLines.concat(newLines));
    remainingNewLines -= batchToAdd;
  }
}

const generateCellKey = (rowId: string, columnKey: string): string => {
  return 'row-' + rowId + '-column-' + columnKey;
}

const createOption = (label: string) => ({
  id: label.replace(/\W/g, ''),
  parentId: null,
});

const createLine = () => ({
  id: Math.random() + '',
  levels: {
    level1: null,
    level2: null,
    level3: null,
    level4: null,
    level5: null,
  },
});

const updateLineLevels = (line: InfiniteTableLine, key: string, newValue: Option | null): InfiniteTableLine => {
  const updatedLevels = {
    [key]: newValue,
  }
  const keysToReset = tableColumns.slice(tableColumns.indexOf(key) + 1);
  keysToReset.forEach(keyToReset => updatedLevels[keyToReset] = null);

  return {
    ...line,
    levels: {
      ...line.levels,
      ...updatedLevels,
    }
  };
}

export {
  applySetAction,
  generateCellKey,
  createOption,
  createLine,
  defaultOptions,
  defaultLines,
  tableColumns,
  tableColumnNames,
  updateLineLevels,
}