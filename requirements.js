//requirements for project
//1. node js
// 2 express js
//project -book management company

//BOOKS
// BOOKID , TITLE , NO.OF.PAGES , PUBLISHED DATE , AUTHORS[] , LANGUAGE , CATEGORY[] 

//AUTHORS
//A.ID , NAME , BOOKS[]

//PUBLICATIONS
//A.ID , NAME , BOOKS[]

//API FOR BOOKS
/*
1.TO LIST ALL TYPE OF BOOKS - done
2. BOOKS BASED ON CATEGORY - done
3. LIST A SPECIFIC BOOK - done
4. BOOKS BASED ON LANG - done
 */

//API FOR AUTHORS
/*
1. TO LIST ALL AUTHOR-DONE
2. TO LIST A SPECIFIC AUTHOR - DONE 
3.TO LIST A NO OF AUTHORS BASED ON BOOKS
*/

//PUBLICATIONS
/*
1. TO LIST ALL  PUBLICATION - DONE
2. TO LIST A SPECIFIC PUBLICATIONS - DONE
3.LIST OF PUBLICATION BASED ON BOOK - DONE
*/

/*POST REQUEST
1.TO ADD NEW BOOK - DONE
2.TO ADD NEW AUTHOR - DONE
3.TO ADD NEW PUBLICATION - DONE
 */

/* PUT REQUEST
1. update the book if author is changed - DONE

 */

//*******DELETE*******
// 1.delete a book
//2.delete author from a book /
//3.delete author from book and related book from author

//Schema - structure of the database like blueprint or how data to be constructed 
//MongoDb - it is schema less
//mongoose - it has scheme
//mongoose helps in validation , checking relationship with other data.
//Model means our database -> document model of mongodb
//schema -> model -> use it.