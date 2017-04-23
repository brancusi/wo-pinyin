import Ember from 'ember';
import firebase from 'firebase';
import { v4 as uuid } from 'uuid';
import moment from 'moment';
import _ from 'lodash';

export default Ember.Route.extend({
  setupController(controller, model) {
    const { record, lessonId, twilioData } = model;

    controller.set('lesson', record);
    controller.set('twilioData', twilioData);
    controller.set('lessonId', lessonId);

    this._super(...arguments);
  },

  async model(params) {
    const twilioDataRes = await fetch("https://wt-brancusi-gmail_com-0.run.webtask.io/create-twilio-token");
    const twilioData = await twilioDataRes.json();

    const record = await this.store.findRecord('lesson', params.id)
      .catch(() => {

        const chinese = this.store.createRecord('translation', { flashCard, lang: 'chinese' });
        const pinyin = this.store.createRecord('translation', { flashCard, lang: 'pinyin' });
        const english = this.store.createRecord('translation', { flashCard, lang: 'english' });

        const lesson = this.store.createRecord('lesson', {id:params.id, date:new Date()});
        const conversation = this.store.createRecord('conversation', {lesson});

        const flashCard = this.store
          .createRecord('flash-card', {
            conversation,
            chinese,
            pinyin,
            english
          });

        return lesson.save()
          .then(lesson => conversation.save())
          .then(conversation => flashCard.save())
          .then(flashCard => Ember.RSVP.all([chinese.save(), pinyin.save(), english.save()]))
          .then(flashCard => lesson);
      });

    return {
      record,
      twilioData,
      lessonId: params.id
    }
  },

  async createConversation(lesson, position = 0) {
    const conversations = await lesson.get("conversations");

    const sortedConversations = conversations.sortBy("position");

    const prevCard = sortedConversations[position - 1];
    const nextCard = sortedConversations[position];

    const prev = Ember.isPresent(prevCard) ? prevCard.get("position") : undefined;
    const next = Ember.isPresent(nextCard) ? nextCard.get("position") : undefined;

    let newPosition;

    if(prev === undefined && next !== undefined) {
      newPosition = next/2;
    }

    if(prev !== undefined && next === undefined) {
      newPosition = prev + 1;
    }

    if(prev !== undefined && next !== undefined) {
      newPosition = (next - prev)/2 + prev;
    }

    if(prev === undefined && next === undefined) {
      newPosition = 1;
    }

    const conversation = this.store
      .createRecord('conversation', { lesson, position: newPosition });

    const chinese = this.store.createRecord('translation', { flashCard, lang: 'chinese' });
    const pinyin = this.store.createRecord('translation', { flashCard, lang: 'pinyin' });
    const english = this.store.createRecord('translation', { flashCard, lang: 'english' });

    const flashCard = this.store
      .createRecord('flash-card', {
        conversation,
        chinese,
        pinyin,
        english
      });

    await conversation.save();
    await flashCard.save();
    await Ember.RSVP.all([chinese.save(), pinyin.save(), english.save()]);
    await lesson.save();
  },

  actions: {
    onAudioCreated(model, blob) {
      const app = firebase.app();
      var storageRef = app.storage().ref();

      const path = `audio/${uuid()}.wav`;
      var audioRef = storageRef.child(path);

      return audioRef.put(blob).then(() => {
        model.set("audioUrl", path);
        return model.save();
      });
    },

    navigateHome() {
      this.transitionTo("index");
    },

    saveModel(model) {
      console.log(model);
      if(model.then !== undefined) {
        model.then(res => {
          console.log(res);
          res.save()
        });
      } else {
        model.save();
      }
    },

    async destroyFlashCard(conversation, flashCard) {
      flashCard.deleteRecord();

      const chinese = await flashCard.get('chinese');
      const pinyin = await flashCard.get('pinyin');
      const english = await flashCard.get('english');

      chinese.deleteRecord();
      pinyin.deleteRecord();
      english.deleteRecord();

      if(conversation.get("isEmpty")) {
        conversation.deleteRecord();
      }

      await flashCard.save();
      await Ember.RSVP.all([chinese.save(), pinyin.save(), english.save()]);
      await conversation.save();
    },

    createConversation(lesson, position) {
      this.createConversation(lesson, position);
    },

    async createFlashCard(conversation, position) {
      const flashCards = await conversation.get("flashCards");

      const sortedFlashCards = flashCards.sortBy("position");

      const leftCard = sortedFlashCards[position - 1];
      const rightCard = sortedFlashCards[position];

      const left = Ember.isPresent(leftCard) ? leftCard.get("position") : undefined;
      const right = Ember.isPresent(rightCard) ? rightCard.get("position") : undefined;

      let newPosition;

      if(left === undefined && right !== undefined) {
        newPosition = right/2;
      }

      if(left !== undefined && right === undefined) {
        newPosition = left + 1;
      }

      if(left !== undefined && right !== undefined) {
        newPosition = (right - left)/2 + left;
      }

      if(left === undefined && right === undefined) {
        newPosition = 1;
      }

      const chinese = this.store.createRecord('translation', { flashCard, lang: 'chinese' });
      const pinyin = this.store.createRecord('translation', { flashCard, lang: 'pinyin' });
      const english = this.store.createRecord('translation', { flashCard, lang: 'english' });

      const flashCard = this.store
        .createRecord('flash-card', {
          conversation,
          position: newPosition,
          chinese,
          pinyin,
          english
        });

      await flashCard.save();
      await Ember.RSVP.all([chinese.save(), pinyin.save(), english.save()]);
      await conversation.save();
    }
  }
});
