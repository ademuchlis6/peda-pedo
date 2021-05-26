const cekValidOTP = require('../models/cekValidOTPModel');

exports.signUp = (req, res, next) => {

    if (!req.is('application/json')) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        });
    }
    if (!req.body.nik || !req.body.noHp || !req.body.otp) {
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

    cekValidOTP(String(req.body.noHp), function (result) {
        const otpDb = JSON.parse(JSON.stringify(result))[0].otp;

        if (otpDb == req.body.otp) {
            // insert to db user
            res.status(200).json({
                status: 200,
                message: "token sama"
            });
        } else {
            res.status(404).json({
                status: 404,
                message: "token tidak sama"
            });
        }

    });


}
