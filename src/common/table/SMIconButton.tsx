import React from 'react'

function SMIconButton({className,action,id,icon,}:any) {
    return (
        <div>
            <a className={className} onClick={()=>action(id)}><i className={icon}></i></a>
        </div>
    )
}

export default React.memo(SMIconButton)
