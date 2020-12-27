import { api, LightningElement, track } from "lwc";

export default class ToDoList extends LightningElement {
  anyChecked = false;
  anyTodo = false;
  @api todos;
  @track checkedTasks = [];

  renderedCallback() {
    console.log(`checked : ${this.anyChecked} todo: ${this.anyTodo}`);
    this.anyChecked = this.checkedTasks.length > 0 ? true : false;
    this.anyTodo = this.todos.length > 0 ? true : false;
  }

  handleCheckTask(e) {
    console.log("checked task" + e.target.value);
    this.todos.forEach((todo) => {
      if (todo.id === e.target.value) {
        this.checkedTasks.push({ id: todo.id, item: todo.item });
      }
    });
    this.todos = this.todos.filter((todo) => todo.id !== e.target.value);
    this.dispatchChangeTodo();
    console.log("todos after check: " + this.todos);
  }

  handleDeleteTask(e) {
    console.log("delete" + e.target.value);
    this.todos = this.todos.filter((todo) => todo.id !== e.target.value);
    this.dispatchChangeTodo();
    console.log("todos after delete: " + this.todos);
  }

  dispatchChangeTodo() {
    const changeTodoEvent = new CustomEvent("changetodos", {
      detail: this.todos
    });
    this.dispatchEvent(changeTodoEvent);
  }
}
