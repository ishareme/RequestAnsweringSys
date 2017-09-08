/**
 * Created by asus on 2017/7/25.
 */
var i=3
$(function () {


    $('#registerForm').validate({
        debug:true,
        rules:{
            userName:{
                required:true,
                maxlength:10,
                minlength:2
            },
            password1:{
                required:true,
                minlength:3
            },
            password2:{
                required:true,
                minlength:3,
                equalTo:'#password1'
            },
            email:{
                required:true,
                email:true
            }
        },
        messages:{
            userName:{
                required:'用户名不能为空',
                maxlength:'用户名不能多于10位',
                minlength:'用户名不能少于2位'
            },
            password1:{
                required:'密码不能为空',
                minlength:'密码不能少于3位'
            },
            password2:{
                required:'密码不能为空',
                minlength:'密码不能少于3位',
                equalTo:'输入的密码不一致'
            },
            email:{
                required:'邮箱不能为空',
                email:'邮箱格式不正确'
            }
        },
        submitHandler:function (form) {
            $(form).find('#registerBtn').attr('data-target',".showMessage")
            $(form).find('#registerBtn').attr('data-toggle',"modal")


            console.log($(form).serialize())
            $.ajax({
                type:'post',
                url:'/register',
                dataType:'json',
                data:$(form).serialize(),
                success:function(res){
                    var time=setInterval(function () {
                        i--
                        $(form).find('#registerBtn').text(` 注册成功正在跳转${i}s `)
                        $(form).find('#registerBtn').addClass('disabled')
                        if(i==0){
                            i=0
                            clearInterval(time)
                            $(form).find('#registerBtn').removeClass('disabled')
                            $(window).attr('location','login.html');
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
    $('#registerForm').on('invalid-form',function (event,valida) {
        $(this).find('#registerBtn').attr('data-target',"")
        $(this).find('#registerBtn').attr('data-toggle',"")
    })

})