import React, { useState } from 'react'
import { useInterval, duration } from '../Hooks'
import moment from 'moment'

interface Props {
    format: string
    update: duration
}

export default function Clock({format, update}: Props) {
    const [time, setTime] = useState(moment())
    useInterval(() => setTime(moment()), update)
    return (
        <span>{ time.format(format) }</span>
    )
}
