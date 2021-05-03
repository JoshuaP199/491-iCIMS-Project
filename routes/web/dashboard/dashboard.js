const express = require('express');
const ensureLoggedIn = require('../../../utils/auth/authLoggedIn').ensureLoggedIn;
const Cards = require('../../../models/cards')
const router = express.Router();

router.use(ensureLoggedIn);



router.get('/', async (req, res) => {
    const userdata = req.user;
    const query = {userName: userdata.userName};
    try {
        const carddata = await Cards.find(query).sort( { status : 1 } );
        res.render('dashboard', {
            carddata: carddata
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})
router.get('/:id/open', async (req, res) => {
    const userdata = req.user;
    const query = {_id: req.params.id};
    try {
        const carddata = await Cards.find(query);
        res.render('dashboard', {
            carddata: carddata
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
})

router.post('/new', async (req, res) => {
    const userdata = req.user;
    var today = new Date();
    const card = new Cards({
        userName: userdata.userName,
        title: req.body.title,
        job: req.body.job,
        status: req.body.status,
        desc: req.body.desc,
        dateApplied: req.body.dateApplied,
        dateUpdated: today,
    })
    await card.save();
    return res.redirect('back');
})

router.post('/:id/update', async (req, res) => {
    const userdata = req.user;
    var today = new Date();
    const card = await Cards.findById(req.params.id);

    card.userName = userdata.userName;
    card.title = ((req.body.title == "") ? card.title : req.body.title);
    card.status = ((req.body.status == "") ? card.status : req.body.status);
    card.dateApplied = ((req.body.dateApplied == "") ? card.dateApplied : req.body.dateApplied);
    card.dateUpdated = today;

    await card.save();
    return res.redirect('back');
})


router.post('/:id/delete', async (req, res) => {
    await Cards.remove({ '_id': req.params.id }, function(error, document) {});
    return res.redirect('back');
})

module.exports = router;