require("dotenv").config();
//import express js via require function
const express = require("express");
//import mongoose
const mongoose = require("mongoose");
//body parser is used to perform post request
const bodyParser = require("body-parser");
//import database file
const database = require("./Database/database");
//models
const BookModel = require("./Database/books");
const AuthorModel = require("./Database/authors");
const PublicationModel = require("./Database/publications");

//initialize express
const booky = express();
//we need to initialize bodyparser as well as express but with different syntax
booky.use(bodyParser.urlencoded({ urlencoded: true }));
booky.use(bodyParser.json());
//connect mongodb via mongoose
mongoose
  .connect(process.env.MONGODB_URL)
  .then(() => console.log("database connected to Mongodb"));

/* 
    route  - root route
    description - get all the books
    access - public access
    parameter - no parameter
    methods - get method
 */
//to get all the books
//to change the format to mongoose (mongodb and mongoose are asynchronous so write format in async and wait)
booky.get("/", async (req, res) => {
  const getAllBooks = await BookModel.find();
  return res.json(getAllBooks);
});

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
booky.get("/is/:isbn", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({ ISBN: req.params.isbn });
  //null value is returned
  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the requested ISBN of ${req.params.isbn}`,
    });
  }
  return res.json({ book: getSpecificBook });
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
booky.get("/cat/:category", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne({
    category: req.params.category,
  });
  //null value is returned
  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the requested category of ${req.params.category}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

//here we need to search a  book by languages

/* 
    route  - /lang route
    description - get a specific book by languages
    access - public access
    parameter - /lang/language
    methods - get method
 */
booky.get("/lan/:languages", async (req, res) => {
  const getSpecificBooks = await BookModel.findOne(
    {
    language: req.params.languages,
  }
  );
  //null value is returned
  if (!getSpecificBook) {
    return res.json({
      error: `No book found for the requested language of ${req.params.languages}`,
    });
  }
  return res.json({ book: getSpecificBook });
});

//to add a new book
booky.post("/books/new", async (req, res) => {
  const { newbook } = req.body;
  const addNewBook = BookModel.create(newbook);
  return res.json({
    books: addNewBook,
    message: "new book was added succesfully",
    //here we need to give the datawith this route in postman and retreived this database in mongodb
  });
});
/*
    route  - authors route
    description - get all the authors
    access - public access
    parameter - no parameter
    methods - get method
 */

//to get all the author
booky.get("/authors", async (req, res) => {
  const getAllAuthors = await AuthorModel.find();
  return res.json(getAllAuthors);
});
//to get author based on id

booky.get("/authorid/:isbn", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.findOne({ AID: req.params.isbn });

  if (!getSpecificAuthor) {
    return res.json({
      error: `No book found for the requested author ID of ${req.params.isbn}`,
    });
  }
  return res.json({ authors: getSpecificAuthor });
});
//to get authors based on book
booky.get("/authors/books/:isbn", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.find({ books: req.params.isbn });
  if (!getSpecificAuthor) {
    return res.json({
      error: `no authors based on this ${req.params.isbn} book id`,
    });
  }
  return res.json({ authors: getSpecificAuthor });
});
/* 
    route  - authors route
    description - get book bsed the authors
    access - public access
    parameter - no parameter
    methods - get method
 */
booky.get("/authors/books/:isbn", async (req, res) => {
  const getSpecificAuthor = await AuthorModel.find({ books: req.params.isbn });
  if (!getSpecificAuthor) {
    return res.json({
      error: `No author found for the book of ${req.params.isbn}`,
    });
  }
  return res.json({ author: getSpecificAuthor });
});
//to add a new author
booky.post("/author/new", (req, res) => {
  const { newauthor } = req.body;
  const addNewAuthor = AuthorModel.create(newauthor);
  return res.json({
    author: addNewAuthor,
    message: "Author Was Added!!!",
  });
});
/* 
    route  - publication route
    description - get all the publication
    access - public access
    parameter - no parameter
    methods - get method
 */
//to get all the publication
booky.get("/publication", async (req, res) => {
  const getAllPublication = await PublicationModel.find();
  return res.json(getAllPublication);
});

// TO LIST A SPECIFIC PUBLICATION

booky.get("/publication/:pbid",async (req, res) => {
  const getOnePublication = await PublicationModel.findOne({
    PID: req.params.pbid
  })
  if (!getOnePublication) {
    return res.json({
      error: `the requested publication id ${req.params.pbid} is not found`,
    });
  }
  return res.json({ publications: getOnePublication });
});
//LIST A PUBLICATION BASED ON BOOKS

booky.get("/publication/book/:id",async (req, res) => {
  const getOnePublication = await PublicationModel.findOne(
    {
       books: req.params.id 
    }
  )
  if (!getOnePublication) {
    return res.json({
      error: `the requested publication based on b ${req.params.id} is not found`,
    });
  }
  return res.json({ publications: getOnePublication });
});
//to add a new publication
booky.post("/publication/new", (req, res) => {
  const newpublication = req.body;
  database.publication.push(newpublication);
  return res.json({ updatedpublication: newpublication });
});

/************PUT***********/
/*
route  - publication/update/books/
description - to update book on isbn
access - public access
parameter - isbn
methods - put method
*/
booky.put("book/update/:isbn", async (req, res) => {
  const updatedBook = await BookModel.findOneandUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      title: req.params.bookTitle,
    },
    //to show the updated data into frontend database we need to give new is true
    {
      new: true,
    }
  );
  return req.json({ books: updatedBook });
});
/************** Updating New Author************/
/* 
    route  - book/author/update
    description - to update/add  the new  author
    access - public access
    parameter - isbn
    methods - put method
 */

booky.put("/book/author/update/:isbn", async (req, res) => {
  //update book database

  const updatedBook = await BookModel.findOneandUpdate(
    {
      ISBN: req.params.isbn,
    },
    {
      $addToSet: {
        authors: req.body.newAuthor,
      },
    },
    {
      new: true,
    }
  );

  //update author database
  const updatedauthor = await AuthorModel.findOneandUpdate(
    {
      AID: req.body.newAuthor,
    },
    {
      $addToSet: {
        books: req.params.isbn,
      },
    },
    {
      new: true,
    }
  );

return res.json({
  books: updatedBook,
  authors: updatedauthor,
  message: "Sucessfully Added Author",
});
 });
//to update publication books
/* 
    route  - publication/update/books/
    description - to update/add  the new  publication
    access - public access
    parameter - isbn
    methods - put method
 */

    
booky.put("/publication/update/books/:isbn", (req, res) => {
  //update the publication database
  database.publication.forEach((pub) => {
    if (pub.id === req.body.pubId) {
      return pub.books.push(req.params.isbn);
    }
  });

  //update the book database
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      book.publication = req.body.pubId;
      return;
    }
 
    return res.json({
      books: database.books,
      publication: database.publication,
      message: "Successfully sent",
    });
  });
});

//DELETE
//delete a book
booky.delete("/book/delete/:isbn", async (req, res) => {
  const updatedBookDatabase = await BookModelModel.findOneandDelete({
    ISBN: req.params.isbn,
  });

  return res.json({
    books: updatedBookDatabase,
    message: "Books Deleted!!!",
  });
});
//delete author from book
booky.delete("/authors/delete/:isbn", async(req, res) => {
  const updatedauthor = await AuthorModel.findOneandDelete(
    {books: req.params.isbn}
  )
  
  return res.json({ authors: updatedauthor});
});

booky.delete("/book/delete/author/:isbn/:authorID", (req, res) => {
  database.books.forEach((book) => {
    if (book.ISBN === req.params.isbn) {
      const newauthorlist = book.author.filter(
        (eachauthor) => eachauthor !== parseInt(req.params.authorID)
      );
      book.author = newauthorlist;
      return;
    }
  });
  //update the author database
  database.authors.forEach((eachauthor) => {
    if (eachauthor.id === parseInt(req.params.authorID)) {
      const newbooklist = eachauthor.books.filter(
        (book) => book !== req.params.isbn
      );
      eachauthor.books = newbooklist;
      return;
    }
  });
  return res.json({
    book: database.books,
    author: database.authors,
    message: "successfully removed author",
  });
});

booky.listen(5000, () => {
  console.log("my server is running succesfully at port number 5000");
});
