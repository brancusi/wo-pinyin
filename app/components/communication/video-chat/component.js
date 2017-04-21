import Ember from 'ember';

const Video = Twilio.Video;

export default Ember.Component.extend({
  didInsertElement() {
    const { token, identity } = this.get("twilioData");

    console.log(token, identity);

    Video.connect(token, {name: "my-room"})
      .then(room => {

        this.attachTracks(room.localParticipant.tracks, this.$(".me:first")[0]);

        room.participants.forEach(::this.participantConnected);
        room.on('participantConnected', ::this.participantConnected);

        room.on('participantDisconnected', ::this.participantDisconnected);
        room.once('disconnected', error => room.participants.forEach(::this.participantDisconnected));
      }, e => {
        console.log(e);
      })
  },

  attachTracks(tracks, container) {
    tracks.forEach(track => {
      container.appendChild(track.attach())
    });
  },

  participantConnected(participant) {
    this.attachTracks(participant.tracks, this.$(".others:first")[0])
    // console.log('Participant "%s" connected', participant.identity);
    //
    // const div = document.createElement('div');
    // div.id = participant.sid;
    // div.innerText = participant.identity;
    //
    // participant.on('trackAdded', track => trackAdded(div, track));
    // participant.tracks.forEach(track => trackAdded(div, track));
    // participant.on('trackRemoved', trackRemoved);
    //
    // document.body.appendChild(div);
  },

  participantDisconnected(participant) {
    console.log("Dis", participant);
    // console.log('Participant "%s" disconnected', participant.identity);
    //
    // participant.tracks.forEach(trackRemoved);
    // document.getElementById(participant.sid).remove();
  },

  trackAdded(div, track) {
    console.log("track added");
    // div.appendChild(track.attach());
  },

  trackRemoved(track) {
    console.log("trackRemoved");
    // track.detach().forEach(element => element.remove());
  }
});
