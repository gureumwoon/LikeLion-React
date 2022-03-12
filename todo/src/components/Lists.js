import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import { Droppable } from 'react-beautiful-dnd';
import { DragDropContext } from 'react-beautiful-dnd';
import List from './List';

const Lists = React.memo(({ todoData, setTodoData, handleClick }) => {
    console.log("Lists Component")
    const handleEnd = (result) => {
        if (!result.destination) return;
        const newTodoData = todoData;

        // 1. 변셩시키는 아이템을 배열에서 지원준다.
        // 2. return 값으로 지워진 아이템을 잡아줍니다.
        const [reorderedItem] = newTodoData.splice(result.source.index, 1);

        // 원하는 자리에 reorderItem을 insert 해줍니다.
        newTodoData.splice(result.destination.index, 0, reorderedItem);
        setTodoData(newTodoData);
    }
    return (
        <div>
            <DragDropContext onDragEnd={handleEnd}>
                <Droppable droppableId="todo">
                    {(provided) => (
                        <div  {...provided.droppableProps} ref={provided.innerRef}>
                            {todoData.map((data, index) => (
                                <Draggable
                                    key={data.id}
                                    draggableId={data.id.toString()}
                                    index={index}
                                >
                                    {(provided, snapshot) => (
                                        <List
                                            handleClick={handleClick}
                                            key={data.id}
                                            id={data.id}
                                            title={data.title}
                                            completed={data.completed}
                                            todoData={todoData}
                                            setTodoData={setTodoData}
                                            provided={provided}
                                            snapshot={snapshot}
                                        />
                                    )}
                                </Draggable>
                            ))}
                            {provided.placeholder}
                        </div>
                    )}
                </Droppable>
            </DragDropContext>
        </div>
    )
});

export default Lists


