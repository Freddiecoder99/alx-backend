import redis from 'redis';

const client = redis.createClient({
  host: '127.0.0.1',
  port: 6379
});

client.on('error', (err) => {
  console.log(`Redis client not connected to the server: ${err}`);
});

client.on('connect', () => {
  console.log('Redis client connected to the server');
});

const schools = {
  Portland: 50,
  Seattle: 80,
  'New York': 20,
  Bogota: 20,
  Cali: 40,
  Paris: 2
};

Object.entries(schools).forEach(([school, value]) => {
  client.hset('HolbertonSchools', school, value, redis.print);
});

client.hgetall('HolbertonSchools', (err, obj) => {
  if (err) {
    console.log('Error retrieving hash:', err);
    return;
  }
  console.log(obj);
});
