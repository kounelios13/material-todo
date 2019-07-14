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
  state = {
    todos: [],
    isLoading: true
  };

  addTodo = title => {
    const todo = {
      title,
      id: this.state.todos.length + 1,
      completed: false
    };
    this.setState({
      todos: [...this.state.todos, todo]
    });
  };
  toggleTodo = todo => {
    let { id } = todo;
    console.log(this);
    this.setState({
      todos: this.state.todos.map(item => {
        if (item.id === id) {
          item.completed = !item.completed;
        }
        return item;
      })
    });
  };

  deleteTodo = todo => {
    const { id } = todo;
    this.setState({
      todos: this.state.todos.filter(item => item.id !== id)
    });
  };

  async componentDidMount() {
    console.log("calling didMount");
    const promises = [];
    for (let i = 0; i < 5; i++) {
      promises.push(
        fetch(`https://jsonplaceholder.typicode.com/todos/${i + 1}`).then(
          response => response.json()
        )
      );
    }
    const data = await Promise.all(promises);
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
