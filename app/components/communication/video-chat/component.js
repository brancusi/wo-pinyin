import Ember from 'ember';

const Video = Twilio.Video;

export default Ember.Component.extend({
  startVideo() {
    const { token } = this.get("twilioData");

    Video.connect(token, {name: "my-room"})
      .then(room => {

        this.attachTracks(room.localParticipant.tracks, this.$(".me:first")[0]);

        room.participants.forEach(::this.participantConnected);
        room.on('participantConnected', ::this.participantConnected);

        room.on('participantDisconnected', ::this.participantDisconnected);
        room.once('disconnected', () => room.participants.forEach(::this.participantDisconnected));
      });
  },

  attachTracks(tracks, container) {
    tracks.forEach(track => this.attachTrack(track, container));
  },

  attachTrack(track, container) {
    container.appendChild(track.attach());
  },

  removeTracks(tracks) {
    tracks.forEach(track => this.removeTrack(track));
  },

  removeTrack(track) {
    track.detach().forEach(element => element.remove());
  },

  participantConnected(participant) {
    const container = this.$(".others:first")[0];

    participant.on('trackAdded', track => ::this.attachTrack(track, container));
    participant.on('trackRemoved', track => ::this.removeTrack(track));

    this.attachTracks(participant.tracks, container);
  },

  participantDisconnected(participant) {
    this.removeTracks(participant.tracks);
  },

  actions: {
    startVideo() {
      this.startVideo();
    }
  }
});
