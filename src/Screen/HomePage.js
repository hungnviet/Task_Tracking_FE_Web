import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
function HomePage() {
    const location = useLocation();
    const { userId } = location.state;
    // // const apiTask = "/"; ///Get all task to do list with userID
    // // const apiCheckedTask = "/" ///Get all task to do list with userID
    // const apiWorkspace = "/"; /// Get All workspace that userId are in this
    const navigate = useNavigate();
    // const [errTask, setErrTask] = useState(false);
    // const [errTaskMsg, setErrTaskMsg] = useState("");
    // const [errWorkspace, setErrWorkspace] = useState(false);
    // const [errWorkspaceMsg, setErrWorkspaceMsg] = useState("");

    // fetching data user with user id
    const userName = "Hùng"
    const [task, setTask] = useState([{ name: "Task 1", state: false }, { name: "Task 2", state: false }]);
    const [workspace, setWorkspace] = useState([{ name: "Medifind", id: "hihi" }, { name: "DB Assignment", id: "hehe" }, { name: "OS assignment", id: "hihi" },]);
    // async function getTask() {
    //     try {
    //         const response = await fetch(`${apiTask}/${userId}`, {
    //             method: "GET",
    //         })
    //         if (!response.ok) {
    //             setErrTask(true);
    //             setErrTaskMsg(response.statusText);
    //         }
    //         else {
    //             setErrTask(false);
    //             const data = await response.json();
    //             setTask(data);
    //         }
    //     }
    //     catch (error) {
    //         setErrTask(true);
    //         setErrTaskMsg("erorr get data");
    //     }
    // }
    // async function getCheckedTask() {
    //     try {
    //         const response = await fetch(`${apiCheckedTask}/${userId}`, {
    //             method: "GET",
    //         })
    //         if (!response.ok) {
    //             setErrTask(true);
    //             setErrTaskMsg(response.statusText);
    //         }
    //         else {
    //             setErrTask(false);
    //             const data = await response.json();
    //             setCheckedTask(data);
    //         }
    //     }
    //     catch (error) {
    //         setErrTask(true);
    //         setErrTaskMsg("erorr get data");
    //     }
    // }
    // async function getWorkspace() {
    //     try {
    //         const response = await fetch(`${apiWorkspace}/${userId}`, {
    //             method: "GET",
    //         })
    //         if (!response.ok) {
    //             setErrWorkspace(true);
    //             setErrWorkspaceMsg(response.statusText);
    //         }
    //         else {
    //             setErrWorkspace(false);
    //             const data = await response.json();
    //             setWorkspace(data);
    //         }
    //     }
    //     catch (error) {
    //         setErrWorkspace(true);
    //         setErrWorkspaceMsg("erorr get data");
    //     }

    // }
    // useEffect(() => {
    //     async function fetchData() {
    //         await getTask();
    //         await getCheckedTask();
    //         await getWorkspace();
    //     }
    //     fetchData();
    // }, []);

    const currentDate = new Date();
    const day = currentDate.getDate();
    let month = currentDate.getMonth() + 1;
    const year = currentDate.getFullYear();
    const currentHour = currentDate.getHours();
    const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
    ];
    month = monthNames[month];
    let greeting;

    if (currentHour >= 5 && currentHour < 12) {
        greeting = 'Good Morning';
    } else if (currentHour >= 12 && currentHour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }
    function handleChoseWorkSpace(userId, workSpaceId, workspaceName) {
        const encodedWorkspaceName = encodeURIComponent(workspaceName);
        navigate(`/workspace/${encodedWorkspaceName}`, { state: { userId, workSpaceId } });
    }
    function handelCheck(index) {
        const curState = [...task].at(index).state;
        let arr = [...task];
        arr[index].state = !curState;
        setTask(arr);
    }
    const isChecked = (state) => {
        return state ? "checked-item" : "non-checked-item"
    }
    const [isAddWorkspace, setIsAddWorkspace] = useState(false);
    const [isAddTask, setIsAddTask] = useState(false);
    const [inputa, setInputa] = useState("");
    const [inputb, setInputb] = useState("");
    function btnAdd(handleAdd, state) {
        return (
            <button onClick={handleAdd} style={btnStyle}>
                <img src={state ? require('../Images/iconAdd1.png') : require('../Images/iconAdd2.png')} style={{
                    height: 30,
                    width: 30
                }}></img>
            </button>
        )
    }
    function handleCreateWorkspace() {
        setIsAddWorkspace(!isAddWorkspace);
    }
    async function submitWorkspace() {
        const name = inputa;
        let id = "abcdef";
        // try {
        //     const response = await fetch(`${apiWorksapce}`, {
        //         method: "POST",
        //         headers: {
        //             'Content-Type': 'application/json',
        //         },
        //         body: JSON.stringify(name)
        //     })
        //     if (!response.ok) {
        //         alert("Please try again")
        //     }
        //     else {
        //         id = JSON.parse(response).workspaceId;
        //     }
        // }
        // catch (err) {
        //     alert(err.statusText);
        // }
        const newObj = { name: name, id: id };
        await setWorkspace([...workspace, newObj])
        await setInputa("");
        await setIsAddWorkspace(false);

    }
    function handleCreateTask() {
        setIsAddTask(!isAddTask);
    }
    async function submitTask() {
        const name = inputb;
        const newObj = { name: name, state: false };
        await setTask([...task, newObj])
        await setInputb("");
        await setIsAddTask(false);

    }
    return (
        <div className="homepage">
            <div className="header">
                <div className="header_left">
                    <div>
                        <img src={require('../Images/logoTaskTracking.png')} alt="logo" className="logo" />
                    </div>
                    <div>
                        <p>{greeting} {userName}  </p>
                        <p>Today is {month} {day}, {year} </p>
                    </div>
                </div>
                <div className="header_right">
                    <div>
                        <img src={require('../Images/user.png')} alt="user_icon" />
                    </div>
                    <p>{userName}</p>
                </div>
            </div>
            <div className="container">
                <div className="workspace_hommepage">
                    <p style={{ fontWeight: "500", marginBottom: 20, fontSize: 18 }}>Choose your workspace</p>
                    <div className="workspace_container">
                        {
                            workspace.map((el, index) => (
                                <button key={index} className="workspace_tag" onClick={() => handleChoseWorkSpace(userId, el.id, el.name)}>
                                    <p>{el.name}</p>
                                </button>
                            ))
                        }
                    </div>
                </div>
                {
                    btnAdd(handleCreateWorkspace, isAddWorkspace)
                }
                {
                    isAddWorkspace && (
                        <div className="addWorkspace">
                            <p>Create workspace</p>
                            <div className="input">
                                <input placeholder="Enter workspace name" value={inputa} onChange={(e) => setInputa(e.target.value)} ></input>
                                <button style={{ backgroundColor: '#023047', color: 'white', borderWidth: 0, borderRadius: 5, cursor: "pointer" }} onClick={submitWorkspace}>Create</button>
                            </div>
                        </div>
                    )
                }
            </div>
            <div className="container">
                <div className="task_homepage">
                    <p style={{ fontWeight: "500", marginBottom: 10, fontSize: 18 }}>My todo list</p>
                    <div className="toDoList_container">
                        {
                            task.map((el, index) => (
                                <div key={index} className="task_tag">
                                    <input value={el} type="checkbox" style={{ color: "#023047" }} onClick={() => handelCheck(index)} />
                                    <span className={isChecked(el.state)}>{el.name}</span>
                                </div>)

                            )
                        }
                    </div>
                </div>
                {
                    btnAdd(handleCreateTask, isAddTask)
                }
                {
                    isAddTask && (
                        <div className="addWorkspace">
                            <p>Create task</p>
                            <div className="input">
                                <input placeholder="Enter task" value={inputb} onChange={(e) => setInputb(e.target.value)} ></input>
                                <button style={{ backgroundColor: '#023047', color: 'white', borderWidth: 0, borderRadius: 5, cursor: "pointer" }} onClick={submitTask}>Create</button>
                            </div>
                        </div>
                    )
                }
            </div>


        </div>
    )
}
const btnStyle = {
    backgroundColor: "white", // Green background color
    color: 'black',             // White text color
    padding: '10px 20px',       // Padding
    borderRadius: '5px',        // Border radius
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    position: "absolute",
    top: 10,
    right: 10

}

export default HomePage