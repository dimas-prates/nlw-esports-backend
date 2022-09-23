import { Router } from "express";
import { PrismaClient } from "@prisma/client";
import { convertHourStringToMinutes } from "../utils/convert-hour-string-to-minutes";
import { convertMinutesToHourString } from "../utils/convert-minutes-to-hour-string";
const gamesRouter = Router();
const prisma = new PrismaClient({
  log: ["query"]
});

gamesRouter.get("/games", async (req, res) => {
  const games = await prisma.game.findMany({
    include: {
      _count: {
        select: {
          ads: true
        }
      }
    }
  });

  return res.status(200).json(games);
});

gamesRouter.get("/games/:id/ads", async (req, res) => {

  const gameId = req.params.id;
  const ads = await prisma.ad.findMany({
    select: {
      id: true,
      name: true,
      weekDays: true,
      useVoiceChannel: true,
      yearsPlaying: true,
      hourStart: true,
      hourEnd: true
    },
    where: {
      gameId: gameId
    },
    orderBy: {
      createdAt: "desc"
    }
  });

  return res.status(200).json(ads.map(ad => {
    return {
      ...ad,
      weekDays: ad.weekDays.split(","),
      hourStart: convertMinutesToHourString(ad.hourStart),
      hourEnd: convertMinutesToHourString(ad.hourEnd)
    };
  }));
});

gamesRouter.post("/games/:id/ads", async (req, res) => {
  const gameId = req.params.id;
  const body = req.body;
  const ad = await prisma.ad.create({
    data: {
      gameId: gameId,
      name: body.name,
      yearsPlaying: body.yearsPlaying,
      discord: body.discord,
      weekDays: body.weekDays.join(","),
      hourStart: convertHourStringToMinutes(body.hourStart),
      hourEnd: convertHourStringToMinutes(body.hourEnd),
      useVoiceChannel: body.useVoiceChannel
    }
  });
  return res.status(200).json(Object.assign({ gameId: req.params.id }, ad));
});

gamesRouter.get("/ads/:id/discord", async (req, res) => {
  const adId = req.params.id;
  const ad = await prisma.ad.findUniqueOrThrow({
    select: {
      discord: true
    },
    where: {
      id: adId
    }
  });

  return res.status(200).json({ discord: ad.discord });
});

export default gamesRouter;
