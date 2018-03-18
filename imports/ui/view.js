import { Template } from 'meteor/templating';

import { Players } from '../api/players.js';

import './view.html';

import './player.html';

Template.view.helpers({
    players() {
        return Players.find({}, { sort: { total: -1 } });
    }
});