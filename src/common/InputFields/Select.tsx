import React from 'react'
import './select.css'
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
  cal:string,
  modifydoc:any,
  options:any,
  
}
export function Select(props: any) {
  const { wd, label, options, name, section,currdoc,modifydoc,cal} = props
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  let selectclassname = 'input_itss-field'
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      selectclassname = 'error-input-field'
    }
  }
  
  return (
    <div className={`col_itss-${wd}`}>
      <div className={selectclassname}>
        <select required name={name} 
          value={getValue(currdoc,section)} 
          onChange={(event)=>{ setCalValue(currdoc,section,event.target.value,modifydoc,cal)  } } 
          onBlur={event => modifydoc(setValue(currdoc,'touched.'+section,true))}>
          <option />
          {options.map((item: any, i: string) => (
            <option label={item.value} value={item.key} key={i} />
          ))}
        </select>
        <label className="label_itss-name">
          <span className="content-name">{label}</span>
        </label>
      </div>
      <div className="field-error_itss">{errorMsg}</div>
    </div>
  )
}

export const SelectInput = React.memo(Select)
