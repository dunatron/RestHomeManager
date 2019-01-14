import React, { Fragment, Component } from "react"

import TextField from "../TextInput"
import NumberInput from "../NumberInput"
import BasicDatePicker from "../../BasicDatePicker"
import MultiSelectChip from "../MultiSelectChip"
import SelectOption from "../SelectOption"

export const importTextField = ({ id, label, value, multiline }) => ({
  onChange,
  value,
}) => (
  <TextField
    id={id}
    label={label}
    value={value}
    handleChange={v => onChange(v, id)}
    multiline={multiline}
  />
)

export const importDatePicker = ({ id, label, value }) => ({
  onChange,
  value,
}) => (
  <BasicDatePicker
    handleDateChange={date => onChange(date.format("DD MMMM YYYY"), id)}
    dateFormat={"DD MMMM YYYY"}
    selectedDate={value}
    label={label}
  />
)

export const importSelectOption = ({ id, label, value, options }) => ({
  onChange,
  value,
}) => (
  <SelectOption
    value={value}
    label={label}
    options={options}
    handleChange={v => onChange(v, id)}
  />
)

export const importMultiSelectChip = ({ id, label, value, options }) => ({
  onChange,
  value,
}) => (
  <MultiSelectChip
    values={value}
    label={label}
    options={options}
    handleChange={v => onChange(v, id)}
  />
)

export const importNumberField = ({ id, label, placeholder }) => ({
  onChange,
  value,
}) => (
  <NumberInput
    value={value}
    label={label}
    placeholder={placeholder}
    handleChange={v => onChange(v, id)}
  />
)
