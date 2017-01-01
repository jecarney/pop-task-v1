var Bubble = require('./model.js');

exports.index = function(req, res, next) {
  Bubble.find()
  .then((bubbles) => {
    // hello();
    res.send(bubbles)
  })
}

exports.show = function(req, res) {
  Bubble.findById(req.params.id)
  .then((bubbles) => res.send(bubbles))
  .catch((err) => res.send(404));
}

exports.update = function(req, res) {
  // console.log('update in controller')
  // console.log(req.body)
  Bubble.findById(req.params.id)
  .then((bubble) => {
    // console.log('bubble before assign');
    // console.log(bubble);
    Object.assign(bubble, req.body);
    // console.log('bubble after assign');
    // console.log(bubble);

    bubble.save()
    .then(function(bubble) {
      // console.log('update success')
      res.send(bubble);
    })
    .catch(function(err) {
      // console.log('err')
      // console.log(err)
      res.status(422);
      res.send(err);
    });
  })
  .catch(() => res.send(404))
}

exports.create = function(req, res) {
  var bubble = new Bubble();

  Object.assign(bubble, req.body);

  bubble.save()
  .then(()=> {
    res.send(bubble);
  }).catch((err)=> {
    res.status(422);
    res.send(err);
  });
}

exports.delete = function(req, res, next) {
  Bubble.findOneAndRemove({_id: req.params.id})
  .then(() => {res.sendStatus(200)})
  .catch((err)=> {
    console.log(err);
  }
  )
}
