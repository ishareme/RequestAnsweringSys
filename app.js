/**
 * Created by asus on 2017/7/25.
 */

var express=require('express')
var bodyParser=require('body-parser')
var cookieParser = require('cookie-parser');
var fs=require('fs')
var multer=require('multer')

var app=express()

app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())

app.use(cookieParser())

app.use(express.static('www'))

// 允许跨域访问／／／
app.all('/api/*', function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'x-Request-with')
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
    res.header('X-Powered-By', '4.15.2')
    res.header('Content-Type', 'application/json;charset=utf-8')
    next()   //执行下一个中间件。
})

app.post('/register',function (req,res) {
    var strRegisterData=fs.readFileSync('./registerData.json').toString()
    var arrRegisterData=[]
    if (strRegisterData){
        arrRegisterData=JSON.parse(strRegisterData)
    }
    arrRegisterData.push(req.body)

    fs.writeFile('./registerData.json',JSON.stringify(arrRegisterData),function (error) {
        if (error){
            console.log('数据写入错误:'+error)
        }
        else {
            console.log('数据写入成功')
        }
    })

    res.json({
        status:'y',
        message:'提交成功',
        data:arrRegisterData
    })
})

app.post('/login',function (req,res) {
    var strRegisterData=fs.readFileSync('./registerData.json').toString()
    var arrRegisterData=[]
    if (strRegisterData) {
        // console.log(req.body)
        arrRegisterData = JSON.parse(strRegisterData)
        // console.log(arrRegisterData)
    }
    for(var i=0; i<arrRegisterData.length; i++){
        console.log(arrRegisterData[i].userName)
        console.log(req.body.userName)
        console.log(arrRegisterData[i].password1)
        console.log(req.body.password)
        if (arrRegisterData[i].userName === req.body.userName && arrRegisterData[i].password1 === req.body.password){
            res.json({
                status:'y',
                message:'登录成功',
                data:(req.body)
            })
            console.log('登录成功')
            break
        }
    }


})

app.post('/ask',function (req,res) {
    var strAskData=fs.readFileSync('./askData.json').toString()
    var arrAskData=[]
    if (strAskData){
        arrAskData=JSON.parse(strAskData)
    }
    req.body.answer=[]
    var obj={}
    obj.userName=""
    obj.password=""
    obj.time=""
    obj.ip=""
    obj.id=""
    obj.answerContent=""
    req.body.answer.unshift(obj)
    arrAskData.unshift(req.body)

    fs.writeFile('./askData.json',JSON.stringify(arrAskData),function (error) {
        if (error){
            console.log('数据写入错误:'+error)
        }
        else {
            console.log('数据写入成功')
        }
    })

    res.json({
        status:'y',
        message:'提交成功',
        data:arrAskData
    })
})
app.post('/askLength',function (req,res) {
    var strAskData=fs.readFileSync('./askData.json').toString()
    var arrAskData=[]
    if (strAskData){
        arrAskData=JSON.parse(strAskData)
    }

    res.json({
        status:'y',
        message:'提交成功',
        data:(arrAskData.length+1)
    })
})

app.post('/index',function (req,res) {
    var strAskData=fs.readFileSync('./askData.json').toString()
    var arrAskData=[]
    if (strAskData){
        arrAskData=JSON.parse(strAskData)
    }

    res.json({
        status:'y',
        message:'提交成功',
        data:arrAskData
    })
})

app.post('/index/answer',function (req,res) {
    var strAskData=fs.readFileSync('./askData.json').toString()
    var arrAskData=[]
    if (strAskData){
        arrAskData=JSON.parse(strAskData)
    }
    // arrAskData.push(req.body)

    for (var i=0; i<arrAskData.length; i++){
        if (req.body.id == arrAskData[i].id){
            arrAskData[i].answer.unshift(req.body)
            console.log(arrAskData[i].answer)
            var newArrAskData={}
            newArrAskData=arrAskData[i]
            arrAskData.splice(i,1,newArrAskData)
            fs.writeFile('./askData.json',JSON.stringify(arrAskData),function (error) {
                if (error){
                    console.log('数据写入错误:'+error)
                }
                else {
                    console.log('数据写入成功')
                }
            })
        }
    }



    res.json({
        status:'y',
        message:'提交成功',
        data:arrAskData
    })
})


var storage=multer.diskStorage({
    destination:'./www/upload',
    filename:function (req,file,cb) {
        var userName = req.cookies.userName;
        cb(null,userName+'.'+getPetName(file.originalname));
    }
})
function getPetName(fileName) {
    return fileName.split('.')[1];
}
var upload = multer({storage:storage});
app.post('/txUpload',upload.single('photo'),function (req,res) {

    // var buffer = new Buffer(req,body,'base64');
    res.json({
        code:'success',
        message:'上传成功'
    })
});


app.listen(3000,()=>{
    console.log('node is ok')
})