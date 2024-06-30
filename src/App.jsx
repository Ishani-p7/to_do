import { useState, useEffect } from 'react'
import Navbar from './components/Navbar'
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { v4 as uuidv4 } from 'uuid';

function App() { 

  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [showFinished, setshowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos")
    if(todoString){
      let todos = JSON.parse(localStorage.getItem("todos")) 
      setTodos(todos)
    }
  }, [])

  useEffect(() => {
    saveToLS();
  }, [todos]);

  const saveToLS = () => {
    localStorage.setItem("todos", JSON.stringify(todos))
  }

  const toggleFinished = (e) => {
    setshowFinished(!showFinished)
  }
  
  const handleEdit = (e, id) => { 
    let t = todos.find(i => i.id === id) 
    setTodo(t.todo)
    let newTodos = todos.filter(item => item.id !== id); 
    setTodos(newTodos)
  }

  const handleDelete = (e, id) => {  
    let newTodos = todos.filter(item => item.id !== id); 
    setTodos(newTodos)
  }

  const handleAdd = () => {
    if (todo.trim().length > 3) {
      setTodos([...todos, { id: uuidv4(), todo, isCompleted: false }])
      setTodo("")
    }
  }
  
  const handleChange = (e) => { 
    setTodo(e.target.value)
  }

  const handleCheckbox = (e) => { 
    let id = e.target.name;  
    let index = todos.findIndex(item => item.id === id); 
    let newTodos = [...todos];
    newTodos[index].isCompleted = !newTodos[index].isCompleted;
    setTodos(newTodos)
  }

  return (
    <>
      <Navbar/> 
      <div className="mx-3 md:container md:mx-auto my-5 rounded-xl p-5 bg-pink-100 min-h-[80vh] md:w-[35%]">
        <h1 className='font-extrabold text-center text-5xl font-ab text-rose-400'>Daily Planner - Your todos at one place</h1>
        <div className="addTodo my-5 flex flex-col gap-4">
          
          <div className="flex">
            <input 
              onChange={handleChange} 
              value={todo} 
              type="text" 
              placeholder="Add your todo here" 
              className='w-full rounded-full px-5 py-1 placeholder-rose-400'
            />
            <button 
              onClick={handleAdd} 
              disabled={todo.length <= 3} 
              className='bg-pink-500 mx-2 rounded-full hover:bg-pink-700 disabled:bg-pink-500 p-4 py-2 text-sm font-bold text-white'
            >
              Save
            </button>
          </div>
        </div>
        <input className='my-4' id='show' onChange={toggleFinished} type="checkbox" checked={showFinished} /> 
        <label className='mx-2' htmlFor="show">Show Finished</label> 
        <div className='h-[1px] bg-black opacity-15 w-[90%] mx-auto my-2'></div>
        <h2 className='text-3xl font-bold font-ab text-rose-400'>Your Todos</h2>
        <div className="todos">
          {todos.length === 0 && <div className='m-5'>No Todos to display</div>}
          {todos.map(item => (showFinished || !item.isCompleted) && (
            <div key={item.id} className="todo flex my-3 justify-between">
              <div className='flex gap-5'>
                <input name={item.id} onChange={handleCheckbox} type="checkbox" checked={item.isCompleted} id="" />
                <div className={item.isCompleted ? "line-through" : ""}>{item.todo}</div>
              </div>
              <div className="buttons flex h-full">
                <button onClick={(e) => handleEdit(e, item.id)} className='bg-pink-500 hover:bg-pink-700 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><FaEdit /></button>
                <button onClick={(e) => handleDelete(e, item.id)} className='bg-pink-500 hover:bg-pink-800 p-2 py-1 text-sm font-bold text-white rounded-md mx-1'><AiFillDelete /></button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default App
