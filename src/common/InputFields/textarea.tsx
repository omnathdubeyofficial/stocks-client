import React, { useState } from 'react';

import {
  setValue, getValue, getErrorValueN, setCalValue,
  getDtFormat,
  getTimeFormat,
  getDateYYYYMMDD,
  getDateYYYYMMDDHHMI,
  getFromToDate
} from '../validationlib';

interface Iinput {
  wd?: string;
  label: string;
  name: string;
  currdoc: any;
  section: string;
  cal?: string;
  modifydoc: any;
  inpref?: any;
  onclick?: any;
  disabled?: boolean;
  type?: string;
}

export function Textarea(props: Iinput) {
  let { wd, label, name, section, currdoc, modifydoc, cal, inpref, onclick, disabled, type } = props;
  let classname = 'textarea-field';
  const errorMsg = getErrorValueN(currdoc, 'errorsAll.' + section);
  if (errorMsg !== null && errorMsg !== undefined && errorMsg.length > 0) {
    classname = 'error-textarea-field';
  }

  const [textValue, setTextValue] = useState(getValue(currdoc, section));

  const handleTextareaChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setTextValue(event.target.value);
    setCalValue(currdoc, section, event.target.value, modifydoc, cal);
  };

  const handleTextareaBlur = () => {
    modifydoc(setValue(currdoc, 'touched.' + section, true));
  };

  const handleTextareaClick = () => {
    if (onclick) onclick(true);
  };

  const handleTextareaFocus = () => {
    if (onclick) onclick(true);
  };

  return (
    <div className={`col-${wd}`}>
      {!disabled ? (
        <>
          <div className="form-group">
            <textarea
              className="form-control"
              disabled={disabled}
              rows={8}
              name={name}
              autoComplete="off"
              required
              placeholder="Recommendations Input"
              ref={inpref}
              value={textValue}
              onChange={handleTextareaChange}
              onBlur={handleTextareaBlur}
              onClick={handleTextareaClick}
              onFocus={handleTextareaFocus}
            />
          </div>
          <div className="field-error">{errorMsg}</div>
        </>
      ) : (
        <LabelField label={label} currdoc={currdoc} section={section} wd={"12"} />
      )}
    </div>
  );
}

export const M_Textarea = React.memo(Textarea);
