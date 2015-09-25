var Block = require('../models/block.js')

module.exports = function(app, express) {

  var apiBlockRouter = express.Router();

  apiBlockRouter.get('/blocks', function(req, res) {
    Block.find(function(err, blocks) {
      if(err) res.send(err);

      res.json(blocks);
    });
  });

  apiBlockRouter.post('/blocks', function(req, res) {
    var block = new Block();

    block.textBody = req.body.textBody;
    block.author = req.body.author;
    block.color = req.body.color;

    block.save(function(err) {
      if(err)
        res.send(err);
      res.json({message: 'Block created', data: block})
    });
  });

  return apiBlockRouter;

}