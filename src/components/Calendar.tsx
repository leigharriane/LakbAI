'use client'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin, { Draggable } from '@fullcalendar/interaction'
import { ReactElement, JSXElementConstructor, ReactNode, ReactPortal, PromiseLikeOfReactNode } from 'react'
import { time } from 'console'
import { start } from 'repl'

const events = [
	{ title: 'Event', start: new Date('2023-07-31T03:24:00'), end: new Date('2023-07-31T20:24:00') },
]

export function Calendar() {
	return (
		<FullCalendar
			plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
			initialView='timeGridWeek'
			headerToolbar={{
				start: 'title',
				center: 'dayGridMonth,timeGridWeek,timeGridDay',
				end: 'today prev,next',
			}}
			weekends={true}
			events={events}
			eventContent={renderEventContent}
			editable={true}
			eventTimeFormat={{ minute: '2-digit', hour: '2-digit', hour12: false }}
		/>
	)
}

function renderEventContent(eventInfo: { timeText: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined; event: { title: string | number | boolean | ReactElement<any, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | PromiseLikeOfReactNode | null | undefined } }) {
	return (
		<>
			<b>{eventInfo.timeText}</b>
			<i>{eventInfo.event.title}</i>
		</>
	)
}