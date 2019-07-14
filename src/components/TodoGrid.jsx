import {
  List,
  ListItem,
  ListItemIcon,
  ListItemSecondaryAction,
  Checkbox
} from "@material-ui/core";
import IconButton from "@material-ui/core/IconButton";
import ListItemText from "@material-ui/core/ListItemText";
// import CommentIcon from "@material-ui/icons/Comment";
import DeleteIcon from "@material-ui/icons/Delete";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
const useStyles = makeStyles(theme => ({
  root: {
    width: "100%",

    backgroundColor: theme.palette.background.paper,
    margin: "auto"
  },
  listItem: {
    // width: "100% !important",
    // background: "yellow"
  }
}));

function TodoGrid(props) {
  console.log({ props });
  const { todos } = props;
  const classes = useStyles();
  console.log(classes);
  return (
    <List className={classes.root}>
      {todos.map(todo => {
        return (
          <ListItem
            className={classes.listItem}
            key={todo.id}
            role={void 0}
            dense
            button
            onClick={() => props.toggleTodo(todo)}
          >
            <ListItemIcon>
              <Checkbox
                edge="start"
                checked={todo.completed}
                tabIndex={-1}
                disableRipple
                inputProps={{
                  "aria-labelledby": `label-id-${todo.id}`
                }}
              />
            </ListItemIcon>
            <ListItemText id={`label-id-${todo.id}`} primary={todo.title} />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="Comments"
                onClick={() => props.deleteTodo(todo)}
              >
                <DeleteIcon />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
        );
      })}
    </List>
  );
}

export default TodoGrid;
