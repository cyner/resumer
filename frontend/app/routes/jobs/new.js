import ProtectedRoute from 'resumer/routes/protected';

export default ProtectedRoute.extend({
  model: function() {
    return this.store.createRecord('job');
  }
});
