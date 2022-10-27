const Joi=require('@hapi/joi');
const express=require('express');
const app=express();
app.use(express.json())
const courses=[
    {id:1,name:'pia'},
    {id:2,name:'vini'}
]
app.get('/',(req,res)=>{
    res.send("Hello world!!!")
})
app.get('/courses',(req,res)=>{
    
    res.send(courses);
})
app.get('/courses/:id',(req,res)=>{
    let course=courses.find((c)=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The following id is not in the courses");
    res.send(course);
})
// app.get('/courses/:year/:month',(req,res)=>{
//     res.send(req.params);
// })
// app.get('/courses/:year/:month/:date',(req,res)=>{
//     res.send(req.query);
// })
app.post('/courses',(req,res)=>{
    let{error}=validateCourse(req.body)

    if(error)
       return  res.status(400).send(error.details[0].message);
        
    
   
    let course={
        id:courses.length+1,
        name:req.body.name
    };
    courses.push(course);
    res.send(course);
})
app.put('/courses/:id',(req,res)=>{
    let course=courses.find((c)=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The following id is not in the courses");

    

    let{error}=validateCourse(req.body)

    if(error)
        return res.status(400).send(error.details[0].message);
        
    
    course.name=req.body.name;
    res.send(course)

});

function validateCourse(course){
    let schema={
        name:Joi.string().min(3).required()
    };
    return Joi.validate(course,schema);
}

app.delete('/courses/:id',(req,res)=>{
    let course=courses.find((c)=> c.id === parseInt(req.params.id));
    if(!course) return res.status(404).send("The following id is not in the courses");
    
    const index=courses.indexOf(course);
    courses.splice(index,1);

    res.send(course);
})

const port=process.env.PORT || 3000;
app.listen(port,()=>console.log(`Server listening on port:${port}...`))
