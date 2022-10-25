import React, {useState} from 'react';
import {TextField, FlatButton, DatePicker, RefreshIndicator, TimePicker, Dialog} from 'material-ui';
import {EditorModeEdit, NavigationClose, NavigationRefresh} from 'material-ui/svg-icons';
import "./style.css";
import gql from 'graphql-tag';
import {useMutation, useQuery} from 'react-apollo';

const POSTTODO = gql`
    mutation posttodolist($task: String, $date: String, $time:String){
        posttodolist(task: $task, date: $date, time: $time){
            error
        }
    }
`;

const DELETETODO = gql`
    mutation deletetodolist($id: String){
        deletetodolist(id: $id){
            error
        }
    }
`;

const EDITTODO = gql`
    mutation edittodolist($id: String, $task: String, $date: String, $time:String){
        edittodolist(id: $id, task: $task, date: $date, time: $time){
            error
        }
    }
`;

const GETTODO = gql`
    query{
        todolistget{
            id, task, date, time
        }
    }
`;

function Home() {

    const [getDate, setDate] = useState("");
    const [getTime, setTime] = useState("");
    const [PopBoxerStart, PopBoxerEnd] = useState(false);
    const [PopBoxTextGet, PopBoxTextSet] = useState(null);
    const [idHiderGet, idHiderSet] = useState("");
    const [posttodomutation] = useMutation(POSTTODO);
    const [edittodomutation] = useMutation(EDITTODO);
    const [deletetodomutation] = useMutation(DELETETODO);
    const {loading, error, data, refetch} = useQuery(GETTODO);

    const sizeoflogos = {
        color: "rgb(107, 43, 8)",
        width:"1.8em", 
        height:"1.8em",
        paddingTop:"2px",
        marginLeft:"30px",
        cursor:"pointer"
    }

    if(loading){
        return <RefreshIndicator 
                status='loading'
                left={28} top={100}
                style={{backgroundColor: 'black'}} 
                loadingColor="white" size={30}
                />;
    }

    if(error){
        return <p>Error...</p>;
    }

    const PopBox = (val) => {
        PopBoxTextSet(val); //set the text for error display
    }

    const PopBoxClosed = () => {
        PopBoxerEnd(false);
    }

    const changeDate = async() => {
        let dater = await document.getElementById("dateid");
        await setDate(dater.value);
    }

    const changeTime = async() => {
        let timer = await document.getElementById("timeid");
        await setTime(timer.value);
    }

    const SaveFunc = () => {
        let task = document.getElementById("taskid");

        if(idHiderGet !== ""){
            if(task === ""){
                PopBoxerEnd(true); 
                PopBox("Task not set");
                return false;
            }
            edittodomutation({variables: {id: idHiderGet, task: task.value, date: getDate === "" ?  null : getDate, time: getTime === "" ?  null : getTime}}).then(({data}) => {
                if(data.edittodolist.error === "no"){
                    refetch();
                    idHiderSet("");
                }
            }).catch(() => console.log("Error"));
        }else{
            if(task.value === ""){
                PopBoxerEnd(true); 
                PopBox("Task not set");
                return false;
            }
    
            if(getDate === ""){
                PopBoxerEnd(true); 
                PopBox("Date not set");
                return false;
            }
            if(getTime === ""){
                PopBoxerEnd(true); 
                PopBox("Time not set");
                return false;
            }
            posttodomutation({variables: {task: task.value, date: getDate, time: getTime}}).then(({data}) => {
                if(data.posttodolist.error === "no"){
                    refetch();
                }
            }).catch(() => console.log("Error"));
        }
    }

    const DeleteTodo = (d) => {
        deletetodomutation({variables: {id: d}}).then(({data}) => {
            if(data.deletetodolist.error === "no"){
                refetch();
            }
        }).catch(() => console.log("Error"));
    }

    const EditTodo = async(id, task) => {
        document.getElementById("taskid").value = task;
        setDate(""); setTime("");
        idHiderSet(id);
    }

    const Reloader = () => {
        window.location.reload();
    }

    return (
        <div>
            <br/>
            <div className="todo">
                <div className="tdlist">
                    Set TodoList
                    <span onClick={() => Reloader()}><NavigationRefresh style={sizeoflogos}/></span>    
                </div>
                <TextField 
                    floatingLabelText="Task"
                    floatingLabelStyle={{color:"rgb(107, 43, 8)"}}
                    type="text"
                    fullWidth={true}
                    name="task"
                    id="taskid"
                />
                <DatePicker
                    openToYearSelection={true}
                    fullWidth={true}
                    floatingLabelText="Date" 
                    floatingLabelStyle={{color:"rgb(107, 43, 8)"}}
                    id="dateid"
                    onChange={() => changeDate()}                                     
                />
                <TimePicker
                    fullWidth={true}
                    floatingLabelText="Time" 
                    floatingLabelStyle={{color:"rgb(107, 43, 8)"}}
                    id="timeid"
                    onChange={() => changeTime()}    
                />
                <br/>
                <FlatButton 
                    label="Save"
                    fullWidth={true}
                    backgroundColor="rgb(107, 43, 8)"
                    hoverColor="black"
                    labelStyle={{fontSize:"15px", 
                                fontWeight:"bold",
                                fontFamily: 'sans-serif',
                                color:"white"}}
                    onClick={() => SaveFunc()}
                />
            </div>
            <br/>
            <div className="todo">
                <div className="tdlist">Get List</div>
                {data.todolistget.map((td) => (
                    <div key={td.id}>
                    <div className="post">
                        <span>{td.task} at </span>
                        <span>{td.time} on </span>
                        <span>{td.date}</span>
                        <span className="edit" onClick={() => EditTodo(td.id, td.task, td.date, td.time)}> <EditorModeEdit style={{color: "rgb(107, 43, 8)", width:"1.4em", height:"1.4em"}}/> </span>
                        <span className="delete" onClick={() => DeleteTodo(td.id)}> <NavigationClose style={{color: "rgb(107, 43, 8)", width:"1.4em", height:"1.4em"}}/> </span>
                    </div>
                    <br/>
                    </div>
                ))}
            </div>
            {PopBoxerStart ? <Dialog 
                        title="Error" open={true} 
                        children={<p>{PopBoxTextGet}</p>}
                        onRequestClose={() => PopBoxClosed()}
                    /> : ""}
            <br/><br/><br/>
        </div>
    );
}

export default Home;