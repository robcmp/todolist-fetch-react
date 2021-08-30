import React, { useState, useEffect } from "react";


const TodoList = () => {
    let [addTask, setTask] = useState('');
    let [addList, setList] = useState([]);
    let [isLoading, setLoading] = useState(false);

    useEffect(() => {
        uploadData();
    }, [])

    const uploadData = () => {
        fetch("https://assets.breatheco.de/apis/fake/todos/user/robcmppp", {
            method: 'GET',
            // mode: 'cors',
            // redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
            })
        }).then((res) => {
            console.log(res);
            return res.json()
        }).then(
            data => {
                console.log(data);

                setLoading(false)
                setList(data);

                // console.log(addList);
                // setTask(data)
            }

        ).catch(
            error => console.log(error)
        );
    }


    const addingToDo = (ev) => {
        setList([...addList, { label: '' + addTask + ' ', done: false }]);

        console.log(addList);
        fetch("https://assets.breatheco.de/apis/fake/todos/user/robcmppp", {
            method: 'PUT',
            // mode: 'cors',
            // redirect: 'follow',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            body: [JSON.stringify(addList)]
        }).then((res) => {
            console.log(res);
            return res.json()
        }).then(
            data => console.log(data)
        ).catch(
            error => console.log(error)
        );
        setTask("");
        // 

    }

    const valueChange = (e) => {
        setTask(e.target.value);

    }

    const deleteTask = (key) => {
        // fetch("https://assets.breatheco.de/apis/fake/todos/user/robcmppp", {
        //     method: 'DELETE',
        //     // mode: 'cors',
        //     // redirect: 'follow',
        //     headers: new Headers({
        //         'Content-Type': 'application/json'
        //     }),
        //     body: setList(addList.filter((item, index) => index !== key))
        // }).then((res) => {
        //     console.log(res);
        //     return res.json()
        // }).then(
        //     data => console.log(data)
        // ).catch(
        //     error => console.log(error)
        // );

        // setList(addList.filter((item, index) => index !== key));
    }

    return (
        <div className="d-flex justify-content-center">
            <div className="card" >
                <div className="card-body">
                    <h5 className="card-title">Todo List Fetch</h5>
                    <div>
                        <div className="input-group mb-3">
                            <input type="text" value={addTask} className="form-control" placeholder="Add to Do" aria-label="Add to Do" aria-describedby="button-addon2" onChange={valueChange} />
                            <button className="btn btn-outline-secondary" type="button" id="button-addon2" onClick={addingToDo}>Add Task</button>
                        </div>
                        <ul className="list-group">
                            {!isLoading ?
                                addList.map((item, index) => <li className="list-group-item list-group-item-info" key={index} >
                                    {
                                        item.label}</li>)
                                : <li className="list-group-item list-group-item-info">Loading data...</li>
                            }
                        </ul>
                        <span className="d-flex"><button onClick={() => {
                            deleteTask();
                        }}><i className="bi bi-x"></i>Delete list</button></span>
                    </div >
                </div>
            </div>
        </div>

    );
}

export default TodoList;