export abstract class BaseValueObject<T> {
  protected valuePrimitive?: T;

  protected constructor(value: T) {
    this.valuePrimitive = value;
  }
  public value(): T {
    return this.valuePrimitive;
  }
}
