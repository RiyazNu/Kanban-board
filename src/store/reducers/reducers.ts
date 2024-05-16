import { AppState, ActionType } from '../types/types';

const initialState: AppState = {
  tasks: [],
};

const reducer = (state = initialState, action: any): AppState => {
  switch (action.type) {
    case ActionType.ADD_TASK:
      return {
        ...state,
        tasks: [...state.tasks, action.payload],
      };
    case ActionType.DELETE_TASK:
      return {
        ...state,
        tasks: state.tasks.filter(task => task.id !== action.payload),
      };
    case ActionType.MOVE_TASK:
      return {
        ...state,
        tasks: state.tasks.map(task =>
          task.id === action.payload.taskId ? { ...task, column: action.payload.column } : task
        ),
      };
    default:
      return state;
  }
};

export default reducer;
