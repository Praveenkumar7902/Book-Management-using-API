//import express js via require function
const express = require("express");
//import database file
const database = require("./database");
//initialize express
const booky = express();
 

/* 
    route  - root route
    description - get all the books
    access - public access
    parameter - no parameter
    methods - get method
 */
//to get all the books
booky.get("/",(req,res) => {
    return res.json({books: database.books });
})

/* 
    route  - /isbn route
    description - get a specific book by isbn
    access - public access
    parameter - isbn
    methods - get method
 */

    //here we need to search a specific book
    /* so we use the filter function  
    The filter filters the books by checking the value of ./database.book.ISBN === req.params.isbn 

     */
    booky.get("/books/:isbn",(req , res)=>{
        const specificbook = database.books.filter(
            (book) => book.ISBN === req.params.isbn
        );
        if(specificbook.length === 0){
            return res.json({error: `No book found for the requested ISBN of ${req.params.isbn}`})
        };
        return res.json({book: specificbook })
    });


/* 
    route  - /cat route
    description - get a specific book by category
    access - public access
    parameter - type
    methods - get method
 */

      /*here we need to search a  book by category
   so we use the filter function  
    The filter filters the books by checking the value of cstegory array
    so we need to use a function includes() and inside the parameter we use thereq.params.type 

     */
    booky.get("/books/:type",(req , res)=>{
        const categorybook = database.books.filter(
            (book) => book.category.includes(req.params.type) 
        );
        if(categorybook.length === 0){
            return res.json({error: `No book found for the requested category of ${req.params.type}`})
        };
        return res.json({book: categorybook })
    });

 //here we need to search a  book by languages

/* 
    route  - /lang route
    description - get a specific book by languages
    access - public access
    parameter - /lang/language
    methods - get method
 */
    booky.get("/books/:languages" , (req , res)=> {
        {
            const langbook = database.books.filter(
                (book) => book.language.includes(req.params.languages)    
                );
                if(langbook.length === 0){
                    return res.json({error: `No book found for the requested language of ${req.params.languages}`})
                };
                return res.json({book: langbook })
        
        
        }
    })
/* 
    route  - authors route
    description - get all the authors
    access - public access
    parameter - no parameter
    methods - get method
 */

//to get all the author
booky.get("/authors",(req,res) => {
    return res.json({Authors: database.authors });
});
//to get author based on id

booky.get("/authors/:isbn" , (req , res)=> {
    
    const autherid   = database.authors.filter(
        (author) => author.AID == req.params.isbn
    );
    if(autherid.length === 0){
        return res.json({error: `No book found for the requested author ID of ${req.params.isbn}`})
    };
    return res.json({author: autherid })

});
//to get authors based on book
booky.get("/authors/books/:bkid" , (req,res)=>{
    const specificbk = database.authors.filter(
        (authbk) => authbk.books.includes(req.params.bkid)
    );
    if (specificbk == 0){
        return res.json({error:`no authors baes on this ${req.params.bkid} book id`})
    } ;
    return res.json({bookofauthor:specificbk})
}
)
/* 
    route  - authors route
    description - get book bsed the authors
    access - public access
    parameter - no parameter
    methods - get method
 */
booky.get("/authors/books/:isbn" , (req , res) => {
    const getSpecificAuthor = database.authors.filter(
        (author) => author.books.includes(req.params.isbn)

    );
    if(getSpecificAuthor === 0){
        return res.json({error:`No author found for the book of ${req.params.isbn}`});
    }
    return res.json({author:getSpecificAuthor})
})

/* 
    route  - publication route
    description - get all the publication
    access - public access
    parameter - no parameter
    methods - get method
 */
//to get all the publication
booky.get("/publication",(req,res) => {
    return res.json({publications: database.publication });
})


booky.listen(3000,() =>{
    console.log("my server is running succesfully at port number 3000")
});
// TO LIST A SPECIFIC PUBLICATION

booky.get("/publication/:pbid",(req,res)=>{
    const publicid = database.publication.filter(
        (publicationid) => publicationid.PID == req.params.pbid
    );
    if(publicid == 0){
        return res.json({error:`the requested publication id ${req.params.pbid} is not found`})
    }
    return res.json({publications : publicid})

    });
//LIST A PUBLICATION BASED ON BOOKS

booky.get("/publication/book/:id",(req,res)=>{
    const publicbkid = database.publication.filter(
        (publicationbk) => publicationbk.books.includes(req.params.id)
    );
    if(publicbkid == 0){
        return res.json({error:`the requested publication based on b ${req.params.id} is not found`})
    }
    return res.json({publications : publicbkid})

    });

