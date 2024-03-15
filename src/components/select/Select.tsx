import React from 'react';
import CreatableSelect from "react-select/creatable";
import './select.scss'
import { ActionMeta, OnChangeValue } from "react-select/dist/declarations/src/types";
import { Option } from "../../utils/types";

type SelectProps = {
  options: Option[];
  value: Option | null;
  onChange: (newValue: OnChangeValue<Option, false>, actionMeta: ActionMeta<Option>) => void;
  onCreate: (inputValue: string) => void;
}

const Select = ({ options, value, onChange, onCreate }: SelectProps) => {
  return (
    <CreatableSelect
      isClearable
      onChange={onChange}
      onCreateOption={onCreate}
      options={options}
      value={value}
      getOptionValue={option => option.id}
      getOptionLabel={option => option.id || option.label!}
    />
  );
};

export default Select;