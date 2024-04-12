import React from 'react'
import './radio.css'
export function RadioGroup(props: any) {
  const { children, errormsg } = props
  return (
    <div className="radio-btn_itss-group">
      <div className="row_itss">{children}</div>
      <div className="field-error_itss">{errormsg}</div>
    </div>
  )
}
