
// 邮箱验证登录

'use strict';
const nodemailer = require('nodemailer');

let transporter = nodemailer.createTransport({
    service: 'qq',
    port: 465,
    secure: true, // false for 587, false for other ports
    auth: {
        user: "1350296586@qq.com", // 默认邮箱
        pass: 'afaetwhtqmetijah' // SMTP授权码
    }
});

// send mail with defined transport object
function sendmail(mail,data){
    return new Promise((resove,reject)=>{
        // 发送相关信息
        let mailOptions = {
            from: '1350296586@qq.com', // sender address
            to: mail, // list of receivers
            subject: '1807管理注册', // Subject line
            text:`您的验证码为${data},60秒内有效`, // plain text body
            // html: '<b>今天2018年10月29号，后天就是万圣节啦啦啦</b>' // html body
        };
        transporter.sendMail(mailOptions,(error , info)=>{
            if(error){
                console.log(error);
              reject("发送失败");
            }
            resove("发送成功");
        })
    })
    
}

module.exports={sendmail};






