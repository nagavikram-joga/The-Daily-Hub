import React from 'react';
import TaskIndicator from './TaskIndicator';
import CreateTask from './createTask/CreateTask';
import { Outlet } from 'react-router-dom';
import "./Layout.css";
function Layout() {
    return (
        <div className='todo-main'>
            <div className='Todo'>
                <CreateTask />
                <div className='task-container'>
                    <div className='outlet'>
                        <Outlet />
                    </div>
                    <div className='indicator'>
                        <TaskIndicator />
                    </div>

                </div>
            </div>
        </div>
    );
}

export default Layout;