/**
 * Created by asus on 2017/7/26.
 */

var i=3;
$(function () {
    $('.txImg').click(function () {
        $(this).next().click()
    })

    $('.txImg').next().change(function () {
        var file=$(this)[0].files[0]
        $('.txImg').attr('src',URL.createObjectURL(file))
    })


    $('form').submit(function (event) {
        event.preventDefault()
        var data=new FormData(this)
        // data.user=$.cookie('userName')
        $.post({
            url:'/txUpload',
            data:data,
            contentType:false,
            processData:false,
            success:function (res) {
                if(res.code == 'success'){
                    alert('上传成功');
                }
                $(window).attr('location','index.html');
            }
        })
    })
})