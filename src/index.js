import React from "react";
import ReactDOM from "react-dom";
import "@atlaskit/css-reset";
import { DragDropContext } from "react-beautiful-dnd";
import styled from "styled-components";
import Swal from "sweetalert2";
import initialData from "./initial-data";
import Column from "./column";

const Container = styled.div`
    display: flex;
`;

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = initialData;
    }

    // Declare a new state variable, which we'll call "count"

    onDragEnd = (result) => {
        const { destination, source, draggableId } = result;
        if (!destination) {
            return;
        }
        if (
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }
        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];
        if (start === finish) {
            const newTaskIds = Array.from(start.taskIds);
            newTaskIds.splice(source.index, 1);
            newTaskIds.splice(destination.index, 0, draggableId);
            const newColumn = {
                ...start,
                taskIds: newTaskIds,
            };
            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };
            this.setState(newState);
            return;
        }
        // Moving from one list to another
        const startTaskIds = Array.from(start.taskIds);
        startTaskIds.splice(source.index, 1);
        const newStart = {
            ...start,
            taskIds: startTaskIds,
        };
        const finishTaskIds = Array.from(finish.taskIds);
        finishTaskIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            taskIds: finishTaskIds,
        };
        const newState = {
            ...this.state,
            tasks: {
                ...this.state.tasks,
                [draggableId]: {
                    ...this.state.tasks.draggableId,
                    placed: destination.title,
                },
            },
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        console.log(newState);
        this.setState(newState);
    };

    handleClear = () => {
        console.log(this.state);
    };

    handleSubmit = () => {
        const obj = this.state.tasks;
        const answers = this.state.columns;
        let items = (Object.keys(obj).length - 1) / 2;
        let score = 0;
        let attempted = 0;
        Object.keys(obj).forEach((key) => {
            if (obj[key]["placed"] && obj[key]["placed"] !== "x") {
                attempted += 1;
            }
            if (obj[key]["answer"] && obj[key]["answer"] === answers[key]) {
                score += 1;
            }
        });
        if (attempted !== items) {
            this.setState(
                { status: "Please attempt all items before submitting" },
                () => {
                    Swal.fire("Incomplete", this.state.status, "warning");
                }
            );
        } else {
            if (score === items) {
                this.setState({ status: "answer correct" }, () => {
                    Swal.fire("Awesome!", this.state.status, "success");
                });
            } else {
                this.setState({ status: "answer incorrect" }, () => {
                    Swal.fire("Sorry!", this.state.status, "error");
                });
            }
        }
    };

    render() {
        return (
            <div>
                <DragDropContext onDragEnd={this.onDragEnd}>
                    <Container>
                        {this.state.columnOrder.map((columnId) => {
                            const column = this.state.columns[columnId];
                            const tasks = column.taskIds.map(
                                (taskId) => this.state.tasks[taskId]
                            );
                            return (
                                <Column
                                    key={column.id}
                                    column={column}
                                    tasks={tasks}
                                />
                            );
                        })}
                    </Container>
                </DragDropContext>
                <button onClick={this.handleClear}> Clear </button> &nbsp;
                <button onClick={this.handleSubmit}> Submit </button> &nbsp;
            </div>
        );
    }
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
