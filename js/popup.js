/**
 * Created by shenxj on 2017/6/28.
 */
function inputHint() { //输入框获得焦点时提示信息隐藏，失去焦点时提示信息显示
    var placeholder = [];
    $("input").each(function(i, e) {
        if ($(e).attr("placeholder")) {
            placeholder[i] = $(e).attr("placeholder");
            //输入框获得焦点时提示信息隐藏
            $(e).on("focus", function() {
                $(this).css({ background: "#fff" }).attr("placeholder", "");
            });
            // 失去焦点时提示信息显示
            $(e).on("blur", function() {
                if ($(this).val()) {
                    $(this).css({ background: "#fff" });
                } else {
                    $(this).css({ background: "#efefef" }).attr("placeholder", placeholder[i]);
                }
            });
        } else {
            placeholder[i] = "";
        }
    });
}

function loginON() {
    var $userName = $(".layui-layer .userName");
    var $userPass = $(".layui-layer .userPass");
    var $button = $(".layui-layer .button");
    var $left = $(".layui-layer .left");
    var $right = $(".layui-layer .right");

    $left.on("click", function() {
        layer.closeAll();
        findPassShow();
    });
    $right.on("click", function() {
        layer.closeAll();
        registerShow();
    });
    inputHint();

    $userName.on("blur", function() {
        if ($userName.val() != "" && $userPass.val() != "") {
            $button.removeClass("button-unalive");
            $button.addClass("button-alive");
            $button.unbind();
        }
    });
    $userPass.on("blur", function() {
        if ($userPass.val() == '') {
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
            $button.unbind();
            $(".errorPass").hide();
        }
    });
    $userPass.on("keypress", function() {
        if ($userName.val() != '') {
            $button.removeClass("button-unalive");
            $button.addClass("button-alive");
            //$button.unbind().on("click", userLogin);
        }
    });
}

function register() {
    var $registerEmail = $(".layui-layer .registerEmail");
    var $noFindEmail = $(".layui-layer .noFindEmail");
    var $userName = $(".layui-layer .userName");
    var $userNameSet = $(".layui-layer .userNameSet");
    var $userPassword1 = $(".layui-layer .userPassword1");
    var $userPassSet = $(".layui-layer .userPassSet");
    var $userPassword2 = $(".layui-layer .userPassword2");
    var $userPassSet2 = $(".layui-layer .userPassSet2");
    var $captchaInput = $(".layui-layer .captchaInput");
    var $errorCode = $(".layui-layer .errorCode");
    var $button = $(".layui-layer .button");
    var $right = $(".layui-layer .right");
    var ifName, ifEmail, ifPassword1, ifPassword2, ifvalidate;
    inputHint();
    $right.on("click", function() {
        layer.closeAll();
        loginShow();
    });
    $registerEmail.on("blur", function() {
        var $looking = $(".layui-layer .login-hook2-email");
        if ($(this).val() == "") {
            $noFindEmail.text("请输入注册邮箱");
            $looking.hide();
            ifEmail = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
        } else if ($(this).val() != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test($(this).val())) {
            $noFindEmail.text("邮箱格式不正确");
            $looking.hide();
            ifEmail = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
        } else {
            $noFindEmail.text("");
            $looking.show();
            ifEmail = true;
            if (ifPhone && ifPassword1 && ifPassword2 && ifvalidate) {
                $button.removeClass("button-unalive");
                $button.addClass("button-alive");
            }
        }

        // if ($(this).val() == "" || ($(this).val() != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test($(this).val()))) {
        //     $noFindEmail.show();
        //     $looking.hide();
        //     ifEmail = false;
        //     $button.removeClass("button-alive");
        //     $button.addClass("button-unalive");
        // } else {
        //     $noFindEmail.hide();
        //     $looking.show();
        //     ifEmail = true;
        //     if (ifName && ifPassword1 && ifPassword2 && ifvalidate) {
        //         $button.removeClass("button-unalive");
        //         $button.addClass("button-alive");
        //     }
        // }
    });
    $userName.on("blur", function() {
        var $looking = $(".layui-layer .login-hook2-userName");
        if ($(this).val() == "") {
            // $userNameSet.show();
            $userNameSet.text("请输入用户名");
            $looking.hide();
            ifName = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
        } else if ($(this).val() != "" && !/^([a-zA-Z0-9]|[_]){6,20}$/.test($(this).val())) {
            //$userNameSet.show();
            $userNameSet.text("用户名格式不正确");
            $looking.hide();
            ifName = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
        } else {
            //$userNameSet.hide();
            $userNameSet.text("");
            $looking.show();
            ifName = true;
            if (ifEmail && ifPassword1 && ifPassword2 && ifvalidate) {
                $button.removeClass("button-unalive");
                $button.addClass("button-alive");
            }
        }
    });
    $userPassword1.on("blur", function() {
        var $looking = $(".layui-layer .login-hook2-pass");
        if ($(this).val() == "" || ($(this).val() != "" && !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test($(this).val()))) {
            $userPassSet.text("8-20位密码，字母/数字/符号至少2种");
            $looking.hide();
            ifPassword1 = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
        } else {
            $userPassSet.text("");
            $looking.show();
            ifPassword1 = true;
            if (ifEmail && ifName && ifPassword2 && ifvalidate) {
                $button.removeClass("button-unalive");
                $button.addClass("button-alive");
            }
        }
    });
    $userPassword2.on("blur", function() {
        var $looking = $(".layui-layer .login-hook2-pass2");
        if ($(this).val() != $userPassword1.val()) {
            $userPassSet2.text("请再次输入密码");
            $looking.hide();
            ifPassword2 = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
        } else {
            $userPassSet2.text("");
            $looking.show();
            ifPassword2 = true;
            if (ifEmail && ifName && ifPassword1 && ifvalidate) {
                $button.removeClass("button-unalive");
                $button.addClass("button-alive");
            }
        }
    });
    $captchaInput.on("blur", function() {
        if ($(this).val() == "") {
            $errorCode.text("请输入验证码");
            $errorCode.show();
            ifvalidate = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
        } else {
            $errorCode.text("");
            ifvalidate = true;
            if (ifName && ifEmail && ifPassword1 && ifPassword2) {
                $button.removeClass("button-unalive");
                $button.addClass("button-alive");
            }
        }
    });
    $captchaInput.on("keypress", function() {
        if (ifName && ifEmail && ifPassword1 && ifPassword2) {
            $button.removeClass("button-unalive");
            $button.addClass("button-alive");
        }
    });
}

