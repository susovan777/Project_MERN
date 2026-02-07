import mongoose from 'mongoose';
import dotenv from 'dotenv';
import User from '../models/User.js';
import Event from '../models/Event.js';
import Registration from '../models/Registration.js';
import OrganizerRequest from '../models/OrganizerRequest.js';
import { connectDB } from '../config/db.js';

dotenv.config();

const seedData = async () => {
  try {
    await connectDB();

    // Clear existing data
    console.log('🗑️  Clearing existing data...');
    await User.deleteMany({});
    await Event.deleteMany({});
    await Registration.deleteMany({});
    await OrganizerRequest.deleteMany({});
    console.log('✅ Data cleared');

    // Create Admin User (Required for tests)
    console.log('👤 Creating admin user...');
    const admin = await User.create({
      name: 'Admin User',
      email: 'crio.do.test@example.com',
      password: '12345678',
      role: 'Admin',
      avatar: 'https://res.cloudinary.com/demo/image/upload/admin-avatar.png',
      isEmailVerified: true,
    });
    console.log('✅ Admin created:', admin.email);

    // Create Organizers
    console.log('👥 Creating organizers...');
    const organizer1 = await User.create({
      name: 'John Smith',
      email: 'john.organizer@example.com',
      password: 'password123',
      role: 'Organizer',
      avatar: 'https://i.pravatar.cc/150?img=2',
      isEmailVerified: true,
    });

    const organizer2 = await User.create({
      name: 'Sarah Johnson',
      email: 'sarah.organizer@example.com',
      password: 'password123',
      role: 'Organizer',
      avatar: 'https://i.pravatar.cc/150?img=5',
      isEmailVerified: true,
    });

    console.log('✅ Organizers created');

    // Create Participants
    console.log('👥 Creating participants...');
    const participant1 = await User.create({
      name: 'Alice Brown',
      email: 'alice@example.com',
      password: 'password123',
      role: 'Participant',
      avatar: 'https://i.pravatar.cc/150?img=4',
      isEmailVerified: true,
    });

    const participant2 = await User.create({
      name: 'Bob Williams',
      email: 'bob@example.com',
      password: 'password123',
      role: 'Participant',
      avatar: 'https://i.pravatar.cc/150?img=9',
      isEmailVerified: true,
    });

    const participant3 = await User.create({
      name: 'Charlie Davis',
      email: 'charlie@example.com',
      password: 'password123',
      role: 'Participant',
      avatar: 'https://i.pravatar.cc/150?img=15',
      isEmailVerified: true,
    });

    const participant4 = await User.create({
      name: 'Diana Miller',
      email: 'diana@example.com',
      password: 'password123',
      role: 'Participant',
      avatar: 'https://i.pravatar.cc/150?img=19',
      isEmailVerified: true,
    });

    console.log('✅ Participants created');

    // Create Events
    console.log('📅 Creating events...');

    // Upcoming Events
    const event1 = await Event.create({
      title: 'Tech Conference 2026',
      description:
        'Annual technology conference featuring latest trends in AI, Cloud Computing, and Web Development. Network with industry leaders and learn from expert speakers.',
      startDate: new Date('2026-03-15'),
      startTime: '09:00',
      endDate: new Date('2026-03-17'),
      endTime: '18:00',
      location: 'San Francisco Convention Center',
      eventType: 'Offline',
      category: 'Conference',
      image: 'https://picsum.photos/seed/tech1/800/400',
      status: 'Upcoming',
      organizer: organizer1._id,
      maxParticipants: 500,
    });

    const event2 = await Event.create({
      title: 'Web Development Workshop',
      description:
        'Hands-on workshop covering React, Node.js, and MongoDB. Build a full-stack application from scratch.',
      startDate: new Date('2026-02-20'),
      startTime: '10:00',
      endDate: new Date('2026-02-20'),
      endTime: '16:00',
      location: 'Online via Zoom',
      eventType: 'Online',
      category: 'Workshop',
      image: 'https://picsum.photos/seed/workshop1/800/400',
      status: 'Upcoming',
      organizer: organizer1._id,
      maxParticipants: 50,
    });

    const event3 = await Event.create({
      title: 'AI & Machine Learning Seminar',
      description:
        'Explore the fundamentals of artificial intelligence and machine learning. Learn about neural networks, deep learning, and practical applications.',
      startDate: new Date('2026-04-10'),
      startTime: '14:00',
      endDate: new Date('2026-04-10'),
      endTime: '17:00',
      location: 'MIT Campus, Boston',
      eventType: 'Offline',
      category: 'Seminar',
      image: 'https://picsum.photos/seed/ai1/800/400',
      status: 'Upcoming',
      organizer: organizer2._id,
      maxParticipants: 100,
    });

    const event4 = await Event.create({
      title: 'Startup Networking Meetup',
      description:
        'Connect with fellow entrepreneurs, investors, and startup enthusiasts. Share ideas and build partnerships.',
      startDate: new Date('2026-02-25'),
      startTime: '18:00',
      endDate: new Date('2026-02-25'),
      endTime: '21:00',
      location: 'WeWork, New York',
      eventType: 'Offline',
      category: 'Meetup',
      image: 'https://picsum.photos/seed/meetup1/800/400',
      status: 'Upcoming',
      organizer: organizer2._id,
      maxParticipants: 75,
    });

    const event5 = await Event.create({
      title: 'Cybersecurity Webinar',
      description:
        'Learn about the latest cybersecurity threats and best practices to protect your organization.',
      startDate: new Date('2026-03-05'),
      startTime: '15:00',
      endDate: new Date('2026-03-05'),
      endTime: '16:30',
      location: 'Online via Google Meet',
      eventType: 'Online',
      category: 'Webinar',
      image: 'https://picsum.photos/seed/cyber1/800/400',
      status: 'Upcoming',
      organizer: organizer1._id,
      maxParticipants: 200,
    });

    const event6 = await Event.create({
      title: 'Hackathon 2026',
      description:
        '48-hour coding marathon. Build innovative solutions and compete for exciting prizes!',
      startDate: new Date('2026-05-01'),
      startTime: '08:00',
      endDate: new Date('2026-05-03'),
      endTime: '20:00',
      location: 'Tech Hub, Seattle',
      eventType: 'Offline',
      category: 'Hackathon',
      image: 'https://picsum.photos/seed/hack1/800/400',
      status: 'Upcoming',
      organizer: organizer2._id,
      maxParticipants: 150,
    });

    // Ongoing Event
    const event7 = await Event.create({
      title: 'Cloud Computing Training',
      description:
        'Week-long intensive training on AWS, Azure, and Google Cloud Platform.',
      startDate: new Date('2026-02-03'),
      startTime: '09:00',
      endDate: new Date('2026-02-10'),
      endTime: '17:00',
      location: 'Online',
      eventType: 'Online',
      category: 'Training',
      image: 'https://picsum.photos/seed/cloud1/800/400',
      status: 'Ongoing',
      organizer: organizer1._id,
      maxParticipants: 30,
    });

    // Completed Event
    const event8 = await Event.create({
      title: 'Music Festival 2025',
      description:
        'Annual music festival featuring local and international artists.',
      startDate: new Date('2025-12-15'),
      startTime: '12:00',
      endDate: new Date('2025-12-17'),
      endTime: '23:00',
      location: 'Central Park, New York',
      eventType: 'Offline',
      category: 'Festival',
      image: 'https://picsum.photos/seed/music1/800/400',
      status: 'Completed',
      organizer: organizer2._id,
    });

    console.log('✅ Events created');

    // Create Registrations
    console.log('📝 Creating registrations...');

    // Event 1 registrations
    const reg1 = await Registration.create({
      user: participant1._id,
      event: event1._id,
      status: 'Registered',
    });
    event1.participants.push(participant1._id);
    participant1.registeredEvents.push(event1._id);

    const reg2 = await Registration.create({
      user: participant2._id,
      event: event1._id,
      status: 'Registered',
    });
    event1.participants.push(participant2._id);
    participant2.registeredEvents.push(event1._id);

    // Event 2 registrations
    const reg3 = await Registration.create({
      user: participant1._id,
      event: event2._id,
      status: 'Registered',
    });
    event2.participants.push(participant1._id);
    participant1.registeredEvents.push(event2._id);

    const reg4 = await Registration.create({
      user: participant3._id,
      event: event2._id,
      status: 'Registered',
    });
    event2.participants.push(participant3._id);
    participant3.registeredEvents.push(event2._id);

    // Event 3 registrations
    const reg5 = await Registration.create({
      user: participant2._id,
      event: event3._id,
      status: 'Registered',
    });
    event3.participants.push(participant2._id);
    participant2.registeredEvents.push(event3._id);

    // Event 7 (ongoing) registrations
    const reg6 = await Registration.create({
      user: participant4._id,
      event: event7._id,
      status: 'Registered',
    });
    event7.participants.push(participant4._id);
    participant4.registeredEvents.push(event7._id);

    // Cancelled registration
    const reg7 = await Registration.create({
      user: participant3._id,
      event: event1._id,
      status: 'Cancelled',
      cancelledAt: new Date(),
      cancellationReason: 'Schedule conflict',
    });

    // Save updated events and users
    await event1.save();
    await event2.save();
    await event3.save();
    await event7.save();
    await participant1.save();
    await participant2.save();
    await participant3.save();
    await participant4.save();

    console.log('✅ Registrations created');

    // Create Organizer Requests
    console.log('📋 Creating organizer requests...');

    // Pending request
    await OrganizerRequest.create({
      user: participant4._id,
      reason:
        'I have 5 years of experience organizing tech meetups and would like to host events on this platform.',
      status: 'Pending',
    });

    // Approved request (example)
    await OrganizerRequest.create({
      user: organizer1._id,
      reason: 'Experienced event organizer with proven track record.',
      status: 'Approved',
      reviewedBy: admin._id,
      reviewedAt: new Date('2026-01-15'),
      adminComments: 'Excellent credentials. Approved.',
    });

    // Rejected request (example)
    await OrganizerRequest.create({
      user: participant3._id,
      reason: 'I want to organize events.',
      status: 'Rejected',
      reviewedBy: admin._id,
      reviewedAt: new Date('2026-01-20'),
      adminComments: 'Please provide more details about your experience.',
    });

    console.log('✅ Organizer requests created');

    console.log('\n🎉 Seed data created successfully!\n');
    console.log('='.repeat(60));
    console.log('📊 SUMMARY:');
    console.log('='.repeat(60));
    console.log(`✅ Admin User: ${admin.email} | Password: 12345678`);
    console.log(`✅ Organizers: 2`);
    console.log(`   - ${organizer1.email} | Password: password123`);
    console.log(`   - ${organizer2.email} | Password: password123`);
    console.log(`✅ Participants: 4`);
    console.log(`   - ${participant1.email} | Password: password123`);
    console.log(`   - ${participant2.email} | Password: password123`);
    console.log(`   - ${participant3.email} | Password: password123`);
    console.log(`   - ${participant4.email} | Password: password123`);
    console.log(`✅ Events: 8 (6 Upcoming, 1 Ongoing, 1 Completed)`);
    console.log(`✅ Registrations: 7 (6 Active, 1 Cancelled)`);
    console.log(`✅ Organizer Requests: 3 (1 Pending, 1 Approved, 1 Rejected)`);
    console.log('='.repeat(60));

    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
