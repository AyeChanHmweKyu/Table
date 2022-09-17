import { useState,useEffect } from "react";
import styles from '../styles/Home.module.css'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { makeStyles } from "@mui/styles";
import axios from "axios";
import {baseUrl} from "./api/api"
import { Button, IconButton, Typography } from "@mui/material";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useRouter } from "next/router";
import SearchBar from "material-ui-search-bar";

const useStyles = makeStyles({
  table: {
    minWidth: 500,
    padding: 2,
  },
  btn: {
    marginRight: 10,
  },
  modal:{
    opacity: "50%"
  },
  modalBtn: {
    marginTop: 2,
    backgroundColor: "#337ab7",
    color: "#fff",
    "&:hover": {
      backgroundColor: "#337ab7",
      color: "#fff",
    },
  },
  textfield: {
    margin: 3,
    width: "100%"
  },
  modalButton: {
    margin: 3,
    width: "100%",
    display: "flex",
    justifyContent: "space-between"
  }
});

export default function table () {
    const [title, setTitle] = useState("");
    const [categories, setCategories] = useState("");
    const [data, setData] = useState();
    const [open, setOpen] = useState(false);
    const [delOpen,setDelOpen] = useState(false);
    const [rowData, setRowData] = useState()
    const delHandleOpen = () => setDelOpen(true);
    const delHandleClose = () => setDelOpen(false);
    const handleClose = () => setOpen(false);
    const classes = useStyles();
    const router = useRouter();
    const [searched, setSearched] = useState("");

    // var sampleData = [
    //   {  id:1,'title':'asdfasdf','description':'asdfdsaf'}
    // ];
    // const headers = props.router.query.headers;
    

    const style = {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: 400,
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 20,
      p: 4,
    };
    
    useEffect(() => {
      try{
        axios.get(`${baseUrl}` 
        )
        .then((res) => {
          setData (res.data.categories)
          setRowData(res.data.categories)
          // console.log(data)

        },err=> {
          router.push({
          pathname: '/login',
        });
      })
      }catch(e){
        console.log(e.message);
    }
    }, []);

    const requestSearch = (searchedVal) => {
        const filteredRows = data.filter((row) => {
          return row.toLowerCase().includes(searchedVal.toLowerCase());
        });
        setRowData(filteredRows);
      };
    
      const cancelSearch = () => {
        setSearched("");
        requestSearch(searched);
      };

    return (
        <div style={{display: "flex"}}>
            
            <TableContainer component={Paper}>
            <SearchBar
            value={searched}
            onChange={(searchVal) => requestSearch(searchVal)}
            onCancelSearch={() => cancelSearch()}
            />
              <Table  className={classes.table} aria-label="custom pagination table">
                <TableHead id="tbhead">
                  <TableRow>
                    <TableCell id="th">ID</TableCell>
                    <TableCell id="th">Categories</TableCell>
                    <TableCell id="th">Edit</TableCell>
                    <TableCell id="th">Delete</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                {rowData?.map((row,index) => (
                  <TableRow hover key={index}>
                    <TableCell>{index}</TableCell>
                    <TableCell>{row}</TableCell>
                    <TableCell>
                      <IconButton
                        variant="outlined"
                        size="small"
                        className={classes.btn}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                    </TableCell>
                    <TableCell>
                      <IconButton
                        variant="outlined"
                        size="small"
                        className={classes.btn}
                        color="primary"
                      >
                        <DeleteIcon />
                      </IconButton>
                      
                    </TableCell>
                  </TableRow>
                ))}
                </TableBody>
              </Table>
            </TableContainer>
        </div>
    )
}
