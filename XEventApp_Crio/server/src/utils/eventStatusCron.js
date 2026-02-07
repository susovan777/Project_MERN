import cron from 'node-cron';
import Event from '../models/Event.js';

/**
 * Cron job to update event statuses automatically
 * Runs every hour
 */
export const startEventStatusCron = () => {
  // Run every hour: 0 * * * *
  // For testing, you can use: */5 * * * * (every 5 minutes)
  cron.schedule('0 * * * *', async () => {
    try {
      console.log('⏰ Running event status update cron job...');

      const events = await Event.find({
        status: { $in: ['Upcoming', 'Ongoing'] },
      });

      let updatedCount = 0;

      for (const event of events) {
        const oldStatus = event.status;
        event.updateStatus();

        if (oldStatus !== event.status) {
          await event.save();
          updatedCount++;
        }
      }

      console.log(
        `✅ Event status cron completed. Updated ${updatedCount} events.`
      );
    } catch (error) {
      console.error('❌ Event status cron error:', error);
    }
  });

  console.log('✅ Event status cron job scheduled (runs every hour)');
};

export default startEventStatusCron;
