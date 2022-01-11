const  express=require('express');
const app=express();
const path=require('path');


app.use(express.static(path.join(__dirname , "../public")));
// ...................rendering hbs to server.................
app.set('view engine', 'hbs');

app.get("/" , (req , res)=>{
    res.render('index.hbs')
})
app.get("/about" , (req , res)=>{
    res.render('about')
})
app.get("/weather" , (req , res)=>{
   
   res.render("weather.hbs");
})

app.get("/contact" , (req , res)=>{
    res.render("contact");
})
app.get("*" , (req , res)=>{
    res.render("404error");
})

app.listen(8062, ()=>{
    console.log("listening.....");
})