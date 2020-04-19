const initialData = {
  tasks: {
    "task-1": {
      id: "task-1",
      content: "Pakistan",
      answer: "Asia",
      placed: "x"
    },
    "task-2": {
      id: "task-2",
      content: "China",
      answer: "Asia",
      placed: "x"
    },
    "task-3": {
      id: "task-3",
      content: "India",
      answer: "Asia",
      placed: "x"
    },
    "task-4": {
      id: "task-4",
      content: "Ireland",
      answer: "Europe",
      placed: "x"
    },
    "task-5": {
      id: "task-5",
      content: "Uganda",
      answer: "Africa",
      placed: "x"
    }
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "Countries",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5"]
    },
    "column-2": {
      id: "column-2",
      title: "Asia",
      taskIds: []
    },
    "column-3": {
      id: "column-3",
      title: "Europe",
      taskIds: []
    },
    "column-4": {
      id: "column-4",
      title: "Africa",
      taskIds: []
    }
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2", "column-3", "column-4"]
};

export default initialData;
