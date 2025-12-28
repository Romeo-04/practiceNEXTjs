export type EventItem = {
    image : string;
    title : string;
    slug : string;
    location : string;
    date : string;
    time : string;
}

export const eventsData: EventItem[] = [
    { image : '/images/event1.png', title: 'GitHub Universe',slug:'event-1',location:'San Francisco',date:'2024-07-15',time:'10:00 AM'},
    { image : '/images/event2.png', title: 'Google Cloud Next 2026',slug:'event-2',location:'New York',date:'2024-08-20',time:'11:00 AM'},
    { image : '/images/event3.png', title: 'AWS re:Invent',slug:'event-3',location:'Los Angeles',date:'2024-09-10',time:'12:00 PM'},
    { image : '/images/event4.png', title: 'Microsoft Build',slug:'event-4',location:'Chicago',date:'2024-10-05',time:'01:00 PM'},
    { image : '/images/event5.png', title: 'Apple WWDC',slug:'event-5',location:'Boston',date:'2024-11-15',time:'02:00 PM'},
];