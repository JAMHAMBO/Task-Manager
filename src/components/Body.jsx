import React from 'react'
import './Body.css'
import { Check, Trash2 } from "lucide-react";

function Body() {
  return (
    <div className='main-container'>

      <div className="body-container1">

        <input className='task' type="text" placeholder='What needs to be done?' />
        <input className='date' type="date" />
        <button className='add-task' >Add Task</button>

      </div>

      <div className="body-container2">

        <div className="filter">
          Filter by date: <input type="date" />
        </div>

        <button>Show Completed</button>

      </div>

      <div className="body-container3">

        <div className="task-bar">

          <button className="complete-btn">
            <Check size={18} />
          </button>

          <div className="task-info">
            <div className="main-task">Finish Project Report</div>
            <div className="date-task">13-08-2026</div>
          </div>

          <button className="delete-btn">
            <Trash2 size={18} />
          </button>

        </div>

      </div>

    </div>
  )
}

export default Body
