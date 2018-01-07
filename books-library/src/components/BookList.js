import React from 'react'
import { Table , Form} from 'reactstrap';
import { Book } from "./Book";
import { observer } from 'mobx-react'

export const BookList = observer(({store}) => {
   
    let data = store.data ;
    return data ? <div style={{width:1000 , margin : "auto"}}>
        
                    <Table striped>
                        <thead style={{fontSize:30}}>
                        <tr style={{backgroundColor:"#5bc0de" , color : "white"}}>
                            <th>#</th>
                            <th>Autuor</th>
                            <th>Title</th>
                            <th>Date</th>
                            <th>Options</th>
                        </tr>
                        </thead>
                        <tbody style={{fontSize:15 , lineHeight: 3}}>
                            {data.map((item , i )=> <Book   key={i} 
                                                            autuor={item.autuor} 
                                                            date={item.date} 
                                                            title={item.title} 
                                                            order={++i} 
                                                            onDelete={store.deleteBook}
                                                            updateOrAdd={store.updateOrAdd}/>)}
                        </tbody>
                    </Table>
            </div> : null
})