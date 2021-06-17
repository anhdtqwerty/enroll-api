"use strict";

const lazyRateLimit = {
  get RateLimit() {
    return require("koa2-ratelimit").RateLimit;
  },
};

module.exports = async (ctx, next) => {
  const message = [
    {
      messages: [
        {
          id: "Auth.form.error.ratelimit",
          message: "Too many request. Stop!",
        },
      ],
    },
  ];

  return lazyRateLimit.RateLimit.middleware(
    Object.assign(
      {},
      {
        interval: 1 * 60 * 1000,
        max: 999999,
        prefixKey: `${ctx.request.path}:${ctx.request.ip}`,
        message,
      },
      strapi.plugins["users-permissions"].config.ratelimit
    )
  )(ctx, next);
};