function findPass() {
    var $userEmail = $(".layui-layer .userEmail");
    var $noFindEmail = $(".layui-layer .noFindEmail");
    var $userInput = $(".layui-layer .userInput");
    var $button = $(".layui-layer .button");
    var $rememberPass = $(".layui-layer .rememberPass");
    var ifEmail;
    $rememberPass.on("click", function() {
        layer.closeAll();
        loginShow();
    });
    inputHint();
    $userEmail.on("blur", function() {
        if (($(this).val() != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test($(this).val()))) {
            $noFindEmail.text("邮箱格式不正确");
            $noFindEmail.show();
            ifEmail = false;
        } else if ($(this).val() == "") {
            $noFindEmail.text("请输入邮箱地址");
            $noFindEmail.show();
            ifEmail = false;
        } else {
            $noFindEmail.hide();
            ifEmail = true;
        }

        // if ($(this).val() == "" || ($(this).val() != "" && !/.+@.+\.[a-zA-Z]{2,4}$/.test($(this).val()))) {
        //     $noFindEmail.text("邮箱格式不正确");
        //     $noFindEmail.show();
        //     ifEmail = false;
        // } else {
        //     $noFindEmail.hide();
        //     ifEmail = true;
        // }
    });
    $userInput.on("blur", function() {
        if (ifEmail && $(this).val().replace(/(^\s*)|(\s*$)/g, "") == '') {
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
            $button.unbind();
            $(".userErrorCode").text("请输入验证码");
            $(".userErrorCode").show();
        } else {
            $(".userErrorCode").hide();
            $button.removeClass("button-unalive");
            $button.addClass("button-alive");
        }
    });
    $userInput.on("keypress", function() {
        if (ifEmail) {
            $button.removeClass("button-unalive");
            $button.addClass("button-alive");
            $(".userErrorCode").hide();
        }
    });
}

