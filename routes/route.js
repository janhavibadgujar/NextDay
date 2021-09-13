const express=require('express');
const router = express.Router();
const {format,addDays,isSunday,isSaturday} = require('date-fns');
const Posts = require('../models/post');


var Holidays = require('date-holidays');
var hd = new Holidays();
hd.init('US', 'la', 'no');
hd = new Holidays('US', 'la', 'no');

console.log(hd.isHoliday(new Date('2021-09-06 10:00:00 GMT-0600')));
//Get method......

router.get('/',(req,res)=>{
    Posts.find(function(err,post)
    {
        if(err)
        {
            res.json({"msg":"Failed to fetch data"});
        }
        else
        {
            res.json(post);
        } 
        
    })
    
});

//Post method.....

router.post('/',(req,res)=>
{
    const ISO = req.body.date;
    var returnDay, n, p,q,r;
    var date= new Date(ISO);
    var options = { weekday: 'long'};
    var day = new Intl.DateTimeFormat('en-US', options).format(date);

    while((hd.isHoliday())== false)
    {
        if(isSunday(date))
        {  
            n = addDays(date,1);
            returnDay= format(n,'EEEE'); 
        }

        else if(isSaturday(date))
        {
            p= addDays(date,2);
            returnDay = format(p,'EEEE');
        }

        else if(day == 'Friday')
        {
    
           q = addDays(date,3);
            returnDay = format(q,'EEEE');
        }
        else
        {
            r= addDays(date,1)
            returnDay= format(r,'EEEE');
        } 
    }

    
    let newPosts=new Posts(
        {
            Input:req.body.date,
            outputDay:returnDay,
        }
    );
    
    newPosts.save((err,Posts)=>{
        if(err)
        {
            res.json({"msg":"Failed to save"});
        }
        else{
            
            res.json({"Next-Day":returnDay});
        }
    });
    
});


    
module.exports=router;
