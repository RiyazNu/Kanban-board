import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppState, Task } from '../../store/types/types';
import { addTask, moveTask } from '../../store/action/actions';
import styles from './Board.module.css';

const AddTask: React.FC<any> = ({ newTaskTitle, newTaskDescription, handleInputChange, handleDescriptionChange, handleAddTask }) => {
    return (
        <div className={styles.task}>
            <input
                type="text"
                value={newTaskTitle}
                onChange={handleInputChange}
                placeholder="Enter The Task Title"
                className={`${styles.inputField} ${styles.taskInput}`}
            />
            <input
                type="text"
                value={newTaskDescription}
                onChange={handleDescriptionChange}
                placeholder="Enter The Task Description"
                className={`${styles.inputField} ${styles.taskInput}`}
            />
            <button onClick={handleAddTask} className={styles.addButton}>
                Add
            </button>
        </div>
    );
};

const Board: React.FC = () => {
    const dispatch = useDispatch();
    const tasks = useSelector((state: AppState) => state.tasks);

    const [isAddingTask, setIsAddingTask] = useState(false);
    const [newTaskTitle, setNewTaskTitle] = useState('');
    const [newTaskDescription, setNewTaskDescription] = useState('');
    const [currentColumn, setCurrentColumn] = useState('');

    const handleAddTaskClick = (column: string) => {
        setIsAddingTask(true);
        setCurrentColumn(column);
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.target.value);
    };

    const handleDescriptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setNewTaskDescription(e.target.value);
    };

    const handleAddTask = () => {
        if (newTaskTitle.trim() !== '') {
            const newTask: Task = {
                id: Math.random().toString(),
                title: newTaskTitle,
                description: newTaskDescription,
                column: currentColumn,
            };
            dispatch(addTask(newTask));
            setNewTaskTitle('');
            setNewTaskDescription('');
            setIsAddingTask(false);
        }
    };

    const handleDragStart = (e: React.DragEvent<HTMLDivElement>, taskId: string) => {
        e.dataTransfer.setData('taskId', taskId);
    };

    const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
        e.preventDefault();
    };

    const handleDrop = (e: React.DragEvent<HTMLDivElement>, column: string) => {
        e.preventDefault();
        const taskId = e.dataTransfer.getData('taskId');
        dispatch(moveTask(taskId, column));
    };

    return (
        <div>
            <div className={styles.kanbanboard}>
                <h1>Kanban Board</h1>
            </div>
            <div className={styles.board}>
                <div className={`${styles.column} ${styles.todo}`} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'todo')}>
                    <div className={styles.thamp}>   
                        <h2>Todo</h2>
                        <button onClick={() => handleAddTaskClick('todo')} className={styles.superButton}>
                            +
                        </button>
                    </div>
                    {isAddingTask && currentColumn === 'todo' && (
                        <AddTask
                            newTaskTitle={newTaskTitle}
                            newTaskDescription={newTaskDescription}
                            handleInputChange={handleInputChange}
                            handleDescriptionChange={handleDescriptionChange}
                            handleAddTask={handleAddTask}
                        />
                    )}
                    {tasks
                        .filter((task) => task.column === 'todo')
                        .map((task) => (
                            <div key={task.id} className={styles.task} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                                <div className={styles.taskContent}>
                                    <h2>{task.title}</h2>
                                    <hr className={styles.horizontalLine} />
                                    <p>{task.description}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={`${styles.column} ${styles.inProgress}`} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'in-progress')}>
                    <div className={styles.thamp}> 
                        <h2>In Progress</h2>
                        <button onClick={() => handleAddTaskClick('in-progress')} className={styles.superButton}>
                            +
                        </button>
                    </div>
                    {isAddingTask && currentColumn === 'in-progress' && (
                        <AddTask
                            newTaskTitle={newTaskTitle}
                            newTaskDescription={newTaskDescription}
                            handleInputChange={handleInputChange}
                            handleDescriptionChange={handleDescriptionChange}
                            handleAddTask={handleAddTask}
                        />
                    )}
                    {tasks
                        .filter((task) => task.column === 'in-progress')
                        .map((task) => (
                            <div key={task.id} className={styles.task} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                                <div className={styles.taskContent}>
                                    <h2>{task.title}</h2>
                                    <hr className={styles.horizontalLine} />
                                    <p>{task.description}</p>
                                </div>
                            </div>
                        ))}
                </div>
                <div className={`${styles.column} ${styles.done}`} onDragOver={handleDragOver} onDrop={(e) => handleDrop(e, 'done')}>
                    <div className={styles.thamp}> 
                        <h2>Done</h2>
                        <button onClick={() => handleAddTaskClick('done')} className={styles.superButton}>
                            +
                        </button>
                    </div>
                    {isAddingTask && currentColumn === 'done' && (
                        <AddTask
                            newTaskTitle={newTaskTitle}
                            newTaskDescription={newTaskDescription}
                            handleInputChange={handleInputChange}
                            handleDescriptionChange={handleDescriptionChange}
                            handleAddTask={handleAddTask}
                        />
                    )}
                    {tasks
                        .filter((task) => task.column === 'done')
                        .map((task) => (
                            <div key={task.id} className={styles.task} draggable onDragStart={(e) => handleDragStart(e, task.id)}>
                                <div className={styles.taskContent}>
                                    <h2>{task.title}</h2>
                                    <hr className={styles.horizontalLine} />
                                    <p>{task.description}</p>
                                </div>
                            </div>
                        ))}
                </div>
            </div>
        </div>
    );
};

export default Board;
