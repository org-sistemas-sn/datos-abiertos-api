const authorizedOrigins = {
  origin1: process.env.ORIGIN_1,
  origin2: process.env.ORIGIN_2,
  origin3: process.env.ORIGIN_3,
};

const auth = {
  origin: authorizedOrigins.origin1,
  methods: "POST",
  preflightContinue: true,
};

const example1 = {
  origin: authorizedOrigins.origin1,
  methods: "POST",
  preflightContinue: true,
};

const example2 = {
  origin: authorizedOrigins.origin2,
  methods: "GET",
  preflightContinue: true,
};

module.exports.corsOptions = {
  auth,
  example1,
  example2,
};
