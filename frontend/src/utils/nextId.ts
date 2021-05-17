let NEXT_ID = 0;

/**
 * Returns an unique id.
 *
 * The returned id is only unique for the live-time of the application and must be not cached.
 */
export default function nextId(): number {
  return ++NEXT_ID;
}
