const mongoose = require('mongoose');
const Deploy = mongoose.model('Deploy');

exports.newsApi = async (req, res, next) => {
  await Deploy.find({}).lean().exec(function(err, docs) {
    res.send(docs)
  });
}

exports.addDeployment = async (req, res, next) => {
  const store = await (new Deploy(req.body)).save();
  res.send({message: 'Record Added Successfully'});
}

exports.deleteDeployment = async (req, res, next) => {
  const store = await Deploy.findByIdAndRemove({_id: req.body._id}).lean().exec(function(err,docs){
    res.send({message: 'Record Deleted Successfully',id:docs._id});
  })
}
