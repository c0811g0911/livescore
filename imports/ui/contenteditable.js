import { Template } from 'meteor/templating';
import { Players } from '../api/players.js';

import './contenteditable.html';

Template.contenteditable.events({
  'blur .cr-note p': function (event) {

    const value = event.target.innerText;
    const idArr = event.target.id.split('_');
    const code = idArr[0] || '';
    const round = idArr[1] || 1;
    const hole = idArr[2] || 0;

    let player = Players.findOne({
      code: code
    });
    if (player) {
      let holeDetails = player.holeDetails;
      if(round == 1){
        let oldTotal1 = player.total1;
        let oldPar1 = holeDetails[hole].par1;
        let dif = value - oldPar1;
        holeDetails[hole].par1 = value;
        player.total1 = oldTotal1 + dif;
      }

      if(round ==2){
        let oldTotal2 = player.total2;
        let oldPar2 = holeDetails[hole].par2;
        let dif = value - oldPar2;
        holeDetails[hole].par2 = value;
        player.total2 = oldTotal2 + dif;
      }
      player.holdDetails = holeDetails;
      console.log('playerDetails ', player);

      Meteor.call('updatePlayerScore', player, function (err, result) {
        if (err) {
          console.log('err', err);
          return "Have error";
        }

        console.log('Update thanh cong');
      });
    }
  }
});
