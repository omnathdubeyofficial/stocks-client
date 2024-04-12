import React from 'react'
import './input.css'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../validationlib';
interface Iinput {
  wd?: string
  label: string
  name: string
  currdoc: any,
  section: string,
  cal?:string,
  modifydoc:any,
  inpref?:any
}

export function Input(props: Iinput) {
  const { wd, label, name, section, currdoc,modifydoc,cal,inpref } = props
  let classname = 'input_itss-field'
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      classname = 'error-input-field'
    }
  }
  return (
    <div className={`col_itss-${wd}`}>
      <div className={classname}>
        <input
          type="text"
          name={name}
          autoComplete="off"
          required
          placeholder=" "
          ref={inpref}
          value={getValue(currdoc, section)}
          onChange={(event) => { setCalValue(currdoc, section, event.target.value, modifydoc, cal) }}
          onBlur={event => modifydoc(setValue(currdoc, 'touched.' + section, true))}
        />
        <label className="label_itss-name">
          <span className="content-name">{label}</span>
        </label>
      </div>
      <div className="field-error_itss">{errorMsg}</div>
    </div>
  )
}

export const FlatInput = React.memo(Input)
