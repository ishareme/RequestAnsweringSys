/**
 * Created by asus on 2017/7/25.
 */
var i=3



var now=new Date()
var year=now.getFullYear()
var month=now.getMonth()+1
var day=now.getDate()
var hour=now.getHours()
var minute=now.getMinutes()
if (month<10){
    month='0'+month
}
if(day<10){
    day='0'+day
}
if (hour<10){
    hour='0'+hour
}
if(minute<10){
    minute='0'+minute
}
var askData={
    userName:$.cookie('userName'),
    password:$.cookie('password'),
    time:`${year}-${month}-${day} ${hour}:${minute}`,
}
askData.answer=[]
var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
$.getJSON(url, function (data) {
    askData.ip=(data.Ip).toString();//弹出本地ip
});
$.ajax({
    type:'post',
    url:'/askLength',
    dataType:'json',
    // data:askData,
    success:function(res){
        askData.id=res.data
    },
    error:function (jqXHR) {
        console.log('发生错误:'+jqXHR.status)
    }
})


$(function () {


    $('#askForm').validate({
        debug:true,
        rules:{
            askContent:{
                required:true
            },
        },
        messages:{
            askContent:{
                required:'内容不能为空',
            }
        },

        submitHandler:function (form) {
            askData.askContent=$('#askContent').val()
            console.log(askData)
            $.ajax({
                type:'post',
                url:'/ask',
                dataType:'json',
                data:askData,
                success:function(res){
                    var time=setInterval(function () {
                        i--
                        $(form).find('#askBtn').text(` 提交成功正在跳转${i}s `)
                        $(form).find('#askBtn').addClass('disabled')
                        if(i==0){
                            i=0
                            clearInterval(time)
                            $(form).find('#askBtn').removeClass('disabled')
                            $(window).attr('location','index.html');
                        }
                    },1000)
                    console.dir(res.data)
                },
                error:function (jqXHR) {
                    console.log('发生错误:'+jqXHR.status)
                }
            })
        }
    })

})