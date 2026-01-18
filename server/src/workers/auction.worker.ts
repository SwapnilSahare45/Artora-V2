import cron from "node-cron";
import { Auction } from "../models/auction.model";

export const initCronJobs = () => {
  cron.schedule("* * * * *", async () => {
    try {
      const now = new Date();

      const result = await Auction.updateMany(
        {
          status: "scheduled",
          startDate: { $lte: now },
        },
        {
          $set: { status: "live" },
        },
      );

      if (result.modifiedCount > 0) {
        console.log(`Successfully started ${result.modifiedCount} auctions.`);
      }
    } catch (error) {
      console.error("Error updating auction statuses:", error);
    }
  });
};
