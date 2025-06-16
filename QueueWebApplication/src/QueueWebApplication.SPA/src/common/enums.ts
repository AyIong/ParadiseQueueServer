export enum QueueResponse {
  AddedToQueue = 0,
  BypassedQueue = 1,
  Rejected = 3,
  AlreadyInQueue = 4,
}

export enum QueueState {
  NotInQueue,
  InQueue,
  AllowedToConnect,
  Banned,
}
