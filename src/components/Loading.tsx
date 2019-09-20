import React from 'react'
import {Preloader, Icon} from 'react-materialize'

export function Loading() {
    return (
        <div className="loading center">
            <Preloader/>
        </div>
    )
}

export function Error({name, error}: {name: string, error: string}) {
    return (
        <div className="center error">
            <Icon small>error</Icon>
            <p>Error loading {name}: {error}</p>
        </div>
    )
}