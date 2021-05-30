import './App.css';
import React, { useState, useEffect } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
//should work

function App() {
  
  //state
  const [inputText, setInputText] = useState("");
  const [todos, setTodos] = useState ([]);
  const [status, setStatus] = useState ('all');
  const [filteredTodos, setFilteredTodos] = useState ([]);

  //single time use
  useEffect(() =>{
    getLocaltodos();
  }, []);

  //use effect
  useEffect(() => {
      //functions
  const filterHandler = () => {
    switch(status){
      case 'completed':
        setFilteredTodos(todos.filter(todo => todo.completed === true))
        break;
      case 'uncompleted':
        setFilteredTodos(todos.filter(todo => todo.completed === false))
        break;
      default:
        setFilteredTodos(todos);
        break;
        
      };
    };
    
    filterHandler();
    saveLocalTodos();
  }, [todos, status]);

  //Save to local
  const saveLocalTodos = () => {
      localStorage.setItem("todos", JSON.stringify(todos));
  };

  const getLocaltodos = () => {
    if (localStorage.getItem("todos") === null ) {
      localStorage.setItem("todos", JSON.stringify([]));
    } else {
      let todoLocal = JSON.parse(localStorage.getItem("todos", JSON.stringify(todos)));
      setTodos(todoLocal);
    }

  };




  return (
    <div className="App">
      <header>
        <h1>Nermo's todo list!</h1>
      </header>
      <Form inputText={inputText} 
      todos={todos} 
      setTodos={setTodos} 
      setInputText={setInputText} 
      setStatus={setStatus} 
      
      />
      <TodoList setTodos={setTodos} filteredTodos={filteredTodos} todos = {todos} />
    </div>
  );
}

export default App;
