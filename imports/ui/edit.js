import { Template } from 'meteor/templating';
import { Players } from '../api/players.js';


import './edit.html';

Template.edit.onCreated(function bodyOnCreated() {
    this.state = new ReactiveDict();
});

Template.edit.helpers({

    showIndex(index){
        return parseInt(index) + 1;
    },

    player(){

        const instance = Template.instance();

        if (instance.state.get('vgaCode')) {
            let players = Players.find({
                VGACode: instance.state.get('vgaCode')
            }).fetch();

            return players[0];
        }

        return null;
    }
});

Template.edit.events({
    'submit .search-player'(event, instance) {
        // Prevent default browser form submit
        event.preventDefault();

        // Get value from form element
        const target = event.target;
        instance.state.set('vgaCode', target.text.value);
    },

    'submit .update-player'(event, instance){

        event.preventDefault();

        if(confirm("Do you really want to update score for this player ?")){
            const target = event.target;
            const vgaCode = target.vgaCode.value;

            let holeDetails = [];
            let total1 = 0;
            let total2 = 0;

            for (let i = 0; i < 18; i++) {

                let val1 = $('#r1_h' + i).val();
                total1 += parseInt(val1);
                let val2 = $('#r2_h' + i).val();
                total2 += parseInt(val2);

                holeDetails.push({
                    par1: val1,
                    par2: val2
                });
            }

            Meteor.call('updatePlayerScore', vgaCode, total1, total2, holeDetails, function (err, result) {
                if (err) {
                    console.log('err', err);
                    return "Have error";
                }

                instance.state.set('vgaCode', null);
                $('#search_vga').val('');
            });
        }
    },
});