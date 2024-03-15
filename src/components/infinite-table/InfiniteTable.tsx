import React, { FormEvent, useRef, useState } from 'react';
import { TableVirtuoso } from 'react-virtuoso';
import Select from '../select';
import type { InfiniteTableLine, Option } from '../../utils/types';
import {
  applySetAction,
  createOption,
  defaultLines,
  defaultOptions,
  generateCellKey,
  tableColumnNames,
  tableColumns,
  updateLineLevels
} from '../../utils/tools';
import './infinite-table.scss';


const InfiniteTable = () => {
  const [ lines, setLines ] = useState<InfiniteTableLine[]>(defaultLines);
  const [ linesOptions, setLinesOptions ] = useState<{ [key: string]: Option[] }>(defaultOptions);
  const newRowsCount = useRef<HTMLInputElement>(null);

  const handleChange = (currentLine: InfiniteTableLine, currentLineIndex: number, key: string, newValue: Option | null) => {
    const newLine = updateLineLevels(currentLine, key, newValue);
    setLines(oldLines => [
      ...oldLines.slice(0, currentLineIndex),
      newLine,
      ...oldLines.slice(currentLineIndex + 1)
    ]);
  }

  const handleCreate = (line: InfiniteTableLine, index: number, key: string, newLabel: string) => {
    const newOption = createOption(newLabel);
    const lineNewOptions = [ ...(linesOptions[line.id] || []), newOption ];
    setLinesOptions(linesOptions => ({
      ...linesOptions,
      [line.id]: lineNewOptions,
    }))
    handleChange(line, index, key, newOption);
  };

  const handleAddNewRows = (event: FormEvent<HTMLFormElement>) => {
    event.stopPropagation();
    event.preventDefault();

    if (!newRowsCount.current) {
      return;
    }

    const inputValue = newRowsCount.current?.value || '';
    newRowsCount.current.value = '';
    const count = parseInt(inputValue);
    if (!count || isNaN(count) || count < 0) {
      return;
    }

    applySetAction(count, setLines);
  };

  return (
    <div className='infinite-table'>
      <TableVirtuoso
        className='infinite-table-virtuoso'
        data={lines}
        useWindowScroll
        fixedHeaderContent={() => (
          <tr>
            {tableColumnNames.map(columnName => (
              <th key={columnName}>{columnName}</th>
            ))}
          </tr>
        )}
        itemContent={(index, line) => (
          <>
            <td>{index + 1}</td>
            {tableColumns.map(key => (
              <td key={generateCellKey(line.id, key)}>
                <Select
                  options={linesOptions[line.id] || []}
                  value={line.levels[key]}
                  onChange={newValue => handleChange(line, index, key, newValue)}
                  onCreate={label => handleCreate(line, index, key, label)}
                />
              </td>
            ))}
          </>
        )}
      />
      <form className='extra-actions' onSubmit={handleAddNewRows}>
        <input placeholder='100000' ref={newRowsCount}/>
        <button type='submit'>Добавить строку</button>
      </form>
    </div>
  );
};

export default InfiniteTable;