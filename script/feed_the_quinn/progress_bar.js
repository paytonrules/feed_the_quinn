module.exports = {

  create: function(obj) {

    return {
      update: function(stress) {
        obj.stress = stress;
      }
    };
  }
};
