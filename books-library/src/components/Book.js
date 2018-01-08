import React from 'react'
import {  Button , Input, Modal, ModalHeader, ModalBody, ModalFooter , Form, Label } from 'reactstrap'

const nowDate = new Date();
let currentDate = {
    year : nowDate.getFullYear().toString(),
    month : nowDate.getMonth() < 10 ? '0' + (nowDate.getMonth()+1) : (nowDate.getMonth()+1).toString(),
    day : nowDate.getDate() < 10 ? '0' + nowDate.getDate() : nowDate.getDate().toString()
}
currentDate = currentDate.year+currentDate.month+currentDate.day;

/*
    BookFrom it a child of Book, it contains filed for updating exist book and make sure the 
    input by the user are valid (date are past or present , title non empty string...)
*/
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
            newData.title = e.target.title.placeholder
        else{
            let temp = e.target.title.value.toString().match(/[a-zA-Z]+/g);
            if(temp)
            newData.title = temp.map(i => {
                 let temp = i.toLowerCase()
                 return temp.charAt(0).toUpperCase() + temp.slice(1)
             }).join(" ");
             else{
                 errorMsg.push("Error, title must have non empty string include at least one letter")
             }
        }

        if(!e.target.date.value )
            newData.date = this.props.date
        else{
            let getDate = e.target.date.value.replace(/-/g,"");
            if(getDate > currentDate)
                errorMsg.push('Error, Please enter valid date')
            else newData.date = e.target.date.value    
        } 

        if(errorMsg.length > 0){
            this.setState({errorMode : errorMsg})
        }
        else{
           newData.autuor = e.target.autuor.value.length > 0 ? e.target.autuor.value : e.target.autuor.placeholder
           this.props.callForUpdate(newData,oldData);
        }

        
        e.preventDefault();
    }

    render(){
        const {errorMode} = this.state
        const { autuor , title } = this.props
        return(
            <Modal isOpen={true} toggle={this.toggle} className={this.props.className}>
                <ModalHeader toggle={this.toggle}>Edit Book - {title}</ModalHeader>
                <ModalBody>
                <Form onSubmit={this.onSubmitSave}>
                    <Label>Autuor <Input type="text" placeholder={autuor} onChange={this.onChangeHandle} name="autuor"/> </Label><br/>
                    <Label>Title <Input type="text" placeholder={title} onChange={this.onAutuorChage} name="title"/> </Label><br/>
                    <Label>Date <Input type="date" name="date"/> </Label><br/>
                    <br/>
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

/*
    Book component handling a row in the table
    you can call the BookForm for updating a book or delete one from the list
*/
export class Book extends React.Component{

    constructor(props){
        super(props)
        this.state={
            editMode : false,
            modal: false
        }
        this.data = {
            autuor : this.props.autuor , 
            date : this.props.date, 
            title  : this.props.title, 
            order : this.props.order
        } 
        this.toggle = this.toggle.bind(this);
        
    }


    onClickEditHandle = () =>{
        this.setState({ editMode : true })
    }

    onCancelHandle = () =>{
        this.setState({ editMode : false })
    }

    onClickSaveHandle = (e) => {
        this.setState({ editMode : false })
    }


    onDelete = (e) => {
        this.props.onDelete(this.props.title);
    }
    
    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      }

    render(){
        const { editMode } = this.state
        const {autuor , date , title , order} = this.data
        let tempDate = date.split("-");
        tempDate = tempDate[2]+"/"+tempDate[1]+"/"+tempDate[0];
        return(
            <tr>
                
                <th scope="row">{order}</th>
                <th>{autuor}</th>
                <th>{title}</th>
                <th>{tempDate}</th>
                <th>
                    <Button color="secondery" onClick={this.onClickEditHandle}><i className="fa fa-pencil-square-o" aria-hidden="true"/></Button>
                    <Button color="danger" onClick={this.toggle}><i className="fa fa-times" aria-hidden="true"/></Button>
                    <Modal isOpen={this.state.modal} modalTransition={{ timeout: 20 }} backdropTransition={{ timeout: 10 }}
                    toggle={this.toggle}>
                    <ModalBody style={{textAlign:"center"}}>
                        <h3 >Are You sure you<br/> want to delete:</h3><br/>
                        <div><b>"{title}"</b> from {tempDate} <sub>by {autuor}</sub></div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger"  onClick={this.onDelete}>Delete</Button>{' '}
                        <Button color="info" onClick={this.toggle}>Cancel</Button>
                    </ModalFooter>
                    </Modal>
                   
                    {editMode && <BookForm onCancel={this.onCancelHandle}
                                           autuor={autuor}
                                           date={date}
                                           title={title}
                                           callForUpdate={this.props.updateOrAdd}/>}
                   
                </th>
               
            </tr>
        )
    }
    
}