import React from 'react'
import {Container} from 'react-materialize'
import {useFetch} from "../Hooks";
import SnowdayView, {Snowday} from './Snowday'
import EventView, {Event} from './Event'
import Fact from './Fact'

import './Info.css'
import Carousel from "../Carousel";

function Snowdays() {
    const snowdays: Snowday[] = useFetch('http://localhost:8000/snowday', '15m');
    const render = snowdays && snowdays.some(({chance}) => chance > 0)
    if (render) {
        const days = snowdays.map(({day, chance}) => {
            return ( <SnowdayView key={day} day={day} chance={chance} /> )
        })
        return (
            <>
                <h5 className="snowdaysHeader">Snowdays</h5>
                { days }
            </>
        )
    }
}

function Events() {
    const eventsData: Event[] = useFetch('http://localhost:8000/events', '30m');
    const render = eventsData && eventsData.length > 0
    if (render) {
        return eventsData.map(({date, name, description}) => {
            return (<EventView key={date} date={date} name={name} description={description}/>)
        })
    }
}

function Facts() {
    const factsData: string[] = useFetch('http://localhost:8000/facts', '30m');
    const renderFacts = factsData && factsData.length > 0
    if (renderFacts) {
        return factsData.map(fact => ( <Fact value={fact} />))
    }
}

export default function Info() {
    const carouselItems = [] as any[]
    const addElement = (value) => {
        if (value instanceof Array) carouselItems.push(...value)
        else if (value) carouselItems.push(value)
    }
    
    addElement(Facts())
    addElement(Events())
    addElement(Snowdays())
    
    return (
        <Container>
            <Carousel items={carouselItems} intervalString="20s" />
        </Container>
    )
}