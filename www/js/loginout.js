/**
 * Created by asus on 2017/7/25.
 */

console.log($.cookie('userName'))


$(function () {

    if ($.cookie('userName')){
        $('.dropdown-menu li:nth-child(1)').addClass('disabled')
        $('.dropdown-menu li:nth-child(1)>a').addClass('disabled').click(function (event) {
            event.preventDefault()
        })
        $('.dropdown-menu li:nth-child(2)').addClass('disabled')
        $('.dropdown-menu li:nth-child(2)>a').addClass('disabled').click(function (event) {
            event.preventDefault()
        })

        $('.dropdown-menu li:nth-child(5)').click(function () {
            $.cookie('userName',null)
            $.cookie('password',null)
            $(window).attr('location','login.html');
        })
        $('.dropdown-menu li:nth-child(5)>a').click(function (event) {
            event.preventDefault()
        })

    }


})