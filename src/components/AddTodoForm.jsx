import React from "react";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { useState } from "react";
// class AddTodoForm extends React.Component{

// }

const useStyles = makeStyles({
  root: {
    width: "100%",
    background: "red"
    //float: "right"
  }
});

function AddTodoForm(props) {
  const styles = useStyles();
  let [title, setTitle] = useState("");
  const onChange = e => {
    setTitle(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    props.addTodo(title);
    setTitle("");
  };

  return (
    <div styles={styles.root}>
      <form onSubmit={onSubmit}>
        <TextField
          name="title"
          onChange={onChange}
          value={title}
          placeholder="Enter todo title"
        />
        <Button type="submit" variant="contained" color="primary">
          Add Todo
        </Button>
      </form>
    </div>
  );
}

export default AddTodoForm;
