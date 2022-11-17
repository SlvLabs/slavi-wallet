export class NotificationUnsupported extends Error {
  private readonly previous: Error

  constructor(previous: Error) {
    super("Notification unsupported");

    this.previous = previous;
  }

  getPrevious(): Error {
    return this.previous;
  }
}
