const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const slug = require('slugs');

const Schema = mongoose.Schema;

const deploySchema = new Schema({
   templateName: {
     type: String,
     trim: true,
     required: 'Please enter a template name!'
   },
   version:{
     type: String,
     trim: true,
   },
   slug: String,
   url: {
     type: String,
     trim: true
   },
   date: String
});

deploySchema.index({
  name:'text',
  description: 'text'
})

deploySchema.pre('save', function(next){
  if(!this.isModified('name')){
    next();
    return;
  }
  this.slug = slug(this.name);
  next();
});

module.exports = mongoose.model('Deploy',deploySchema);
