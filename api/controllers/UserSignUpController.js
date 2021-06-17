const cekValidOTP = require('../models/cekValidOTPModel');
const InsertUser = require('../models/insertUserModel');

exports.signUp = (req, res, next) => {

    if (!req.is('application/json')) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        });
    }
    if (!req.body.nik || !req.body.noHp || !req.body.otp
        || !req.body.password || !req.body.confirmPassword) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        });
    }
    if (isNaN(req.body.nik) || isNaN(req.body.otp) || isNaN(req.body.noHp)) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request format"
        });
    }
    if (String(req.body.otp).length != 6) {
        return res.status(400).json({
            status: 400,
            message: "kode OTP kurang dari 6 digit"
        });
    }

    if (String(req.body.noHp).length <= 8) {
        return res.status(400).json({
            status: 400,
            message: "No Hp kurang dari 8 digit"
        });
    }

    if (String(req.body.nik).length != 16) {
        return res.status(400).json({
            status: 400,
            message: "NIK kurang dari 16 digit"
        });
    }
    //cek length pass
    if (String(req.body.password) < 8 || String(req.body.confirmPassword).length < 8) {
        return res.status(400).json({
            status: 400,
            message: "Password Minimal 8 karakter"
        });
    }
    //cek password = confirmPassword    
    if (req.body.password != req.body.confirmPassword) {
        return res.status(400).json({
            status: 400,
            message: "Password tidak sama"
        });
    }

    cekValidOTP(String(req.body.noHp), function (result) {
        const otpDb = JSON.parse(JSON.stringify(result)).otp;
        const otpArr = result.map(a => a.otp);
        //cek jika otp yg dimasukan masih berumur 2 jam
        if (otpArr.includes(String(req.body.otp)) == false) {
            res.status(400).json({
                status: 400,
                message: "token tidak sama"
            });

        } else {
            //insert ke db app tbl user_client
            InsertUser(req.body.nik, req.body.noHp, req.body.password).then((result) => {
                res.status(200).json({
                    status: 200,
                    message: "Registrasi Berhasil"
                });
            });
        }

    });
}
