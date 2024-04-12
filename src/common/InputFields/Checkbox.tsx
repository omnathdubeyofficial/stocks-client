import React from 'react'
import './checkbox.css'
export function Checkbox(props: any) {
  const { wd } = props
  return (
    <div className={`col_itss-${wd}`}>
      <div className="checkbox-container_itss">
        <input type="checkbox" id="cb1" />
        <label htmlFor="cb1">Checkbox 1</label>
      </div>
      <div className="checkbox-container_itss">
        <input type="checkbox" id="cb2" />
        <label htmlFor="cb2">Checkbox 2</label>
      </div>
      <div className="checkbox-container_itss">
        <input type="checkbox" id="cb3" />
        <label htmlFor="cb3">Checkbox 3</label>
      </div>
    </div>
  )
}

export const M_Checkbox = React.memo(Checkbox)
