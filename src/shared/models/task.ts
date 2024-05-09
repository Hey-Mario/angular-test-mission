export interface Task {
  id: string;
  start: Date | string;
  end: Date | string;
  title: string;
  description: string;
  color: string;
  employeId: number;
}
