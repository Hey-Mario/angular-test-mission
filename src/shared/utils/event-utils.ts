import { EventInput } from '@fullcalendar/core';
// import * as fs from 'fs';

// const jsonData = fs.readFileSync('../data/task.json', 'utf-8');
// const tasks = JSON.parse(jsonData);

let eventGuid = 3;

export const INITIAL_EVENTS: EventInput[] = [
  {
    "id": "1",
    "title": "Add dashboard on Home page",
    "description": "Some description about the dashboard and features on it",
    "color": "red",
    "employeId": 1,
    "start": "2024-05-04",
    "end": "2024-05-09"
  },
  {
    "id": "2",
    "title": "Add new About page",
    "description": "Some description about the About page and the informations on it",
    "color": "green",
    "employeId": 2,
    "start": "2024-05-05",
    "end": "2024-05-06"
  },
  {
    "id": "3",
    "title": "Add a color for each event in calendar",
    "description": "Some description about the new calendar",
    "color": "yellow",
    "employeId": 3,
    "start": "2024-05-09",
    "end": "2024-05-09"
  }
];

export function createEventId() {
  return String(eventGuid++);
}
