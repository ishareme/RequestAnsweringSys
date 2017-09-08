/**
 * Created by asus on 2017/7/25.
 */
var i=3
$(function () {


    $('#loginForm').validate({
        debug:true,
        rules:{
            userName:{
                required:true,
            },
            password:{
                required:true,
            },
        },
        messages:{
            userName:{
                required:'用户名不能为空',
            },
            password:{
                required:'密码不能为空',
            },
        },
        submitHandler:function (form) {
            $(form).find('#loginBtn').attr('data-target',".showMessage")
            $(form).find('#loginBtn').attr('data-toggle',"modal")


            console.log($(form).serialize())
            $.ajax({
                type:'post',
                url:'/login',
                dataType:'json',
                data:$(form).serialize(),
                success:function(res){
                    if (res.message == '登录成功'){
                        $.cookie('userName',res.data.userName, { expires: 1 ,path: '/' })
                        console.log($.cookie('userName'))
                        console.log($.cookie('password'))

                        var time=setInterval(function () {
                            i--
                            $(form).find('#loginBtn').text(` 登录成功正在跳转${i}s `)
                            $(form).find('#loginBtn').addClass('disabled')
                            if(i==0){
                                i=0
                                clearInterval(time)
                                $(form).find('#loginBtn').removeClass('disabled')
                                $(window).attr('location','index.html');
                            }
                        },1000)
                        console.log(res.message)
                        console.log(res.data.userName)

                    }
                    else{
                        var time=setInterval(function () {
                            i--
                            $(form).find('#loginBtn').text(` 用户名密码不一致正在跳转${i}s `)
                            $(form).find('#loginBtn').addClass('disabled')
                            if(i==0){
                                i=0
                                clearInterval(time)
                                $(form).find('#loginBtn').removeClass('disabled')
                                $(window).attr('location','login.html');
                            }
                        },1000)
                        console.log(res.message)
                    }
                },
                error:function (jqXHR) {
                    console.log('发生错误:'+jqXHR.status)
                }
            })
        }
    })
    $('#loginBtn').on('invalid-form',function (event,valida) {
        $(this).find('#registerBtn').attr('data-target',"")
        $(this).find('#registerBtn').attr('data-toggle',"")
    })

})