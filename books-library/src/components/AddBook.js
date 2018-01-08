import React from 'react'
import { observer } from 'mobx-react'
import { Button, Popover, PopoverHeader, PopoverBody , Label , Input , Form , UncontrolledTooltip } from 'reactstrap'

export const AddBook = observer(({store}) => {
    let data = store.data;
    return <div>
        <AddBookButton titles={data && data.map(i => { return  i.title })}
                        saveNewBook={store.updateOrAdd}/>
    </div>
})

class AddBookButton extends React.Component{

    constructor(props) {
        super(props);
    
        this.toggle = this.toggle.bind(this);
        this.onSubmitSave = this.onSubmitSave.bind(this);


        this.state = {
          popoverOpen: false,
          errorMode : null
        };


      }
    
      toggle() {
        this.setState({
          popoverOpen: !this.state.popoverOpen
        });
      }

      onSubmitSave = (e) => {
        let errorMsg = []  
        let tempTitle
        if(this.props.titles.includes(e.target.title.value) || e.target.title.value.length === 0){
            
            errorMsg.push("Title is not valid");
        }
        else{
            tempTitle = e.target.title.value.toString().match(/[a-zA-Z]+/g)
            if(tempTitle)
            tempTitle = tempTitle.map(i => {
                    let temp = i.toLowerCase()
                    return temp.charAt(0).toUpperCase() + temp.slice(1)
                }).join(" ")
            else{
                errorMsg.push("Error, title must have non empty string include at least one letter")
            }    
                
            
        }
        if(!e.target.autuor.value || e.target.title.value.replace(/[^a-zA-Z]+/g,"").length === 0){
            errorMsg.push("Autuor can't be empty string , or non letters string");
        }
        
        if(!e.target.date.value){
            errorMsg.push("Date is not valid");
        }

        if(errorMsg.length > 0){
            this.setState({errorMode : errorMsg})
        }
        else{
            this.props.saveNewBook(
                {
                    autuor : e.target.autuor.value,
                    title : tempTitle,
                    date : e.target.date.value
                }
            )
            this.toggle()
        }

        e.preventDefault();
      }

    render(){
        const {errorMode} = this.state
        return(
            <div>
                <Button style={{width:50 , 
                                height: 50 , 
                                borderRadius:"50%" , 
                                background:"url(https://images-na.ssl-images-amazon.com/images/I/31YPM2KpBNL.png)" , 
                                backgroundSize:"49px 49px" , 
                                position: "fixed" ,
                                top:40 ,
                                right:250}}
                                
                        id={'Popover'} 
                        onClick={this.toggle}/>
                <Popover placement={"left-start"} isOpen={this.state.popoverOpen} target={'Popover'} toggle={this.toggle}>
                    <PopoverHeader>Add New Book</PopoverHeader>
                    <PopoverBody>
                    <Form onSubmit={this.onSubmitSave}>
                        <Label>Autuor <Input type="text" placeholder="Enter Autuor"  name="autuor" id="autuorLabel"/> </Label><br/>
                        <UncontrolledTooltip placement="right" target="autuorLabel">
                            Please enter fullname
                        </UncontrolledTooltip>
                        <Label>Title <Input type="text" placeholder="Enter Title"  name="title" id="titleLabel"/> </Label><br/>
                        <UncontrolledTooltip placement="bottom" target="titleLabel">
                            numbers and special characters <span style={{fontSize:"70%" , color:"lightgrey"}}>( % $ ! @ * )</span> are not valid
                        </UncontrolledTooltip>
                        <Label>Date <Input type="date" name="date"/> </Label><br/>
                        <br/>
                        <Button type="submit" color="info">Save</Button>{' '}
                        <Button color="secondary" onClick={()=> this.toggle()}>Cancel</Button>
                    </Form>
                    {errorMode &&
                    <div style={{color:"red"}}>
                        <hr/>
                        {errorMode.map(( title , i ) => <p key={i}>{title}</p>)}
                    </div>}
                    </PopoverBody>
                </Popover>     
             
            </div>
        )
    }
}