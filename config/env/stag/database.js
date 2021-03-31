module.exports = ({ env }) => ({
  defaultConnection: "default",
  connections: {
    default: {
      connector: "mongoose",
      settings: {
        client: "mongo",
        uri:
          "mongodb+srv://robo3t:123qwe@enroll.o5bnx.mongodb.net/staging?retryWrites=true&w=majority",
      },
      options: {
        ssl: true,
      },
    },
  },
});
