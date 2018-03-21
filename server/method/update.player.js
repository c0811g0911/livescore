import { Players } from "../../imports/api/players";

Meteor.methods({
    updatePlayerScore: function (playerObj) {

        var player = Players.findOne({
            code : playerObj.code
        });
        if (player) {
            var update = {
                $set: {
                    total1: playerObj.total1,
                    over1: playerObj.over1,
                    total2: playerObj.total2,
                    over2: playerObj.over2,
                    holeDetails: playerObj.holeDetails
                }
            };
            return Players.update({ code: player.code }, update);
        } else {
            throw new Meteor.Error(404, "No Such Player");
        }
    },
});