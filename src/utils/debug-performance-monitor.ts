import PerformanceMonitorInterface, {
  PerformanceTraceInterface,
} from '@slavi/wallet-core/src/utils/performance-monitor-interface';

class DebugPerformanceMonitor implements PerformanceMonitorInterface {
  async startTrace(tag: string): Promise<PerformanceTraceInterface> {
    return new DebugTrace(tag);
  }
}

class DebugTrace implements PerformanceTraceInterface {
  private readonly name: string;
  private readonly start: number;

  private attributes: Record<string, string> = {};

  constructor(name: string) {
    this.name = name;
    this.start = Date.now();
  }

  putAttribute(name: string, value: string): void {
    this.attributes[name] = value;
  }

  stop(): void {
    console.log(`Trace ${this.name} finished in ${Date.now() - this.start}`);
    console.log(`Attributes: ${JSON.stringify(this.attributes)}`);
  }
}

export default DebugPerformanceMonitor;
