import { observable } from 'mobx'
import {api} from '../api/API'

/*
    BookStore is a component using mobx store architecte
    it had 2 main functions delete books and update / add books
    it listen to change on var 'book' by computed function (get) 'data'
*/
export const BooksStore = () => {
    api.getBooks()
    .then(res=> store.books = res)
    const store = observable({
        books : null,
        get data(){
            return store.books ? store.books : null;
        },
        deleteBook(title){
           let temp = store.books.filter(i => i.title !== title).map(i => {return { autuor : i.autuor , title : i.title , date : i.date}})
           api.saveFile(temp)
           .then(result=>{
            store.books = null;
            setTimeout(()=>{store.books = result},0)
           })
        },
        updateOrAdd(data,oldTitle){
            let temp = store.books.map(i => {
                return (i.title === oldTitle) ? 
                {autuor : data.autuor , title : data.title , date : data.date} : {autuor : i.autuor , title : i.title , date : i.date}
            })
            if(!oldTitle) temp.push(data)
           api.saveFile(temp)
           .then(result=>{
            store.books = null;
            setTimeout(()=>{store.books = result},0)
        })
        }
    })

    return store;
}
