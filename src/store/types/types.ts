export interface Task {
    id: string;
    title: string;
    column: string;
    description: string;
  }
  
  export interface AppState {
    tasks: Task[];
  }
  
  export enum ActionType {
    ADD_TASK = 'ADD_TASK',
    DELETE_TASK = 'DELETE_TASK',
    MOVE_TASK = 'MOVE_TASK',
  }
  