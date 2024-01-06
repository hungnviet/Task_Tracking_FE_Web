import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useLocation } from 'react-router-dom';
function Workspace() {
    const navigate = useNavigate();
    const location = useLocation();
    const { userId, workSpaceId } = location.state;
    const userName = "Hùng"
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
    const apiTask = "/"   /// get All task with work spaceID,post Task with workspace ID,delete Task
    const apiWorkspace = "/"   /// Get All workspace with user ID that user are in 
    const apiMember = "/"  /// get,post, member with workspaceid;
    const apiLeader = "/" /// get leader infor with workspaceID;
    const [workspace, setWorkspace] = useState([{ name: "Medifind", id: "hihi" }, { name: "DB Assignment", id: "hehe" }, { name: "OS assignment", id: "haha" },]);
    const [member, setMember] = useState([{ name: "Nguyễn Viết Hùng", mail: "A@gmai.com", id: "123" }, { name: "Võ Nguyễn Gia Huy", mail: "B@gamil.com", id: "234" }]);
    const [leader, setLeader] = useState({ name: "member A", mail: "A@gmai.com", id: "123" });
    const workspaceName = workspace.filter((el) => el.id === workSpaceId)[0].name;
    const [task, setTask] = useState([{ name: "Task 1", subTask: [{ name: "Sub task1", state: false }, { name: "Sub task 2", state: false }], deadline: { date: 10, month: 1 }, participant: [{ name: "member A", mail: "A@gmai.com", id: "123" }, { name: "member B", mail: "B@gmai.com", id: "456" }], state: false }])
    const [state, setState] = useState(false);
    const [inputa, setInputa] = useState("");
    const [inputb, setInputb] = useState("");
    const [errAddMember, setErrAddMember] = useState("");
    const [loading, setLoading] = useState(false);

    // ///handlle err message when fetching data
    // const [errWorkspaceMsg, setErrWorkspaceMsg] = useState("");
    // const [errMemberMsg, setErrMemberMSg] = useState("");
    // const [errTask, setErrTask] = useState("");
    // async function getAllWorkspace() {
    //     try {
    //         const response = await fetch(`${apiWorkspace}/${userId}`, {
    //             method: "GET",
    //             headers: { 'Content-Type': 'application/json' },
    //         })
    //         if (!response.ok) {
    //             setErrWorkspaceMsg("Can not get data of workspace please refresh page and try again");
    //         }
    //         else {
    //             const data = await response.json();
    //             setErrWorkspaceMsg("");
    //             setWorkspace(data);
    //         }

    //     } catch (error) {
    //         setErrWorkspaceMsg("Can not get data of workspace please refresh page and try againi");
    //     }
    // }
    // async function getMember() {
    //     try {
    //         const response = await fetch(`${apiMember}/${workSpaceId}`, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         })
    //         if (!response.ok) {
    //             setErrMemberMSg("Can not get data of member please refresh page and try againi")
    //         }
    //         else {
    //             const data = await response.json();
    //             setErrMemberMSg("");
    //             setMember(data);
    //         }

    //     } catch (error) {
    //         setErrMemberMSg("Can not get data of member please refresh page and try againi")
    //     }
    // }

    // async function getLeader() {
    //     try {
    //         const response = await fetch(`${apiLeader}/${workSpaceId}`, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //         })
    //         if (!response.ok) {
    //             setErrMemberMSg("Can not get data of member please refresh page and try againi")
    //         }
    //         else {
    //             const data = await response.json();
    //             setErrMemberMSg("");
    //             setLeader(data);
    //         }

    //     } catch (error) {
    //         setErrMemberMSg("Can not get data of member please refresh page and try againi")
    //     }
    // }

    // async function getTask() {
    //     try {
    //         const response = await fetch(`${apiTask}/${workSpaceId}`, {
    //             method: "GET",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body:{
    //                   month:month
    //              }

    //         })
    //         if (!response.ok) {
    //             setErrTask("Can not get data of task please refresh page and try againi")
    //         }
    //         else {
    //             const data = await response.json();
    //             setErrTask("");
    //             setTask(data);
    //         }

    //     } catch (error) {
    //         setErrTask("Can not get data of task please refresh page and try againi")
    //     }
    // }
    // useEffect(() => {
    //     async function fetchData() {
    //         await getAllWorkspace;
    //         await getLeader;
    //         await getMember();
    //         await getTask();
    //     }
    //     fetchData();
    // }, [])

    const isCurWorkspace = (index) => {
        const state = workspace[index].id === workSpaceId;
        return state ? "workspace_btn_cur" : "workspace_btn";
    }
    function changeWorkspace(workSpaceId, workspaceName) {
        const encodedWorkspaceName = encodeURIComponent(workspaceName);
        navigate(`/workspace/${encodedWorkspaceName}`, { state: { userId, workSpaceId } });
    }
    function handleAddMember() {
        setState(!state)
        setErrAddMember("")
        setLoading(false)
    }
    async function submitAddMember() {
        const name = inputa;
        const mail = inputb;
        const obj = { name: name, mail: mail };
        if (name === "" || mail === "") {
            setErrAddMember("Pleasa enter enough information")
        }
        else {
            await setLoading(true);
            await setErrAddMember("");
            try {
                const response = await fetch(`${apiMember}/${workSpaceId}`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: obj
                })
                await setLoading(false);
                if (!response.oke) {
                    setErrAddMember("Name or Email does not exist. Please try again!")
                    setInputa("");
                    setInputb("");
                }
                else {
                    const data = await response.json();
                    setMember([...member, data]);
                    setInputa("");
                    setInputb("");
                    setState(false);
                }
            } catch (err) {
                setLoading(false);
                setErrAddMember("Error in fetching data please try again")
                setInputa("");
                setInputb("");
            }

        }
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
            <div className="workspace_main">
                <div className="side_bar">
                    <div className="workspace_list">
                        <p>Change workspace</p>
                        <div className="list_of_workspace">
                            {
                                workspace.map((el, index) => (
                                    <button className={isCurWorkspace(index)} onClick={() => changeWorkspace(el.id, el.name)}>
                                        {el.name}
                                    </button>
                                )
                                )
                            }
                        </div>
                    </div>
                    <div className="member_list">
                        <p style={{ fontWeight: 'bold' }}>Member list</p>
                        <div className="list_of_member">
                            {
                                member.map((el, index) => (
                                    <div >
                                        <p>{el.name}</p>
                                        <p style={{ color: "#8d99ae", fontSize: 12 }}>{el.mail}</p>
                                    </div>
                                ))
                            }
                        </div>

                        <button style={btnStyle} onClick={handleAddMember}>
                            <img src={state ? require('../Images/iconAdd1.png') : require('../Images/iconAdd2.png')} style={{
                                height: 30,
                                width: 30
                            }}></img>
                        </button>
                        {
                            state && (
                                <div className="addWorkspace">
                                    <p>Add member</p>
                                    <div className="input_member">
                                        <input placeholder="Enter Name" value={inputa} onChange={(e) => setInputa(e.target.value)} ></input>
                                        <input placeholder="Enter Mail" value={inputb} onChange={(e) => setInputb(e.target.value)} ></input>
                                        <button style={{ backgroundColor: '#023047', color: 'white', borderWidth: 0, borderRadius: 5, cursor: "pointer" }} onClick={submitAddMember}>Add</button>
                                    </div>
                                    <p style={{ color: "red" }}>{errAddMember}</p>
                                    {loading && (<p>loading...</p>)}
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className="main_workspace">
                    <p style={{ fontSize: 30, textTransform: "capitalize" }}>{workspaceName}</p>
                    <p>{month} {year}</p>
                    {
                        task.map((el, index) => (
                            <div className="task_tag" key={index}>
                                <div className="task_content">
                                    <div>
                                        <input type="checkBox" value={el.state}></input>
                                        {el.name}
                                    </div>
                                    <div>
                                        {
                                            el.subTask.map((subEl, subIndex) => (
                                                <div key={subIndex}>
                                                    <input type="checkBox" value={subEl.state}></input>
                                                    {subEl.name}
                                                </div>
                                            ))
                                        }
                                    </div>
                                    <div>
                                        {
                                            el.participant.map((subEl) => (<p>@{subEl.name} </p>))
                                        }
                                    </div>
                                    <p>Deadline: {el.deadline.date}/{el.deadline.month}</p>
                                    {
                                        (() => {
                                            const a = el.deadline.date - day;
                                            return a > 0 ? <p>{a} days left</p> : el.state === false ? <p>You are late</p> : <p>The task has been done</p>;
                                        })()
                                    }
                                </div>
                                <div className="task_rating">
                                </div>

                            </div>
                        ))
                    }

                </div>

            </div>
        </div >
    )
}
const btnStyle = {
    backgroundColor: "white", // Green background color
    cursor: 'pointer',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 0,
    position: "absolute",
    bottom: 10,
    left: 60,
    with: 30,
    height: 30

}
export default Workspace;