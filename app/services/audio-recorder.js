import Ember from 'ember';

export default Ember.Service.extend({
  hasAccess: false,

  requestAccess() {
    navigator.getUserMedia({ audio: true }, ::this.onMediaSuccess, ::this.onMediaError);
  },

  onMediaSuccess(stream) {
    this.set("hasAccess", true);
    this.set("stream", stream);
  },

  onMediaError(e) {
    console.error('media error', e);
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
