import './App.css';
import { useEffect, useState } from 'react';

const icons = {
    add: 'add_box',
    checked: 'check_box',
    unchecked: 'check_box_outline_blank'
}

function App() {
  const [data, setData] = useState([])
  const [text, setText] = useState("")

  function onComplete(item) {
    setData(data.filter(x => x.id !== item.id))
  }

  function onTextInput(e) {
    setText(e.target.innerText)
  }

  function onNewTodo(item) {
    if (text !== "") {
      setData(existing => [...existing, {id:Date.now(), text:text, complete:false}]);
      setText("");
      document.getElementById('text-box').innerText = "";
    }
  }

  function clearTodos() {
    setData([])
  }

  function readTodos() {
    setData(JSON.parse(localStorage.todos))
  }

  function writeTodos() {
    localStorage.setItem('todos', JSON.stringify(data))
  }

  useEffect(() => {
    if (!localStorage.todos) {
      localStorage.setItem('todos', JSON.stringify([]))
    }
    readTodos()
  }, [])

  useEffect(() => {
    writeTodos()
  }, [data])

  return (
    <div className="app">
      <div className="title">
        My Todo List
      </div>

      <div className="container">
        {data &&
          data.map((item) => {
            return (
              <div className="todo-item" key={item.id}>
                <div className="todo-text">{item.text}</div>
                <i className="material-icons checkbox" onClick={() => onComplete(item)}>
                    {item.complete ? icons.checked : icons.unchecked}
                </i>
              </div>
            )
          })
        }
        <div className="todo-item new-item">
          <div id="text-box" onInput={onTextInput}
            spellCheck="false" 
            contentEditable="true" 
            placeholder="New todo"
            className="new-item-text single-line" 
          />
          <i onClick={() => onNewTodo()}
             className={"material-icons btnAdd " 
             +(text !== "" ? "enabled": "disabled")} 
          >
            {icons.add}
          </i>
        </div>
      </div>
      <p/>
      <button className="btnClear" onClick={clearTodos}>Clear todos</button>

      <footer>
        <p><code>Made with <i class="icon ion-heart secondary"></i> in React</code></p>
      </footer>
    </div>
  );
}

export default App;
