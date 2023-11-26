import { useEffect, useState } from "react"

export default function List({tasks, removeTask, editTask}) {
    
    const [priority, setPriority] = useState(false)
    const [filteredTasks, setFilteredTasks] = useState(tasks)

    function handlePriorityFiltered() {
        setPriority(prev => !prev)
    }

    useEffect (()=> {
        setFilteredTasks(tasks)
    },[tasks])


    useEffect (()=> {
        priority ? setFilteredTasks(tasks.filter(item => item.priority === priority)) : setFilteredTasks(tasks)
    },[priority])


    if (tasks.length === 0) {
        return <> </>
    }
   
    return (
        <>
        <div className="p-4 bg-light mb-5 rounded">
        <p className="lead">Yapılacaklar Lisetesi 
        <span onClick={handlePriorityFiltered}
        className="btn btn-info btn-sm float-end">
            {priority ? "Hepsini Göster" : "Öncelikli olanları Göster"}    
        </span></p>
         <ul className="list-group">
          {filteredTasks.map((item) =>
          <li className="list-group-item" key={item.uuid}>
            {item.priority && <span className="badge text-bg-secondary me-2 bg-danger">Öncelikli</span>}
            {item.task}
           <span className="btn btn-danger btn-sm float-end" onClick={() => removeTask(item.uuid)}>SİL</span>
           <span className="btn btn-info btn-sm float-end" onClick={() => editTask(item.uuid)}>DÜZENLE</span>
          </li>
          )}
         </ul>
        </div>
        </>
    )
}