import React from 'react'
import {Preloader, Icon} from 'react-materialize'

export function Loading() {
    return (
        <div className="loading center">
            <Preloader/>
        </div>
    )
}

export function Error({name, msg}) {
    return (
        <div className="center error">
            <Icon medium>error</Icon>
            <p>Error loading {name}: {msg}</p>
        </div>
    )
}