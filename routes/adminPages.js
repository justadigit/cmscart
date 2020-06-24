const express = require('express');
const router = express.Router();

// Admin Index Pages
router.get('/',(req,res)=>{
    res.render('admin/index',{
        title:"Admin"
    })
})

//Admin add page
router.get('/addpage',(req,res)=>{
    let title = "";
    let slug = "";
    let content = "";
    res.render('admin/addpage',{
        title:"Add Pages"
    })
})

module.exports = router;