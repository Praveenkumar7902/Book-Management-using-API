const books = [
    {
        ISBN:"12345",
        title: "rich dad and poor dad",
        pubdate: "01/01/2012",
        pages:792 ,
        language:"english",
        author: [1 ,2],
        publication:[1],
        category:["life","world","mindset","education"],
    },

    {
        ISBN:"8520",
        title: "life cycle of human",
        pubdate: "02/08/2023",
        pages:552 ,
        language:"hindi",
        author: [3],
        publication:[1],
        category:["article","education"],
    }
];

const authors = [
    {
        AID :1,
        name:"Dennis ritchie",
        books:["12345", "67890"]
    },
    {
        AID :2,
        name:"mark zuckerbug",
        books:["7902","7781","12345"]
    },
    {
        AID :3,
        name:"henny filander ",
        books:["8520" , "67890" ]
    }
];

const publication =[
    {
        PID:1,
        name:"technical publication",
        books:["12345","7781"]
    },
    {
        PID:2,
        name:"arrow_wind publication",
        books:["8250","7781"]  
    }
]; 
module.exports ={books,authors,publication};