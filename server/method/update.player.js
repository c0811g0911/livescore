import { Players } from "../../imports/api/players";

Meteor.methods({
    updatePlayerScore: function (vgaCode, total1,total2,holeDetails) {

        var player = Players.findOne({
            VGACode : vgaCode
        });
        if (player) {
            var update = {
                $set: {
                    total1: total1,
                    total2: total2,
                    holeDetails : holeDetails
                }
            };
            return Players.update({ VGACode: vgaCode }, update);
        } else {
            throw new Meteor.Error(404, "No Such Player");
        }
    },
});