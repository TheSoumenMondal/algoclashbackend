# Bull Board Setup for Queue Monitoring

This document explains how the Bull Board has been set up for monitoring the BullMQ queues.

## What is Bull Board?

Bull Board is a web-based UI dashboard for monitoring and managing Bull/BullMQ queues. It provides a real-time view of:
- Queue status and job counts
- Individual job details and data
- Job execution history
- Failed jobs and retry information
- Queue metrics and statistics

## Setup Overview

The Bull Board has been configured in this evaluator service with the following setup:

### Files Modified/Created:

1. **`src/config/bullBoardConfig.ts`** - Main configuration for Bull Board
2. **`src/app.ts`** - Integration with Express app
3. **`src/index.ts`** - Added console logs for Bull Board URL

### Configuration Details:

- **Base Path**: `/admin/queues`
- **Monitored Queue**: `SampleQueue` (your existing queue)
- **Integration**: Integrated with main Express app

## How to Use

### Starting the Application

1. Make sure Redis is running on your configured port
2. Run your application:
   ```bash
   npm run dev
   # or
   npm start
   ```

### Accessing Bull Board

Once your server is running, access the Bull Board UI at:
```
http://localhost:<YOUR_PORT>/admin/queues
```

Example: `http://localhost:3000/admin/queues`

### Features Available

1. **Queue Overview**: See all your queues and their current status
2. **Job Management**: 
   - View active, completed, failed, and waiting jobs
   - Retry failed jobs
   - Remove jobs from queues
3. **Job Details**: Click on any job to see its data and execution details
4. **Real-time Updates**: The dashboard updates in real-time as jobs are processed

## Adding More Queues

To monitor additional queues, update `src/config/bullBoardConfig.ts`:

```typescript
import { createBullBoard } from '@bull-board/api';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import sampleQueue from '../queue/sampleQueue.js';
import anotherQueue from '../queue/anotherQueue.js'; // Import your new queue

const { addQueue, removeQueue, setQueues, replaceQueues } = createBullBoard({
    queues: [
        new BullMQAdapter(sampleQueue),
        new BullMQAdapter(anotherQueue), // Add your new queue here
    ],
    serverAdapter: serverAdapter,
});
```

## Dynamic Queue Management

You can also add/remove queues dynamically using the exported functions:

```typescript
import { addQueue, removeQueue } from './config/bullBoardConfig.js';
import { BullMQAdapter } from '@bull-board/api/bullMQAdapter.js';
import newQueue from './queue/newQueue.js';

// Add a queue at runtime
addQueue(new BullMQAdapter(newQueue));

// Remove a queue at runtime
removeQueue('QueueName');
```

## Security Considerations

The Bull Board is currently accessible without authentication. For production environments, consider:

1. Adding authentication middleware
2. Restricting access by IP
3. Using environment-specific configurations
4. Setting up proper CORS policies

## Troubleshooting

1. **Bull Board not loading**: Check that Redis is running and accessible
2. **No queues visible**: Ensure your queues are properly imported and added to the configuration
3. **Jobs not appearing**: Verify that jobs are being added to the correct queue name
4. **Connection errors**: Check your Redis configuration in `src/config/redisConfig.ts`
