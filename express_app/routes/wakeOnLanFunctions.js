let express = require('express')
let router = express.Router()
let wakeOnLan = require('node-wol')

/* GET home page. */
router.post('/WOL', function(req, res) {
	wakeOnLan.wake('30-9C-23-02-C8-AB', function(error) {
		if (error) {
			console.log(error)
		} else {
			console.log('WOL sent !')
		}
		res.end()
	})
})

module.exports = router
