const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const cekNIk = require('../models/cekNikModel');

exports.user_signup = (req, res, next) => {


    if (!req.is('application/json')) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        });
    }
    if (!req.body.nik || !req.body.noHp) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        });
    }
    if (isNaN(req.body.nik)) {
        return res.status(400).json({
            status: 400,
            message: "NIK hanya boleh angka"
        });
    }

    if (isNaN(req.body.noHp)) {
        return res.status(400).json({
            status: 400,
            message: "No HP hanya boleh angka"
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


    cekNIk(req.body.nik)
        .then((result) => {
            if (result == 1) {
                const otp = Math.floor(1000 + Math.random() * 900000);

                //send otp to api sms

                return res.status(200).json({
                    message: otp
                })
            }
            return res.status(404).json({
                status: 404,
                message: "NIK not found"
            })
        });

}