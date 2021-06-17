const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const axios = require('axios');
const emailValidator = require('email-validator');

const cekNIk = require('../models/cekNikModel');
const cekUser = require('../models/cekUserModel');

exports.ceknik = (req, res, next) => {
    //cek json
    if (!req.is('application/json')) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        });
    }
    //cek req
    if (!req.body.nik || !req.body.noHp || !req.body.email) {
        return res.status(400).json({
            status: 400,
            message: "Bad Request"
        });
    }
    //cek number nik
    if (isNaN(req.body.nik)) {
        return res.status(400).json({
            status: 400,
            message: "NIK hanya boleh angka"
        });
    }
    //cek number no hp
    if (isNaN(req.body.noHp)) {
        return res.status(400).json({
            status: 400,
            message: "No HP hanya boleh angka"
        });
    }
    // cek length no hp
    if (String(req.body.noHp).length <= 8) {
        return res.status(400).json({
            status: 400,
            message: "No Hp kurang dari 8 digit"
        });
    }
    // cek length nik
    if (String(req.body.nik).length != 16) {
        return res.status(400).json({
            status: 400,
            message: "NIK kurang dari 16 digit"
        });
    }
    // cek email
    if (emailValidator.validate(req.body.email) == false) {
        return res.status(400).json({
            status: 400,
            message: "Email Tidak Valid"
        });
    };
    //cek user udah ada apa belum
    cekUser(req.body.noHp).then((result) => {
        if (result == 1) {
            return res.status(400).json({
                status: 400,
                message: "No Hp sudah terdaftar"
            });
        } else {
            //cek nik di db
            cekNIk(req.body.nik).then((result) => {
                if (result == 1) {
                    const otp = Math.floor(1000 + Math.random() * 900000);
                    //send message
                    axios.post('http://10.32.1.37/smsreceiver/kirim.php', {
                        message: "kode otp anda adalah " + otp,
                        nomor: String(req.body.noHp)
                    })
                        .then(function (response) {
                            //success
                            if (response.data.status == 1) {
                                return res.status(200).json({
                                    status: 200,
                                    data: response.data.data.idSendItem,
                                    message: "otp sedang dikirim"
                                })
                            }
                        })
                        .catch(function (error) {
                            // console.log(error);
                        })
                        .finally(function () {
                            // console.log('finish')
                        })
                } else {
                    return res.status(200).json({
                        status: 400,
                        message: "nik tidak terdaftar"
                    })
                }
            });
        }
    });
}