function changePassword() {
    var $userName = $(".layui-layer .userName");
    var $noFindEmail = $(".layui-layer .noFindEmail");
    var $userPass = $(".layui-layer .userPass");
    var $button = $(".layui-layer .button");
    var $oldPass = $(".layui-layer .oldPass");
    var ifOldPwd, ifNewPwd, ifNewPwdSet;
    inputHint();
    $oldPass.on("blur", function() {
        if ($(this).val() == "") {
            $noFindEmail.hide();
            $(".errorPass").hide();
            $(".errorOldPass").text("8-20位，包含字母和数字，区分大小写");
            $(".errorOldPass").show();
            ifOldPwd = false;
        } else {
            $(".errorOldPass").hide();
            ifOldPwd = true;
        }
    });
    $userName.on("blur", function() {
        if ($(this).val() == "" || ($(this).val() != "" && !/^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{8,20}$/.test($(this).val()))) {
            $noFindEmail.show();
            $(".errorPass").hide();
            ifNewPwd = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
        } else {
            $noFindEmail.hide();
            ifNewPwd = true;
            if (ifOldPwd && $(this).val() == $userPass.val()) {
                $button.removeClass("button-unalive");
                $button.addClass("button-alive");
            }
        }
    });
    $userPass.on("blur", function() {
        if ($(this).val() == $userName.val()) {
            ifNewPwdSet = true;
            if (ifOldPwd && ifNewPwd) {
                $button.removeClass("button-unalive");
                $button.addClass("button-alive");
            }
            $(".errorPass").hide();
        } else {
            ifNewPwdSet = false;
            $button.removeClass("button-alive");
            $button.addClass("button-unalive");
            $button.unbind();
            $(".errorPass").show();
        }
    });
    $userPass.on("keypress", function() {
        if (ifOldPwd && ifNewPwd) {
            $button.removeClass("button-unalive");
            $button.addClass("button-alive");
            $(".errorPass").hide();
        }
    });
}

function loginShow() {
    $(".errorUserName").hide();
    $(".errorPass").hide();
    var longinStr = $("#login").html();
    layer.open({
        type: 1,
        title: '',
        //closeBtn:1,
        area: ['420px', 'auto'],
        offset: '15%',
        content: longinStr
    });

    $(".layui-layer").ready(function() {
        loginON();
    });
}

function changePassShow() {
    $(".noFindEmail").hide();
    $(".userErrorCode").hide();
    var changePassStr = $("#changePass").html();
    layer.open({
        type: 1,
        title: '修改密码',
        area: ['420px', 'auto'],
        offset: '15%',
        content: changePassStr
    });
    $('.layui-layer-title').css('display', 'none');
    $(".layui-layer").ready(function() {
        changePassword();
    });
}

function registerShow() {
    //genNewCode_regist();
    //$(".noFindEmail").hide();
    //$(".userNameSet").hide();
    //$(".userPassSet").hide();
    //$(".userPassSet2").hide();
    $(".errorCode").hide();
    var registerStr = $("#register").html();
    layer.open({
        type: 1,
        title: '',
        area: ['420px', '580px'],
        offset: '5%',
        content: registerStr,
    });
    //$('.layui-layer-title').css('display', 'none');
    $(".layui-layer").ready(function() {
        register();
        $('.regType li').find("i").on('click', function() {
            $(this).parent('li').siblings().find('i').removeClass('on');
            $(this).addClass('on');
        });
    });
}

function findPassShow() {
    //genNewCode_pwd();
    $(".noFindEmail").hide();
    $(".userErrorCode").hide();
    var findPassStr = $("#findPass").html();
    layer.open({
        type: 1,
        title: '',
        area: ['420px', 'auto'],
        offset: '15%',
        content: findPassStr
    });
    //$('.layui-layer-title').css('display', 'none');
    $(".layui-layer").ready(function() {
        findPass();
    });
}

function goOutShow() {
    var goOutStr = $("#goOut").html();
    layer.open({
        type: 1,
        title: '确定退出',
        area: ['420px', 'auto'],
        offset: '15%',
        content: goOutStr
    });
    $('.layui-layer-title').css('display', 'none');
}

function changePassSuShow() {
    var changePassSuStr = $("#changePassSu").html();
    layer.open({
        time: 5000,
        type: 1,
        title: '修改密码成功',
        offset: '15%',
        area: ['420px', 'auto'],
        content: changePassSuStr
    });
    $('.layui-layer-title').css('display', 'none');
}

function findPassShow2() {
    var findPass2Str = $("#findPass2").html();
    layer.open({
        type: 1,
        title: '去邮箱设置新密码',
        area: ['420px', 'auto'],
        offset: '15%',
        content: findPass2Str
    });
    $('.layui-layer-title').css('display', 'none');
    $(".layui-layer").ready(function() {
        $(".layui-layer .changePassSpan").on("click", function() {
            layer.closeAll();
        });
    });
}

function registerSuccessShow() {
    var registerSuccessStr = $("#registerSuccess").html();
    layer.open({
        time: 5000,
        type: 1,
        title: '注册成功',
        area: ['420px', 'auto'],
        offset: '15%',
        content: registerSuccessStr,
        end: function() { //此处用于演示
            //window.location.href='http://www.catlbattery.com/';
        }
    });
    $('.layui-layer-title').css('display', 'none');
}

function positionShow() {
    var positionStr = $("#position").html();
    layer.open({
        type: 1,
        title: '职位详情',
        area: ['670px', 'auto'],
        content: positionStr
    });
    $('.layui-layer-title').css('display', 'none');
}