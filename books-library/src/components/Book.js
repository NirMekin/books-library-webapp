import React from 'react'
import {  Button , Input, Modal, ModalHeader, ModalBody, ModalFooter , Form, Label } from 'reactstrap'

const nowDate = new Date();
let currentDate = {
    year : nowDate.getFullYear().toString(),
    month : nowDate.getMonth() < 10 ? '0' + nowDate.getMonth() : nowDate.getMonth().toString(),
    day : nowDate.getDay() < 10 ? '0' + nowDate.getDay() : nowDate.getDay().toString()
}

currentDate = currentDate.year+currentDate.month+currentDate.day;

class BookForm extends React.Component{

    constructor(props){
        super(props)
        this.state = {
            errorMode : []
        }
        this.onSubmitSave = this.onSubmitSave.bind(this);
    }

    onSubmitSave = (e) => {
        let oldData = e.target.title.placeholder
        let newData = {}
        let errorMsg = []
        if(e.target.title.value.length === 0)
            newData.title = e.target.title.value
        
           
        if(!e.target.date.value )
            errorMsg.push('Error, Please enter valid date')
        else{
            let getDate = e.target.date.value.replace(/-/g,"");
            if(getDate > currentDate)
                errorMsg.push('Error, Please enter valid date')
        }    
        errorMsg.push('Error, Please enter valid date 222')
        if(errorMsg){
            console.log(errorMsg)
            this.setState({errorMode : errorMsg})
        }

        
        e.preventDefault();
    }

    render(){
        const {errorMode} = this.state
        const { autuor , title , date } = this.props
        return(
            <Modal isOpen={true} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Edit Book - {title}</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.onSubmitSave}>
                    <Label>Autuor <Input type="text" placeholder={autuor} onChange={this.onChangeHandle} name="aut"/> </Label><br/>
                    <Label>Title <Input type="text" placeholder={title} onChange={this.onAutuorChage} name="title"/> </Label><br/>
                    <Label>Date <Input type="date" name="date"/> </Label><br/>
                    <hr/>
                    <Button type="submit" color="info">Save</Button>{' '}
                    <Button color="secondary" onClick={()=> this.props.onCancel()}>Cancel</Button>
                </Form>
                </ModalBody>
                {errorMode && <ModalFooter>
                                    <div style={{color:"red"}}>
                                        {errorMode.map((msg,i) => <p key={i}>{msg}</p>)}
                                    </div>
                </ModalFooter>}
            </Modal> 
        )
    }
}


export class Book extends React.Component{

    constructor(props){
        super(props)
        this.state={
            editMode : false
        }
        this.data = {
            autuor : this.props.autuor , 
            date : this.props.date, 
            title  : this.props.title, 
            order : this.props.order
        } 
        
    }


    onClickEditHandle = () =>{
        this.setState({ editMode : true })
    }

    onCancelHandle = () =>{
        this.setState({ editMode : false })
    }

    onClickSaveHandle = (e) => {
        console.log(e.target)
        this.setState({ editMode : false })
    }


    onDelete = (e) => {
        this.props.onDelete(this.props.title);
    }
    

    render(){
        const { editMode } = this.state
        const {autuor , date , title , order} = this.data
        return(
            <tr>
                
                <th scope="row">{order}</th>
                <th>{autuor}</th>
                <th>{title}</th>
                <th>{date}</th>
                <th>
                    <Button color="secondery" onClick={this.onClickEditHandle}><i className="fa fa-pencil-square-o" aria-hidden="true"/></Button>
                    <Button color="danger" onClick={this.onDelete}><i className="fa fa-times" aria-hidden="true"/></Button>
                    {editMode && <BookForm onCancel={this.onCancelHandle}
                                           autuor={autuor}
                                           date={date}
                                           title={title}/>}
                   
                </th>
               
            </tr>
        )
    }
    
}