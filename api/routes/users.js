const express = require('express');
const router = express.Router();
const { pool } = require('../../app');

//Get all users
router.get('/', (req, res, next) => {
    pool.connect().then((client) => {
        const query = 'Select * from public."Users"';
        client.query(query).then(result => {
            const resp = {
                count: result.rowCount,
                users: result.rows,
                request: {
                    type: "GET",
                    url: "http://localhost:3000/users/userId"
                }
            };
            res.status(200).json(resp);
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Get specific User
router.get('/:userId', (req, res, next) => {
    const id = req.params.userId;
    pool.connect().then(client => {
        const query = 'Select * from public."Users" where "userId" = $1';
        client.query(query, [id]).then(result => {
            res.status(200).json({
                user: result.rows[0],
                request: {
                    type: 'GET',
                    url: 'http://localhost:3000/users'
                }
            });
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Create new user
router.post('/', (req, res, next) => {
    const userName = req.body.userName;
    const userContactNumber = req.body.userContactNumber;
    const userCity = req.body.userCity;
    const userState = req.body.userState;

    pool.connect().then(client => {
        const query = 'Insert into public."Users"("userName","userContactNumber","userCity","userState") Values($1,$2,$3,$4)';
        client.query(query, [userName, userContactNumber, userCity, userState]).then(result => {
            res.status(201).json({
                message: "Created user successfully",
                request: {
                    type: 'GET',
                    url: "http://localhost:3000/users/"
                },
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Update user
router.patch('/:userId', (req, res, next) => {
    const userId = req.params.userId;
    const userName = req.body.userName;
    const userContactNumber = req.body.userContactNumber;
    const userCity = req.body.userCity;
    const userState = req.body.userState;

    pool.connect().then(client => {
        const query = 'Update public."Users" SET "userName" = $1,"userContactNumber"=$2,"userCity"=$3,"userState"=$4 where "userId"=$5';
        client.query(query, [userName, userContactNumber, userCity, userState, userId]).then(result => {
            res.status(201).json({
                message: "User Updated",
                request: {
                    type: 'GET',
                    url: `http://localhost:3000/users/${userId}`
                },
            })
        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            });
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err
        });
    });
});

//Delete exisitng user
router.delete('/:userId', (req, res, next) => {
    const id = req.params.userId;

    pool.connect().then(client => {
        const query = 'Delete from public."Users" where "userId" = $1';
        client.query(query, [id]).then(result => {
            res.status(200).json({
                message: 'User deleted',
                request: {
                    type: 'POST',
                    url: 'http://localhost:3000/users',
                }
            });

        }).catch(err => {
            console.log(err);
            res.status(500).json({
                error: err
            })
        })
    }).catch(err => {
        console.log(err);
        res.status(500).json({
            error: err,
        })
    })
});

module.exports = router;