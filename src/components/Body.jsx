import { useState } from 'react'
import './Body.css'
import { Check, Trash2 } from "lucide-react";

function Body() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [date, setDate] = useState("")
  const [showCompleted, setshowCompleted] = useState(false)

  const addTask = () => {
    if (!task.trim()) return
    setTasks([...tasks, { title: task, date: date, completed: false }])
    setTask("")
    setDate("")
  }

  const toggleComplete = (selectedTask) => {
    setTasks(
      tasks.map((task) =>
        task === selectedTask
          ? { ...task, completed: !task.completed }
          : task
      )
    )
  }

  return (
    <div className='main-container'>

      <div className="body-container1">

        <input className='task' value={task} type="text" placeholder='What needs to be done?' onChange={(e) => setTask(e.target.value)} />
        <input className='date' value={date} type="date" onChange={(e) => setDate(e.target.value)} />
        <button className='add-task' onClick={addTask} >Add Task</button>

      </div>

      <div className="body-container2">

        <div className="filter">
          Filter by date: <input type="date" />
        </div>

        <button onClick={() => setshowCompleted(!showCompleted)} >{showCompleted ? "Show Pending" : "Show Completed"}</button>

      </div>

      <div className="body-container3">

        {
          tasks
            .filter(task => showCompleted ? task.completed : !task.completed)
            .map((task) => (

              <div className="task-bar" key={task.title}>

                {!task.completed && (

                  <button onClick={() => toggleComplete(task)} className="complete-btn">
                    <Check size={18} />
                  </button>

                )}

                <div className="task-info">
                  <div className="main-task">{task.title}</div>
                  <div className="date-task">{task.date}</div>
                </div>

                <button className="delete-btn">
                  <Trash2 size={18} />
                </button>

              </div>

            ))
        }


      </div>

    </div>
  )
}

export default Body
