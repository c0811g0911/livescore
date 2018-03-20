import { Template } from 'meteor/templating';
import { ReactiveDict } from 'meteor/reactive-dict';

import { Players } from '../api/players.js';

import './view.html';

import './playerView.html';


Template.view.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.view.helpers({
    players() {

        /**
         * Nam : 0 Nu : 1
         * All : -1  TrungNien:0 CaoNien:1
         */
        let search = {
            sex : '0'
        };

        const instance = Template.instance();

        if(instance.state.get('type')){
            if (instance.state.get('type') == "-1"){
                search = {};
            }else{
                search = _.extend(search, {
                    type: instance.state.get('type')
                });
            }
        }

        if (instance.state.get('sex')) {
            search = _.extend(search, {
                sex: instance.state.get('sex')
            });
        }

        console.log('filter',search);

        return Players.find(search, { sort: { total: -1 } });
    }
});

Template.view.events({
    'click #search_male'(event, instance) {
        instance.state.set('sex', "0");
    },

    'click #search_female'(event, instance) {
        instance.state.set('sex', "1");
    },

    'click #search_type_all'(event, instance) {
        instance.state.set('type', "-1");
    },

    'click #search_type_0'(event, instance) {
        instance.state.set('type', "0");
    },

    'click #search_type_1'(event, instance) {
        instance.state.set('type', "1");
    },
});