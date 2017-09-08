/**
 * Created by asus on 2017/7/26.
 */

// var dataTemplate=
// var strHtml=template('showItem',data)
// $('.rightContainer').html(strHtml)

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
var answerData={
    userName:$.cookie('userName'),
    password:$.cookie('password'),
    time:`${year}-${month}-${day} ${hour}:${minute}`,
}
var url = 'http://chaxun.1616.net/s.php?type=ip&output=json&callback=?&_=' + Math.random();
$.getJSON(url, function (data) {
    answerData.ip=(data.Ip).toString();//弹出本地ip
});


var s='无'
$(function () {
    $.ajax({
        type:'post',
        url:'/index',
        dataType:'json',
        // data:askData,
        success:function(res){

            strHtml=template('askShow',res.data)
            $('.content .container').html(strHtml)

            $(document).find('.answerArea').hide()


            $(document).find('.answerBtn').click(function (event) {
                event.preventDefault()
                $(this).parent().prev().show(1500)
                $(this).parent().prev().change(function () {
                    answerData.answerContent=$(this).find('textarea').val()
                    answerData.id=$(this).next().children().data('index')
                    console.log(answerData)
                    $.ajax({
                        type:'post',
                        url:'/index/answer',
                        dataType:'json',
                        data:answerData,
                        success:function(res){
                            console.dir(res.data)
                            $(window).attr('location','index.html');

                        },
                        error:function (jqXHR) {
                            console.log('发生错误:'+jqXHR.status)
                        }
                    })
                })
            })

        },
        error:function (jqXHR) {
            console.log('发生错误:'+jqXHR.status)
        }
    })



})

