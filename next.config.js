const { PHASE_DEVELOPMENT_SERVER } = require("next/constants")

/** @type {import('next').NextConfig} */

module.exports = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      env: {
        mongodb_username: "deneme",
        mongodb_password: "deneme",
        mongodb_clustername: "next-blog-cluster",
        mongodb_database: "next-auth-dev",
      },
    }
  }
  //if its not development server, return down below
  return {
    reactStrictMode: true,
    env: {
      mongodb_username: "deneme",
      mongodb_password: "deneme",
      mongodb_clustername: "next-blog-cluster",
      mongodb_database: "next-auth-blog",
    },
  }
}
