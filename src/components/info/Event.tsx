import React from 'react'
import { Textfit } from 'react-textfit';

import './Event.css'

export type Event = Readonly<{
    date: string
    name: string
    description: string
}>

export default function({name, description}: Event) {
    const stripUnicode = (str) => str.replace(/[^\\x00-\x7F]/g, "")
    return (
        <div className="event">
            <h5 className="eventName">
                { stripUnicode(name) }
            </h5>
            <Textfit>
                { description }
            </Textfit>
        </div>
    )
}
