import Ember from 'ember';

const {
  RSVP: {
    Promise
  }
} = Ember;

export default Ember.Service.extend({
  hasAccess: false,

  requestAccess() {
    if(navigator.getUserMedia) {
      navigator.getUserMedia({ audio: true }, ::this.onMediaSuccess, ::this.onMediaError);
    }
  },

  onMediaSuccess(stream) {
    if(!this.get("isDestroyed")) {
      this.set("hasAccess", true);
      this.set("stream", stream);
    }
  },

  onMediaError(e) {
    throw new Error("Could not start recording", e);
  },

  createRecorder() {
    const recorder = new RecordRTC(this.get("stream"), {type: 'audio'});

    const start = () => recorder.startRecording();
    const stop = () => new Promise((res) => recorder.stopRecording(() => {
      const reader = new FileReader();
      reader.onload = () => {
        const buffer = reader.result;
        const trimmed = buffer.slice(0, buffer.byteLength);
        res(new Blob([trimmed]));
      };
      reader.readAsArrayBuffer(recorder.getBlob());
    }));

    return {
      recorder,
      start,
      stop
    };
  }
});
