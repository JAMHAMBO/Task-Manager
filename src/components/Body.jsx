import { useState, useEffect } from 'react'
import './Body.css'
import { Check, Trash2, CalendarDays } from "lucide-react";

function Body() {

  const [task, setTask] = useState("")
  const [tasks, setTasks] = useState([])
  const [date, setDate] = useState("")
  const [showCompleted, setshowCompleted] = useState(false)
  const [filterDate, setfilterDate] = useState("")

  useEffect(() => {

    const getTasks = async () => {

      const response = await fetch("http://localhost:3000/api/tasks")

      const data = await response.json()

      setTasks(data)
    }

    getTasks()

  }, [])

  const addTask = async () => {
    if (!task.trim()) return

    const response = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: task,
        date: date,
        completed: false
      })
    })

    const newTask = await response.json()

    setTasks([...tasks, newTask])

    setTask("")
    setDate("")
  }

  const toggleComplete = async (selectedTask) => {

    let updatedTask = {
      ...selectedTask,
      completed: !selectedTask.completed
    }

    const response = await fetch(
      `http://localhost:3000/api/tasks/${selectedTask._id}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(updatedTask)
      }
    )

    const data = await response.json()

    setTasks(
      tasks.map((task) => {
        if (task._id === data._id) {
          return data
        } else {
          return task
        }
      })
    )
  }

  const deleteTask = async (selectedTask) => {

    await fetch(
      `http://localhost:3000/api/tasks/${selectedTask._id}`,
      {
        method: "DELETE"
      }
    )

    const newTasks = []

    for (let task of tasks) {
      if (task._id !== selectedTask._id) {
        newTasks.push(task)
      }
    }

    setTasks(newTasks)
  }
  const getFilteredTasks = () => {

    let filteredTasks = []

    for (let task of tasks) {

      if (showCompleted === true) {

        if (task.completed === true) {

          if (filterDate === "" || task.date === filterDate) {
            filteredTasks.push(task)
          }

        }

      } else {

        if (task.completed === false) {

          if (filterDate === "" || task.date === filterDate) {
            filteredTasks.push(task)
          }

        }
      }
    }
    return filteredTasks
  }

  return (
    <div className='main-container'>

      <div className="body-container1">

        <input className='task' value={task} type="text" placeholder='What needs to be done?' onChange={(e) => setTask(e.target.value)} />
        <div className="date-mobile">
          <CalendarDays size={23} />

          <input
            className="date"
            value={date}
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>       
         <button className='add-task' onClick={addTask} >Add Task</button>

      </div>

      <div className="body-container2">

        <div className="filter">
          Filter by date:

          <div className="filter-date-mobile">
            <CalendarDays size={18} />
            <input
              value={filterDate}
              onChange={(e) => setfilterDate(e.target.value)}
              type="date"
            />
          </div>
        </div>

        <button onClick={() => setshowCompleted(!showCompleted)} >{showCompleted ? "Show Pending" : "Show Completed"}</button>

      </div>

      <div className="body-container3">

        {
          getFilteredTasks().map((task) => (

            <div className="task-bar" key={task._id}>

              {!task.completed && (

                <button onClick={() => toggleComplete(task)} className="complete-btn">
                  <Check size={18} />
                </button>

              )}

              <div className="task-info">
                <div className="main-task">{task.title}</div>
                <div className="date-task">{task.date}</div>
              </div>

              <button onClick={() => deleteTask(task)} className="delete-btn">
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
