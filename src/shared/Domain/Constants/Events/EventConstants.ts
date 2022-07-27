const EventConstants = () => ({
  messagePatterns: {
    user: {
      findByEmail: 'event.user.findByEmail',
    },
    auth: {
      checkUserByEmail: 'event.auth.user.findByEmail',
    },
  },
});

export default EventConstants();
