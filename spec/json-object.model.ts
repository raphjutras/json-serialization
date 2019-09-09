import { JsonProperty } from "../src/json-property";
import { IJsonSerializer, IJsonDeserializer } from "../src/shared";

export enum Gender {
  Male = 1,
  Female = 2
}

export class GenderSerialization implements IJsonSerializer, IJsonDeserializer {
  public serialize(value: any): any {
    return `${Gender[value]}`;
  }

  public deserialize(value: any): any {
    return Gender[value];
  }
}

export class Person {
  @JsonProperty()
  public firstName: string = undefined;

  @JsonProperty()
  public lastName: string = undefined;

  @JsonProperty({ name: 'age' })
  public currentAge: number = undefined;

  @JsonProperty({ target: Person })
  public children: Person[] = undefined;

  @JsonProperty()
  public skills: string[] = undefined;

  @JsonProperty({
    serializer: GenderSerialization,
    deserializer: GenderSerialization
  })
  public gender: Gender = undefined;

  public ignoredField: string = undefined;

  public get fullName(): string {
    return `${this.firstName} ${this.lastName}`;
  }
}
