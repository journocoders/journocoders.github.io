function run() {
    const scripts = document.querySelectorAll('script')
    const script = scripts[scripts.length - 1]
    const filter = script.getAttribute('data-filter')
    const titleNext = script.getAttribute('data-title-next')
    const also = script.getAttribute('data-also')
    const titlePast = script.getAttribute('data-title-past')
    const more = script.getAttribute('data-more')
    const meetup = script.getAttribute('data-meetup')
    showNext(meetup, titleNext, also, filter)
    showPast(meetup, titlePast, more, filter)
}

function showNext(meetup, title, alsoText, filter) {
    fetchEvents(meetup, 'upcoming').then(eventsUnfiltered => {
        const events = eventsUnfiltered.filter(event => event.name.includes(filter))
        if (events.length === 0) return
        const dates = events.slice(1).map((event, i) => {
            const after = (i === events.length - 3) ? ' & '
                : (i === events.length - 2) ? '.'
                : ', '
            return [
                crel('a', { href: event.link }, toDate(event.time)),
                after
            ]
        })
        const also = events.length <= 1 ? '' : crel('p', [
            alsoText + ' ',
            dates
        ])
        crel(document.querySelector('.next-event-block'), [
            crel('h2', title),
            toBox(events[0]),
            also
        ])
    })
}

function showPast(meetup, title, moreText, filter) {
    const limit = 4
    fetchEvents(meetup, 'past').then(eventsUnfiltered => {
        const events = eventsUnfiltered.filter(event => event.name.includes(filter))
        if (events.length === 0) return
        const items = events.reverse().slice(0, limit).map(event => {
            return crel('li', toBox(event))
        })
        const also = events.length === 0 ? '' : crel('p', [
            crel('a', { href: 'https://www.meetup.com/' + meetup + '/events/past' }, moreText)
        ])
        crel(document.querySelector('.past-events-block'), [
            crel('h2', title),
            crel('ol', { 'class': 'past-events' }, items),
            also
        ])
    })
}

function fetchEvents(meetup, status) {
    const location = 'https://api.meetup.com/' + meetup + '/events?status=' + status
    return fetchJsonp(location)
        .then(response => response.json())
        .then(response => response.data)
}

function toBox(event) {
    return crel('a', { 'class': 'event', href: event.link }, [
        crel('time', toDate(event.time, true)),
        crel('h3', event.name)
    ])
}

function toDate(timestamp, useLongFormat) {
    const format = useLongFormat ? 'dddd Do MMMM YYYY h:mma' : 'Do MMMM YYYY'
    const locale = document.querySelector('html').lang
    moment.locale(locale)
    const date = moment(timestamp)
    return date.format(format).replace(':00', '')
}

run()
