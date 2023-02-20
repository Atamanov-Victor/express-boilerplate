const { scryptSync } = require("crypto");

const PASSWORD_KEY_LENGTH = 64;

// CPU/memory cost parameter. Must be a power of two greater than one
const PASSWORD_HASH_COST = 1024 * 4;
const PASSWORD_HASH_BLOCK_SIZE = 16;

const salt = "vyxx7klnvvr6qll8elao12o1r6l9auqbitzv4ao5c5hsgs7kk7fbf9ixlacmu8ni";

const hashPassword = (password) =>
  scryptSync(password, salt, PASSWORD_KEY_LENGTH, {
    cost: PASSWORD_HASH_COST,
    blockSize: PASSWORD_HASH_BLOCK_SIZE,
  }).toString("hex");

module.exports = { hashPassword };
