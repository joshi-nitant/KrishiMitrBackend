const Users = require('../models/users');

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

exports.add_user = (req, res, next) => {

    const User = {
        "userName": req.body.userName,
        "userContactNumber": req.body.userContactNumber,
        "userCity": req.body.userCity,
        "userState": req.body.userState
    }

    Users.create(User).then(data => { res.status(200).json(data); }).catch(err => {
        console.log(err);
        res.status(500).json({ error: err });
    })
};

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