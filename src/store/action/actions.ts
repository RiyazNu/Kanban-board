import { Task, ActionType } from '../types/types';

export const addTask = (task: Task) => ({
  type: ActionType.ADD_TASK,
  payload: task,
});

export const deleteTask = (taskId: string) => ({
  type: ActionType.DELETE_TASK,
  payload: taskId,
});

export const moveTask = (taskId: string, column: string) => {
    console.log('Moving task with ID', taskId, 'to column', column);
    return {
      type: ActionType.MOVE_TASK,
      payload: { taskId, column },
    };
  };
  
