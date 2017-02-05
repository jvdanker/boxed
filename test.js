console.log('test');

var virtualbox = require('virtualbox');

virtualbox.list(function list_callback(machines, error) {
  if (error) throw error;

  console.log(machines);
});