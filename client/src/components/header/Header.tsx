import React from 'react'
import Clock from './Clock'
import DataElements from './DataElements'

import './Header.css'

export default function Header() {
    return (
        <div className="header">
            <h4 className="time">
                <Clock format="h:mm A" update={1000} />
            </h4>
            <h6 className="date">
                <Clock format="MMMM Do, YYYY" update={1000} />
            </h6>
            <DataElements />
        </div>
    )
}
