let tasks = [];

const getTasks = () => tasks;

const createTask = (task) => {
  const { title, description, dueDate } = task;
  if (!title || !description || !dueDate) {
    throw new Error("invalid task data");
  }
  const newTask = {
    id: tasks.length + 1,
    title,
    description,
    dueDate,
  };
  tasks.push(newTask);
  return newTask;
};

const updateTask = (taskId, updatedTask) => {
  const { title, description, dueDate } = updatedTask;

  if (!title || !description || !dueDate) {
    throw new Error("invalid task data");
  }

  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
  if (taskIndex === -1) {
    return null;
  }

  tasks[taskIndex].title = title;
  tasks[taskIndex].description = description;
  tasks[taskIndex].dueDate = dueDate;

  return tasks[taskIndex];
};

const deleteTask = (taskId) => {
  const taskIndex = tasks.findIndex((task) => task.id === parseInt(taskId));
  if (taskIndex === -1) {
    return null;
  }

  const deletedTask = tasks.splice(taskIndex, 1);
  return deletedTask[0];
};

export { tasks, getTasks, createTask, updateTask, deleteTask };
