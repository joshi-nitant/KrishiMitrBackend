const Users = require('../models/users');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.get_all_users = (req, res, next) => {
    Users.findAll().then(users => {
        const response = {
            count: users.length,
            users: users,
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        });
    })
};

exports.get_specific_users = (req, res, next) => {
    const id = req.params.userId;
    Users.findByPk(id).then(user => {
        const response = {
            "user": user
        }
        res.status(200).json(response);
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
        });
    });
};

exports.register_user = (req, res, next) => {

    Users.findAll({ where: { userContactNumber: req.body.userContactNumber } }).then(users => {
        if (users.length >= 1) {
            return res.status(409).json({
                message: "User already exists with same contact number",
            });
        } else {
            bcrypt.hash(req.body.userpassword, 10, (err, hash) => {
                if (err) {
                    return res.status(500).json({
                        error: err
                    });
                } else {
                    const User = {
                        "userName": req.body.userName,
                        "userContactNumber": req.body.userContactNumber,
                        "userCity": req.body.userCity,
                        "userState": req.body.userState,
                        "userpassword": hash
                    }

                    Users.create(User).then(data => { res.status(200).json(data); }).catch(err => {
                        console.log(err);
                        res.status(500).json({ error: err });
                    });
                }
            });


        }
    }).catch(err => {
        console.log(err)
        res.status(500).json({
            error: err,
        });
    });

};

exports.login_user = (req, res, next) => {
    Users.findAll({ where: { userContactNumber: req.body.userContactNumber } })
        .then(users => {
            if (users.length < 1) {
                return res.status(401).json({
                    message: "Auth failed"
                });
            }
            bcrypt.compare(req.body.userpassword, users[0].userpassword, (err, result) => {
                if (err) {
                    return res.status(401).json({
                        message: "Auth failed"
                    });
                }
                if (result) {
                    const token = jwt.sign({
                            userId: users[0].userId,
                            userContactNumber: users[0].userContactNumber
                        },
                        process.env.JWT_KEY, {
                            expiresIn: "1h"
                        }
                    );
                    return res.status(200).json({
                        message: "Auth successful",
                        token: token
                    });
                }
                res.status(401).json({
                    message: "Auth failed"
                });
            });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        });
}

exports.update_user = (req, res, next) => {
    const id = req.params.userId;

    Users.update(req.body, { where: { userId: id } }).then(num => {
        if (num == 1) {
            res.status(200).json({
                message: "Updated Succefully"
            });
        } else {
            res.status(200).json({
                message: "Updation Unsuccefull. May be the row not found."
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    });
};

exports.delete_user = (req, res, next) => {
    const id = req.params.userId;

    Users.destroy({ where: { userId: id } }).then(num => {
        if (num == 1) {
            res.status(200).json({
                message: "Deleted Succefully"
            });
        } else {
            res.status(200).json({
                message: "Deleted Unsuccefull. May be the row not found."
            });
        }
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    });
};