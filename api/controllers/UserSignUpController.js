
exports.signUp = (req, res, next) => {
    return res.status(200).json({
        status: 200,
        data: response.data.data.idSendItem,
        message: "otp berhasil dikirim"
    })
}
