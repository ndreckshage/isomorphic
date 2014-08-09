/**
 * always have a reference to whether it was server / client
 */
module.exports = typeof window === 'undefined' ? 'server' : 'client';
