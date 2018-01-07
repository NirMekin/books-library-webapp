import React from 'react'
import { observer } from 'mobx-react'
import { Button, Popover, PopoverHeader, PopoverBody , Label , Input , Form} from 'reactstrap'

const addButton = 'https://www.shareicon.net/data/2016/08/18/809318_add_512x512.png'

export const AddBook = observer(({store}) => {
    let data = store.data;
    return <div>
        <AddBookButton titles={data && data.map(i => { return { title : i.title} })}
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
        if(this.props.titles.includes(e.target.title.value) || e.target.title.value.length === 0){
            errorMsg.push("Title is not valid");
        }
        if(!e.target.autuor.value){
            errorMsg.push("Autuor can't be empty string");
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
                    autour : e.target.autuor.value,
                    title : e.target.title.value,
                    date : e.target.date.value
                }
            )
            this.toggle()
        }

        e.preventDefault();
      }

    render(){
        const {errorMode} = this.state
        const {title} = this.props
        return(
            <div>
                <Button style={{width:50 , 
                                height: 50 , 
                                borderRadius:"50%" , 
                                background:"url(https://www.shareicon.net/data/2016/08/18/809318_add_512x512.png)" , 
                                backgroundSize:"49px 49px" , 
                                position: "fixed" ,
                                top:50 ,
                                right:100}}
                                className="mr-1" 
                        color="secondary" 
                        id={'Popover-' + this.props.id} 
                        onClick={this.toggle}/>
                <Popover placement={"left-start"} isOpen={this.state.popoverOpen} target={'Popover-' + this.props.id} toggle={this.toggle}>
                    <PopoverHeader>Add New Book</PopoverHeader>
                    <PopoverBody>
                    <Form onSubmit={this.onSubmitSave}>
                        <Label>Autuor <Input type="text" placeholder="Enter Autuor"  name="autuor"/> </Label><br/>
                        <Label>Title <Input type="text" placeholder="Enter Title"  name="title"/> </Label><br/>
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