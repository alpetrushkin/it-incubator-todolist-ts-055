import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";
type TodoListType = {
   id: string
   title: string
   filter: FilterValuesType
}

function App() {
   let todolistID1 = v1()
   let todolistID2 = v1()

   let [todoList, setTodoList] = useState<Array<TodoListType>>([
      {id: todolistID1, title: 'What to learn', filter: 'all'},
      {id: todolistID2, title: 'What to buy', filter: 'all'}
   ])

   let [tasks, setTasks] = useState({
      [todolistID1]: [
         {id: v1(), title: "HTML&CSS", isDone: true},
         {id: v1(), title: "JS", isDone: true},
         {id: v1(), title: "ReactJS", isDone: false},
         {id: v1(), title: "Rest API", isDone: false},
         {id: v1(), title: "GraphQL", isDone: false}
      ],
      [todolistID2]: [
         {id: v1(), title: "HTML&CSS2", isDone: true},
         {id: v1(), title: "JS2", isDone: true},
         {id: v1(), title: "ReactJS2", isDone: false},
         {id: v1(), title: "Rest API2", isDone: false},
         {id: v1(), title: "GraphQL2", isDone: false}
      ],
   });

   // let [filter, setFilter] = useState<FilterValuesType>("all");

   const removeTodoList = (todolistID: string) => {
      setTodoList(todoList.filter(el => el.id !== todolistID))
      delete tasks[todolistID]
   }

   function removeTask(todolistID: string, taskId: string) {
      setTasks({...tasks, [todolistID]: tasks[todolistID].filter(el => el.id !== taskId)})
      // let filteredTasks = tasks.filter(t => t.id !== id);
      // setTasks(filteredTasks);
   }

   function addTask(todolistID: string, title: string) {
      let newTask = {id: v1(), title: title, isDone: false};
      setTasks({...tasks, [todolistID]: [newTask, ...tasks [todolistID]]})
      // let newTasks = [task, ...tasks];
      // setTasks(newTasks);
   }

   function changeStatus(todolistID: string, taskId: string, newIsDone: boolean) {
      setTasks({
         ...tasks,
         [todolistID]: tasks[todolistID].map(el => el.id === taskId ? {...el, isDone: newIsDone} : el)
      })
      // let task = tasks.find(t => t.id === taskId);
      // if (task) {
      //    task.isDone = isDone;
      // }
      //
      // setTasks([...tasks]);
   }

   // let tasksForTodolist = tasks;
   //
   // if (filter === "active") {
   //    tasksForTodolist = tasks.filter(t => t.isDone);
   // }
   // if (filter === "completed") {
   //    tasksForTodolist = tasks.filter(t => !t.isDone);
   // }
   //
   function changeFilter(todolistID: string, filterValue: FilterValuesType) {
      // setFilter(value);
      setTodoList(todoList.map(el => el.id === todolistID ? {...el, filter: filterValue} : el))
   }

   return (
      <div className="App">
         {
            todoList.map(tl => {
               let tasksForTodolist = tasks[tl.id];

               if (tl.filter === "active") {
                  tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
               }
               if (tl.filter === "completed") {
                  tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
               }

               return (
                  <Todolist
                     key={tl.id}
                     todolistID={tl.id}
                     title={tl.title}
                     tasks={tasksForTodolist}
                     removeTask={removeTask}
                     changeFilter={changeFilter}
                     addTask={addTask}
                     changeTaskStatus={changeStatus}
                     filter={tl.filter}
                     removeTodoList={removeTodoList}
                  />
               )
            })
         }
      </div>
   );
}

export default App;
