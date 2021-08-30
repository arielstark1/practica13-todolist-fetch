import React, { useState, useRef, useEffect,  } from 'react';
import './App.css';

function App() {

  const [linkUrl] = useState("https://assets.breatheco.de/apis/fake/todos/user/Lucas-VY")
  const [assignment, setAssignment] = useState([]);

  let characterRef = useRef(null);
  const [todo, setTodo] = useState([]);

  useEffect(() => {
    getAssignment(linkUrl)
  }, [linkUrl]);

  //GET
  const getAssignment = linkUrl => {
    fetch(linkUrl)
      .then(Resp => Resp.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  //PUT
  const updateAssignment = (linkUrl, assignment) => {
    fetch(linkUrl, {
      method: 'PUT',
      body: JSON.stringify(assignment),
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(resp => resp.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  /*                */

  // POST
  const generateUser = linkUrl => {
    fetch(linkUrl, {
      method: 'POST',
      body: JSON.stringify([assignment]),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(Resp => Resp.json())
      .then(data => console.log(data.result))
      .catch(error => console.log(error));
  };

  const addAssignment = (e) => {
 // 13=enter 
    if (e.keyCode === 13 && characterRef.value !== "") {
      setTodo(todo.concat(characterRef.value));
      let newAssignments = [...assignment, { label: characterRef.value, done: false }]
      setAssignment(newAssignments)
      updateAssignment(linkUrl, newAssignments)
      characterRef.value = "";
    }
  }

  const addAssignmentB = () => {
    if (characterRef.value !== "") {
      setTodo(todo.concat(characterRef.value));
      characterRef.value = "";
    }
  }

  /*            */

  //DELETE
  const deleteUser = (linkUrl) => {
    fetch(linkUrl, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => console.log(data))
      .catch(error => console.log(error))
  }

  const deleteAssignment = (index) => {
    todo.splice(index, 1);
    setTodo([...todo]);
    assignment.splice(index, 1)
    setAssignment([...assignment])

    updateAssignment(linkUrl, assignment)
  }

  const deleteAllAssignments = () => {
    setTodo([])
    deleteUser(linkUrl)
    setAssignment([])
    console.warn('All deleted')
  }

  return (
    <>
      <div className="container">
        <div className="card mt-5">
          <div className="card-body" >
            <h1 className="card-title text-center">To-Do List</h1>
            <ol className="list-group list-group">
              <div className="input-group mb-3 list-group list-group">
                <input onKeyUp={addAssignment} ref={r => characterRef = r} type="text" id="input" className="list-group-item" placeholder="Press Enter to Add a Task or New User name!" />
                <div className="input-group-append list-group list-group">
                  <button onClick={() => generateUser(linkUrl)} className="btn btn-primary" type="button" id="button">New User</button>
                  <button onClick={addAssignmentB} className="btn btn-sm btn-success" type="button" id="button">Add</button>
                </div>
              </div>
              {
                !!todo.length > 0 && todo.map((todo, index) => {
                  return (
                    <li className="list-group-item py-1" key={index}>{todo}
                      <i className="fas fa-trash-alt float-right btn btn-danger" id="delete"
                        onClick={() => deleteAssignment(index)}></i></li>
                  )
                })
              }
            </ol>
          </div>
          <div className="card-footer">
            <strong> Current Nº of To-Do's: {todo.length}</strong>
            <button className="btn btn-sm float-right btn-danger" id="deleteAll" onClick={deleteAllAssignments}><i className="fas fa-eraser"> Eraise All</i></button>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
