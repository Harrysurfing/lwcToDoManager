import { LightningElement, track } from "lwc";

export default class ToDoManager extends LightningElement {
  time;
  greeting;
  //anyChecked = false;
  //anyTodo = false;
  @track todos = [];
  //@track checkedTasks = [];

  connectedCallback() {
    this.getTime();
    this.getGreetings();

    setInterval(() => {
      this.getTime();
      this.getGreetings();
    }, 1000 * 20);
  }
  /*renderedCallback() {
    this.anyChecked = this.checkedTasks.length > 0 ? true : false;
    this.anyTodo = this.todos.length > 0 ? true : false;
  }*/

  getTime() {
    let hour = this.getHour();
    let minutes = this.getMinute();
    let postfix = this.getAmPm();
    if (hour < 10) {
      hour = "0" + hour;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    this.time = `${hour} : ${minutes} ${postfix}`;
  }

  getHour() {
    return new Date().getHours();
  }
  getMinute() {
    return new Date().getMinutes();
  }
  getAmPm() {
    let hour = this.getHour();
    return hour >= 12 ? "PM" : "AM";
  }
  getGreetings() {
    let hour = this.getHour();
    if (hour < 12) {
      this.greeting = "Good Morning";
    } else if (hour >= 12 && hour < 18) {
      this.greeting = "Good Afternoon";
    } else if (hour >= 18 && hour <= 23) {
      this.greeting = "Good Evening";
    } else {
      this.greeting = "Welcome";
    }
  }

  handleAddTask() {
    const taskInput = this.template.querySelector("lightning-input");

    this.todos.push({
      id: `todoItem${Math.floor(Math.random() * 100)}`,
      item: taskInput.value
    });
    console.log("added task " + taskInput.value);
    console.log("todos are now " + this.todos);

    taskInput.value = "";
  }

  handleChangeTodos(e) {
    this.todos = e.detail;
    console.log("todos changed : " + this.todos);
  }

  /*handleCheckTask(e) {
    console.log("checked task" + e.target.value);
    this.todos.forEach((todo) => {
      if (todo.id === e.target.value) {
        this.checkedTasks.push({ id: todo.id, item: todo.item });
      }
    });
    this.todos = this.todos.filter((todo) => todo.id !== e.target.value);
  }

  handleDeleteTask(e) {
    console.log(e.target.value);
    this.todos = this.todos.filter((todo) => todo.id !== e.target.value);
  }*/
}
