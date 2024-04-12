import React from 'react'

function IndicatorCard(props: any) {
  const { title, count, iconname, active, selectItem } = props
  return (
    <div className={`card-single ${active}`} onClick={() => selectItem(title)}>
      <div>
        <h1>{count}</h1>
        <span>{title}</span>
      </div>
      <div>
        <span className={iconname}></span>
      </div>
    </div>
  )
}

export default IndicatorCard
