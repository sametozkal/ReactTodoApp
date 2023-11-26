import React, { useState } from 'react'
import { v4 as uuidv4 } from 'uuid';
import List from './List';


export default function TaskForm() {
  const emptyForm = {task: "", priority: false,}
  const [formData, setFormData] = useState(emptyForm)
  const [tasks, setTasks] = useState([])
    
  function editTask(uuid) {
    console.log(uuid)
    const task = tasks.find(item => item.uuid === uuid)
    setFormData({...task, isEdited : true })
  }
   
    function removeTask(uuid) {
      console.log(uuid)
      setTasks(prev => prev.filter(item => item.uuid !== uuid))
    }
    function inputChange(event) {
      setFormData(prev => {
      return {
        ...prev,
        [event.target.name] : event.target.type === "checkbox" ? event.target.checked : event.target.value 
      }
    })
  }

  function handleFormSubmit(event) {
    event.preventDefault()
    if (formData.isEdited) {
     const taskIndex = tasks.findIndex(item => item.uuid === formData.uuid)
     const newTasks = tasks.slice()
     newTasks[taskIndex] = {...formData}
     setTasks(newTasks)
     console.log(editTask)
    }
    else if (formData.task.length > 3) {
      formData.uuid= uuidv4()
      setTasks(
        prev =>
        [formData, ...prev]
        )
    }
    setFormData(emptyForm)
    event.target.reset()
  }

  return (
    <div>
   
      <form onSubmit={handleFormSubmit}>
  <div class="row mb-3">
    <label htmlFor="task" class="col-sm-2 col-form-label">Görev</label>
    <div className="col-sm-10">
      <input type="text" className="form-control" id="task" name='task' value={formData.task} onChange={inputChange}/>
    </div>

  </div>
  
  <div class="row mb-3">
    <div class="col-sm-10 offset-sm-2">
      <div class="form-check">
        <input class="form-check-input" type="checkbox" id="priority" name='priority' checked={formData.priority} onChange={inputChange}/>
        <label class="form-check-label" for="priority">
          Öncelikli
        </label>
      </div>
    </div>
  </div>
  <button type="submit" class="btn btn-primary">KAYDET</button>
</form>
<List tasks={tasks} removeTask={removeTask} editTask={editTask} />
    </div>
  )
}

