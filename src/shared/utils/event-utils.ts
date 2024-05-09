import { EventInput } from '@fullcalendar/core';
import { Employee } from '../models/employee';
import { Task } from '../models/task';
// import * as fs from 'fs';

// const jsonData = fs.readFileSync('../data/task.json', 'utf-8');
// const tasks = JSON.parse(jsonData);

let eventGuid = 3;

export const INITIAL_EVENTS: Task[] = [
  {
    "id": "1",
    "title": "Add dashboard on Home page",
    "description": "Some description about the dashboard and features on it",
    "color": "red",
    "start": "2024-05-04",
    "end": "2024-05-09",
    "employeId": 1,
    "employee": {
      "id": 1,
      "name": "John Doe",
      "img": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  },
  {
    "id": "2",
    "title": "Add new About page",
    "description": "Some description about the About page and the informations on it",
    "color": "green",
    "employeId": 2,
    "start": "2024-05-05",
    "end": "2024-05-06",
    "employee": {
      "id": 2,
      "name": "Sarah Lena",
      "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  },
  {
    "id": "3",
    "title": "Add a color for each event in calendar",
    "description": "Some description about the new calendar",
    "color": "grey",
    "employeId": 3,
    "start": "2024-05-09",
    "end": "2024-05-09",
    "employee": {
      "id": 3,
      "name": "Michelle",
      "img": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
  }
];

export const EMPLOYEE_LIST: Employee[] = [
  {
    "id": 1,
    "name": "John Doe",
    "img": "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 2,
    "name": "Sarah Lena",
    "img": "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
  {
    "id": 3,
    "name": "Michelle",
    "img": "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=1287&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  },
]

export function createEventId() {
  return String(eventGuid++);
}
