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

function displaySchoolValue(schoolName) {
  client.get(schoolName, (err, reply) => {
    if (err) {
      console.log(`Error retrieving ${schoolName}: ${err}`);
      return;
    }
    console.log(reply);
  });
}

function setNewSchool(schoolName, value) {
  client.set(schoolName, value, redis.print);
}

displaySchoolValue('Holberton');
setNewSchool('HolbertonSanFrancisco', '100');
displaySchoolValue('HolbertonSanFrancisco');
