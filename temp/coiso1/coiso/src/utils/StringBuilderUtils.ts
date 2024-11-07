export class StringBuilderUtils {
    private value: string = '';
  
    append(str: string): void {
      this.value += str;
    }
  
    toString(): string {
      return this.value;
    }
  }
  