import React, { useState } from 'react'
import Indicator from './IndicatorCard'
const indicators = [
  { title: 'Customers', count: '54', iconname: 'las la-users' },
  { title: 'Projects', count: '79', iconname: 'las la-clipboard' },
  { title: 'Orders', count: '124', iconname: 'las la-shopping-bag' },
  { title: 'Income', count: '$6k', iconname: 'lab la-google-wallet' },
]
function IndicatorCards() {
  const [selectedItem, setSelectedItem] = useState(indicators[0].title)
  console.log('In Card Indicators')
  return (
    <div className="cards">
      {indicators.map((indicator, i) => {
        return (
          <Indicator
            title={indicator.title}
            count={indicator.count}
            iconname={indicator.iconname}
            active={selectedItem === indicator.title ? 'active' : ''}
            selectItem={setSelectedItem}
          />
        )
      })}
    </div>
  )
}

export default IndicatorCards
