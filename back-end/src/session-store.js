import { session as db } from "./db";
export default ({ Store }) => class extends Store {

  all (callback) {
    db.find({}, callback);
  }

  destroy (sid, callback) {
    db.remove({ sid }, {}, callback);
  }

  clear (callback) {
    db.remove({}, {}, callback);
  }

  length (callback) {
    db.find({}, (err, docs) => callback(err, docs.length));
  }

  get (sid, callback) {
    db.find({ sid }, (err, docs) => callback(err, docs[0]));
  }

  set (sid, session, callback) {
    db.update({ sid }, { sid, ...session }, (err, numReplaced) => {
      if (err) {
        return callback(err);
      }
      if (!numReplaced) {
        return this.touch(sid, session, callback);
      }
      return callback();
    });
  }

  touch (sid, session, callback) {
    db.insert({ sid, ...session }, callback);
  }

};
