import React from "react";
import "./App.css";
import AddTodoForm from "./components/AddTodoForm";
import Header from "./components/Header";
import TodoGrid from "./components/TodoGrid";
import {
  Container,
  CssBaseline,
  Typography,
  LinearProgress
} from "@material-ui/core";

class App extends React.Component {
  // @INFO
  // setState is asynchronous
  state = {
    todos: [],
    isLoading: true
  };

  updateLocalStorage = () => {
    localStorage.setItem("todos", JSON.stringify(this.state.todos));
  };

  addTodo = title => {
    const todo = {
      title,
      id: this.state.todos.length + 1,
      completed: false
    };
    this.setState(
      {
        todos: [...this.state.todos, todo]
      },
      this.updateLocalStorage
    );
  };
  toggleTodo = todo => {
    let { id } = todo;
    this.setState(
      {
        todos: this.state.todos.map(item => {
          if (item.id === id) {
            item.completed = !item.completed;
          }
          return item;
        })
      },
      this.updateLocalStorage
    );
  };

  deleteTodo = todo => {
    const { id } = todo;
    this.setState(
      {
        todos: this.state.todos.filter(item => item.id !== id)
      },
      this.updateLocalStorage
    );
  };

  componentDidMount() {
    const data = JSON.parse(localStorage.getItem("todos")) || [];
    const todos = data.map(todo => ({
      id: todo.id,
      title: todo.title,
      completed: todo.completed
    }));
    this.setState({ todos, isLoading: false });
  }

  isLoading() {
    return this.state.isLoading;
  }
  render() {
    return (
      <React.Fragment>
        <Header />
        <CssBaseline />
        <Container>
          {this.isLoading() ? (
            <React.Fragment>
              <Typography>Loading todos...</Typography>
              <LinearProgress />
            </React.Fragment>
          ) : (
            <div>
              <Typography>Total todos : {this.state.todos.length}</Typography>
              <TodoGrid
                todos={this.state.todos}
                deleteTodo={this.deleteTodo}
                toggleTodo={this.toggleTodo}
              />
              <AddTodoForm addTodo={this.addTodo} />
            </div>
          )}
        </Container>
      </React.Fragment>
    );
  }
}
export default App;
