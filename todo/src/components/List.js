import React, { useState, useEffect } from "react";

const List = React.memo(({
    id, title, completed, todoData, setTodoData, provided, snapshot, handleClick
}) => {
    const [modify, setModify] = useState(false);
    const [changeText, setChangeText] = useState(title);

    const onClickModifyButton = () => {
        setModify(true);
    }

    const onClickSubmitButton = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.title = changeText
            }
            return data;
        }
        );
        setTodoData(newTodoData);
        setModify(false)
    }

    const handleModifyTitle = (e) => {
        setChangeText(e.target.value)
    }


    const handleCompleteChange = (id) => {
        let newTodoData = todoData.map((data) => {
            if (data.id === id) {
                data.completed = !data.completed;
            }
            return data;
        });
        setTodoData(newTodoData);
    }


    // 마운트 되었을 시 localstorage 데이터 불러오기
    useEffect(() => {
        const list = localStorage.getItem('lists');
        console.log(list, JSON.parse(localStorage.getItem('lists')));
        if (list) {
            setTodoData(JSON.parse(localStorage.getItem('lists')))
        }
    }, [])

    // todolist 업데이트 될 시 localstorage에 저장해주기
    useEffect(() => {
        localStorage.setItem('data', JSON.stringify(todoData));
    }, [todoData])


    return (
        <div
            key={id}
            {...provided.draggableProps}
            ref={provided.innerRef}
            {...provided.dragHandleProps}
            className={`${snapshot.isDragging ? "bg-gray-400" : "bg-gray-100"
                } flex items-center justify-between w-full px-4 py-1 my-2 text-gray-600 border rounded`}
        >
            <div className="items-center">
                <input
                    className="mr-2"
                    type="checkbox"
                    defaultChecked={false}
                    onChange={() => handleCompleteChange(id)}
                />

                {modify ? (
                    <input
                        type="text"
                        value={changeText}
                        onChange={handleModifyTitle} />
                ) : (
                    <span className={completed ? "line-through" : undefined}>
                        {title}
                    </span>
                )
                }
            </div>
            <div className="items-center">
                <button className="px-4 py-2 float-right hover:text-amber-500" onClick={() => handleClick(id)}>x</button>
                {
                    modify ? (
                        <button className="px-4 py-2 hover:text-amber-500" onClick={() => onClickSubmitButton(id)}>완료</button>
                    ) : (
                        <button className="px-4 py-2 hover:text-amber-500" onClick={onClickModifyButton}>수정</button>
                    )
                }
            </div>
        </div>
    )
});

export default List