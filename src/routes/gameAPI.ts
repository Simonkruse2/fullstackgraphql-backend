import express from "express";
import gameFacade from "../facades/gameFacade";
const router = express.Router();
import { ApiError } from "../errors/apiError";
// const { gameArea, players } = require("./gameData");

//import * as mongo from "mongodb"
import setup from "../config/setupDB";
import UserFacade from "../facades/userFacadeWithDB";
import { runInNewContext } from "vm";

(async function setupDB() {
  const client = await setup();
  gameFacade.setDatabase(client);
})();

// const polygonForClient: any = {};
// polygonForClient.coordinates = gameArea.coordinates[0].map((point: any) => {
//   return { latitude: point[1], longitude: point[0] };
// });

// router.get("/gamearea", (req, res, next) => {
//   try {
//     res.json(polygonForClient);
//   } catch (err) {
//     next(err);
//   }
// });

router.post("/nearbyplayers", async function (req, res, next) {
  try {
    //Todo call your facade method
    const user = req.body;
    const nearbyplayers = await gameFacade.nearbyPlayers(
      user.userName,
      user.password,
      user.lon,
      user.lat,
      user.distance
    );
    res.send(nearbyplayers);
  } catch (err) {
    next(err);
  }
});

// Add endpoint where teams can send only POS
router.post("/getPostIfReached", async function (req, res, next) {
  throw new Error("Not yet implemented");
});

module.exports = router;
