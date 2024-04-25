import React from 'react'

function Column(props: any) {
    const { data, width, id, columnClick, render } = props
    return (
        render ?
            <td key={data} width={width} onClick={() => { id ? columnClick(id, true) : () => { } }}>{render}</td> :
            <td key={data} width={width} onClick={() => { id ? columnClick(id, true) : () => { } }}>{data}</td>
    )
}

export default React.memo(Column)
