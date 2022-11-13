//USERS API ROUTE for logged in users
import nc from "next-connect";
import { getSession } from "next-auth/react";
import clientPromise from "@/lib/mongodb";
import ncoptions from "@/config/ncoptions";
import { dateNowUnix } from "@/utils/dates";
import axios from "axios";

const handler = nc(ncoptions);

//MIDDLEWARE
handler.use(async (req, res, next) => {
  //connects to database
  const client = await clientPromise;
  req.db = client.db();
  next();
});

//ADDS USER
handler.post(async (req, res) => {
  const db = req.db;
  console.log("req.body", req.body);
  res.status(200).json({ message: "Shi me pegó" });

  const { bidder, amount } = req.body;
  const bid = {
    bidder,
    amount,
    timestamp: dateNowUnix(),
  };
  try {
    await db.collection("bids").insertOne(bid);
    console.log("bid", bid);
    res.status(200).json({ message: "Bid added" });
  } catch (error) {
    res.status(500).json({ message: "Error" });
  }

  //this is for getting all brands
  handler.get(async (req, res) => {
    const db = req.db;
    try {
      const bids = await db.collection("bids").find({}).toArray();
      res.status(200).json({ bids });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ error });
      return;
    }
  });

  // try {
  //   const bid = {
  //     bidder,
  //     amount,
  //     timestamp: dateNowUnix(),
  //   };

  //   await db.collection("aucoin-main").insertOne(bid);
  //   res.status(200).json(bid);
  // } catch (error) {
  //   console.log(error);
  //   res
  //     .status(500)
  //     .json({ error: error.message, message: "Error Creando un bid" });
  // }
});

handler.get(async (req, res) => {
  const db = req.db;
  try {
    const bids = await db.collection("bids").find({}).toArray();
    res.status(200).json({ bids });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ error });
    return;
  }
});

export default handler;
