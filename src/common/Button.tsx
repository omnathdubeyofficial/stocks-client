import React from 'react'
import './button.css'
export function Button(props: any) {
  let { className, wd, label, name, onClick} = props
  wd = wd ? wd : '12'
  return (
    <>
      <div className={`col_itss-${wd}`}>
        <div className="item">
          <button className={className} name={name} onClick={()=>onClick('save')}>
            {label}
          </button>
        </div>
      </div>
    </>
  )
}
