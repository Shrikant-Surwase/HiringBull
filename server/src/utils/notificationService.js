import { Expo } from 'expo-server-sdk';

const expo = new Expo({
  accessToken: process.env.EXPO_ACCESS_TOKEN,
  useFcmV1: true,
});

/**
 * Send notifications to a list of devices safely
 */
export const sendNotificationsToDevices = async (
  devices,
  title,
  body,
  data = {}
) => {
  console.log('\n================ PUSH SEND START ================');
  console.log(`Total devices received: ${devices.length}`);

  if (!devices.length) {
    console.log('No devices to notify');
    return { sent: 0, errors: 0 };
  }

  /** 1️⃣ Build messages */
  const messages = [];
  for (const device of devices) {
    if (!Expo.isExpoPushToken(device.token)) {
      console.error('❌ Invalid Expo token:', device.token);
      continue;
    }

    messages.push({
      to: device.token,
      sound: 'default',
      title,
      body,
      data: {
        ...data,
        url: '/(app)/profile',
      },
    });
  }

  console.log(`Valid Expo tokens: ${messages.length}`);

  if (!messages.length) {
    console.log('No valid tokens after filtering');
    return { sent: 0, errors: 0 };
  }

  /** 2️⃣ Chunk messages (Expo max ≈ 100 per chunk) */
  const chunks = expo.chunkPushNotifications(messages);

  let sentCount = 0;
  let errorCount = 0;
  const receiptIds = [];

  /** 3️⃣ Send chunks with throttling */
  for (const [index, chunk] of chunks.entries()) {
    try {
      console.log(
        `🚀 Sending chunk ${index + 1}/${chunks.length} (size: ${chunk.length})`
      );

      const tickets = await expo.sendPushNotificationsAsync(chunk);

      tickets.forEach((ticket, i) => {
        if (ticket.status === 'ok') {
          sentCount++;
          if (ticket.id) receiptIds.push(ticket.id);
        } else {
          errorCount++;
          console.error('❌ Ticket error:', ticket.message, ticket.details);
        }
      });

      // 🔥 Safe adaptive throttle (≈300–400 notifications/sec)
      await new Promise((res) => setTimeout(res, 300));
    } catch (error) {
      console.error('🔥 Chunk send failure:', error);
      errorCount += chunk.length;
    }
  }

  /** 4️⃣ Fetch receipts (important for prod debugging) */
  if (receiptIds.length) {
    console.log('\n📬 Fetching push receipts...');
    try {
      const receipts = await expo.getPushNotificationReceiptsAsync(receiptIds);

      for (const [id, receipt] of Object.entries(receipts)) {
        if (receipt.status === 'error') {
          console.error('❌ Receipt error:', id, receipt.message, receipt.details);
        }
      }
    } catch (error) {
      console.error('🔥 Receipt fetch failed:', error);
    }
  }

  console.log('================ PUSH SEND END =================');
  console.log(`✅ Sent: ${sentCount}`);
  console.log(`❌ Failed: ${errorCount}`);
  console.log('===============================================\n');

  return { sent: sentCount, errors: errorCount };
};

/**
 * Send job notification to followers of a company
 */
export const sendJobNotificationToFollowers = async (companyId, jobData) => {
  const prisma = (await import('../prismaClient.js')).default;

  console.log('\n================ JOB PUSH START ================');
  console.log(`Company: ${jobData.company}`);
  console.log(`Job: ${jobData.title}`);
  console.log(`Segment: ${jobData.segment || 'ALL'}`);

  const whereClause = {
    followedCompanies: { some: { id: companyId } },
    active: true,
  };

  if (jobData.segment) {
    whereClause.experience_level = jobData.segment;
  }

  const users = await prisma.user.findMany({
    where: whereClause,
    select: {
      id: true,
      name: true,
      email: true,
      devices: {
        select: {
          token: true,
          type: true,
        },
      },
    },
  });

  if (!users.length) {
    console.log('No matching users found');
    return { totalUsers: 0, sent: 0, errors: 0 };
  }

  console.log(`Total users matched: ${users.length}`);

  const allDevices = users.flatMap((u) => u.devices);

  console.log(`Total devices found: ${allDevices.length}`);

  const notificationData = {
    type: 'new_job',
    jobId: jobData.id,
    companyId: jobData.companyId,
    companyName: jobData.company,
  };

  const result = await sendNotificationsToDevices(
    allDevices,
    `New job from ${jobData.company}`,
    jobData.title,
    notificationData
  );

  console.log('================ JOB PUSH END ==================');
  console.log(`Users: ${users.length}`);
  console.log(`Sent: ${result.sent}`);
  console.log(`Errors: ${result.errors}`);
  console.log('===============================================\n');

  return {
    totalUsers: users.length,
    ...result,
  };
};
