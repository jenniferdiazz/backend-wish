const router = require('express').Router();

const {
    create,
    remove,
    update,
    list,
} = require("../controllers/userController");
router.get('/users', list)
router.post('/users', create)
router.put('/users/:id', update)
router.delete('/users/:id', remove)


module.exports = router;