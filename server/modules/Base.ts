abstract class BaseModule {
  abstract namespace: string
  abstract init(): void
}

declare namespace BaseModule {}

export default BaseModule
