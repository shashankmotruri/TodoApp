import React,{useState,useEffect} from 'react'
import Logout from './auth/Logout'
import "./Home.css"
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import CreateIcon from '@material-ui/icons/Create';
import {Link} from 'react-router-dom'
import Button from '@material-ui/core/Button';
import HomeIcon from '@material-ui/icons/Home';
import PlaylistAddIcon from '@material-ui/icons/PlaylistAdd';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import SaveIcon from '@material-ui/icons/Save';
import axios from 'axios';
import { API_URL } from './APIcalls/backend';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';
import {GetAllTodos,GetTodoById} from './APIcalls/Todo';

const useStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export default function Home(){

    const [opensuccess, setOpenSuccess] = React.useState(false);
    const [openerror, setOpenError] = React.useState(false);
    const [successmsg,setSuccessmsg] = React.useState('');
    const [opendelete, setOpenDelete] = React.useState(false);
    const [deletemsg,setDeletemsg] = React.useState('');
    const [openinfo, setOpenInfo] = React.useState(false);
    const [infomsg,setInfomsg] = React.useState('');
    const [errormsg,setErrormsg] = React.useState('');

    const [userDetails,setUserDetails] = useState(JSON.parse(localStorage.getItem("User")))
    const [allTodos,setAllTodos] = useState("");
    const classes = useStyles();
    const [opentodomodal, setOpenTodoModal] = React.useState(false);
    const [title,setTitle] = useState('');
    const [description,setDescription] = useState('');

    const [openedittodo,setOpenEditTodo] = useState(false);
    const [editid,setEditId] = useState(0);
  
    const handleOpenTodoModal = () => {
      setOpenTodoModal(true);
    };
  
    const handleCloseTodoModal = () => {
      setOpenTodoModal(false);
      setOpenEditTodo(false);
    };

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
        setOpenError(false);
        setOpenSuccess(false);
        setOpenDelete(false);
        setOpenInfo(false)
    };

    const handleSubmit = (e) => {
        e.preventDefault();
    
        axios.post(`${API_URL}/api/todo/addTodo/${userDetails.googleId}`,{
            name: title,
            description: description,
       
        })
            .then((res) => {
                console.log(res)
                if(res.status === 200){
                    setSuccessmsg("Successfully Saved :)")
                    setOpenSuccess(true);
                    setOpenTodoModal(false);
                }
            })
            .catch((err) => {
                setErrormsg(err);
                setOpenError(true)
            })
        
    }

    const handleEditSubmit = (e) => {
        e.preventDefault()

        axios.put(`${API_URL}/api/todo/updateTodo/${userDetails.googleId}/${editid}`,{
            updatedName : title,
            updatedDescription : description,
        })
            .then((response) => {
                if(response.status === 200) {
                    setInfomsg("Updated Successfully...")
                    setOpenInfo(true)
                    setOpenEditTodo(false)
                }
            })
            .catch((err) => {
                console.log(err);
            })
    }
    function deleteTodo(userId,todoId) {
        axios.delete(`${API_URL}/api/todo/deleteTodo/${userId}/${todoId}`)
            .then((res) => {
                if(res.status === 200) {
                    console.log(res)
                    setDeletemsg("Deleted Successfully");
                    setOpenDelete(true)
                }
            })
    }

    function handleEditTodo(userId, todoId) {
        GetTodoById(userId, todoId)
            .then((res)=>{
                console.log(res);
                setTitle(res.name);
                setDescription(res.description)
                setEditId(todoId);
                setOpenEditTodo(true);
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {

        GetAllTodos(userDetails.googleId)
            .then((todos) => {
                setAllTodos(todos)
            })
            .catch((err) => {
                console.log(err.message);
            })

    });
    return(
        <div className="homepage parent">
            <div className="div1">
            <br />  <br />
            <nav>
                <ul>
                    <li><Link to="/home"><Button variant="outlined"  startIcon={<HomeIcon style={{color:'#fff'}} />}><span style={{color: 'white'}}>Home</span></Button></Link></li>
                </ul>
            </nav>
            <br />
                <div style={{position: 'relative'}}>
                <h4 style={{marginLeft:'2em'}}>Welcome {userDetails.name}</h4>
                <div style={{position:'relative',left:'80%'}}> <Logout /></div>
                </div>

                <div className="addtodobtn">
                    <Button startIcon={<PlaylistAddIcon style={{color:'#fff'}} />}   
                    style={{
                        borderRadius: 35,
                        backgroundColor: "#21b6ae",
                        padding: "13px 20px",
                        fontSize: "14px"
                    }}
                    variant="contained"
                    onClick={handleOpenTodoModal}
                    >
                        Add Todo
                    </Button>
                </div>
                {allTodos && Object.values(allTodos).map(todo => {return(
                     <div className="glasscard">
                     <div className="todoheader">
                         <h6 style={{marginLeft:'2em',marginTop:'5px',color:'#fff'}}>{todo.name}  <span style={{position:'absolute',right:'2em',color:'green',fontSize:'13px'}}>Last Edited on {new Date(todo.updatedAt).toLocaleString()}</span></h6>
                        
                     </div>
                     <div className="todobody">
                        {todo.description}
                     </div>
                     <hr style={{color:'2px solid rgba( 255, 255, 255, 0.4 )'}}/>
                     <div className="todofooter">
                         <center>
                             <IconButton aria-label="edit" onClick={(e)=>handleEditTodo(userDetails.googleId,todo._id)}>
                                 <CreateIcon color="primary"/>
                             </IconButton>
                             <IconButton aria-label="delete" onClick={() => deleteTodo(userDetails.googleId,todo._id)}>
                                 <DeleteIcon style={{color:'red'}} />
                             </IconButton>
                         </center>
                     
                     </div>
                 </div>
                )}) }
              
               
                {/* Add Todo Dailog */}
                <Dialog fullWidth maxWidth="sm" open={opentodomodal} onClose={handleCloseTodoModal} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
                    <DialogTitle id="form-dialog-title">Add Todo</DialogTitle>
                    <form autoComplete="off" onSubmit={(e) => handleSubmit(e)} style={{margin:'1em'}}>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title"
                            type="text"
                            fullWidth
                            maxWidth="sm"
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                        <TextField
                            required
                            id="filled-full-width"
                            label="Description"
                            placeholder="Todo"
                            fullWidth
                            maxWidth="sm"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                
                    <DialogActions>
                        <Button onClick={handleCloseTodoModal} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            type='submit'
                        >
                            Save
                        </Button>
                
                    </DialogActions>
                    </form>
                </Dialog>

                 {/* Edit Todo Dailog */}
                <Dialog fullWidth maxWidth="sm" open={openedittodo} onClose={handleCloseTodoModal} aria-labelledby="form-dialog-title" disableBackdropClick disableEscapeKeyDown>
                    <DialogTitle id="form-dialog-title">Edit Todo</DialogTitle>
                    <form autoComplete="off" onSubmit={(e) => handleEditSubmit(e)} style={{margin:'1em'}}>
                        <TextField
                            required
                            autoFocus
                            margin="dense"
                            id="name"
                            label="Title"
                            type="text"
                            fullWidth
                            maxWidth="sm"
                            defaultValue={title}
                            onChange={(e)=>setTitle(e.target.value)}
                        />
                        <TextField
                            required
                            id="filled-full-width"
                            label="Description"
                            placeholder="Todo"
                            fullWidth
                            maxWidth="sm"
                            margin="normal"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            variant="filled"
                            defaultValue={description}
                            onChange={(e)=>setDescription(e.target.value)}
                        />
                
                    <DialogActions>
                        <Button onClick={handleCloseTodoModal} color="primary">
                            Cancel
                        </Button>
                        <Button
                            variant="contained"
                            color="secondary"
                            size="small"
                            className={classes.button}
                            startIcon={<SaveIcon />}
                            type='submit'
                        >
                            Update
                        </Button>
                
                    </DialogActions>
                    </form>
                </Dialog>


                <Snackbar open={opensuccess} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        {successmsg}
                    </Alert>
                </Snackbar>
                <Snackbar open={opendelete} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="error">
                        {deletemsg}
                    </Alert>
                </Snackbar>
                <Snackbar open={openinfo} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="info">
                        {infomsg}
                    </Alert>
                </Snackbar>
               
            </div>

         
        </div>
    )
}