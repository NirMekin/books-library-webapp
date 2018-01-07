import { observable } from 'mobx'
import {api} from '../api/API'


export const BooksStore = () => {
    api.getBooks()
    .then(res=> store.books = res)
    const store = observable({
        books : null,
        get data(){
            return store.books ? store.books : null;
        },
        deleteBook(title){
            //store.books.splice(index,1)
           let temp = store.books.filter(i => i.title !== title).map(i => {return { autuor : i.autuor , title : i.title , date : i.date}})
           console.log(temp)
           api.saveFile(JSON.stringify(temp))
           .then(result=>console.log(result))
        }
    })

    return store;
}
