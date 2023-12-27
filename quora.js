const express=  require("express");
const   app = express();
const port=8080;
const path  = require("path");
app.set("view engine", "ejs ");
app.set ("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public",)));
app.use(express.urlencoded({extended: true}));

//to use the mr=ethid override coz no patch in html
const methodoveride=require("method-override");
app.use(methodoveride('_method'))
const { v4: uuidv4 } = require('uuid');
uuidv4(); 

app.listen(port,()=>{
    console.log("listening on port " + port);
});

//this is for making a post homepage
app.get("/posts",(req,res)=>{
    res.render("index.ejs", {posts});
   // res.redirect("/posts/new");
});

let posts = [
    {id: uuidv4(),
        username: "admin",
        content : "this si the admin butxhes",
    },
    {id : uuidv4(),
        username: "BHAU",
        content :"SYSTUMMM",
    }
];
//this is for making the new post Get and render the new html ejs
app.get("/posts/new",(req,res)=> {
    res.render("new.ejs");
})
/// when the submit button is clicked the data is stores in let and then the 
// then the dat is pushehed to the ols list and that will redirect 
// to post page i.e the homepage
//
app.post("/posts",(req,res)=> {

   let {username, content} = req.body;
   let id =uuidv4();
   posts.push({id , username,content});
    res.redirect("/posts");// this will push content to post amnd as soon as you clock submit it will get to postsa
});

//make the detailes version of all post using id genreaotr nad whenedver we lcok the link it will open ot hat id
//use uuid for unique id

app.patch("/posts/:id",(req,res)=>{
    let {  id }   = req.params;
    let newcontent = req.body.content;
    let post = posts.find((p) =>  id === p.id);
    post.content = newcontent;   
   res.redirect("/posts"); 
    
});


app.delete("/posts/:id",(req,res)=>{
let {id} = req.params;
 posts = posts.filter((p) => id !== p.id);
res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
   let {  id }   = req.params;
   let post = posts.find((p) =>  id === p.id);
    res.render("edit.ejs", { post});
res.send("hello")
});