import React from 'react'
import './SearchSelectInput.css'
import {
  setValue, getValue, getErrorValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../validationlib';
import { FlatInput } from '../InputFields/Input';
interface Iinput {
  wd?: string
  label: string
  name: string
  currdoc: any,
  section: string,
  cal?:string,
  modifydoc:any
}

export function Input(props: Iinput) {
  const { wd, label, name, section, currdoc,modifydoc,cal } = props
  let classname = 'search-input-field'
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section)
  if (errorMsg !== null) {
    if (errorMsg !== undefined && errorMsg.length > 0) {
      classname = 'error-input-field'
    }
  }
  return (
    <div className={`col_itss-${wd}`}>
       <div className="container_itss">
      <h2>Video Category</h2>

      <div className="select-box">
        <div className="options-container_itss">
          <div className="option">
            <input
              type="radio"
              className="radio"
              id="automobiles"
              name="category"
            />
            <label htmlFor="automobiles">Automobiles</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="film" name="category" />
            <label htmlFor="film">Film & Animation</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="science" name="category" />
            <label htmlFor="science">Science & Technology</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="art" name="category" />
            <label htmlFor="art">Art</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="music" name="category" />
            <label htmlFor="music">Music</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="travel" name="category" />
            <label htmlFor="travel">Travel & Events</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="sports" name="category" />
            <label htmlFor="sports">Sports</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="news" name="category" />
            <label htmlFor="news">News & Politics</label>
          </div>

          <div className="option">
            <input type="radio" className="radio" id="tutorials" name="category" />
            <label htmlFor="tutorials">Tutorials</label>
          </div>
        </div>

        <div className="selected">
        <FlatInput wd="3" label="Current market price" name="cmp" currdoc={{}} section={'cmp'} modifydoc={()=>{}} />

        </div>
      </div>
    </div>
      <div className="field-error_itss">{errorMsg}</div>
    </div>
  )
}

export const SearchSelectInput = React.memo(Input)
