import { describe, expect, test } from "vitest";
import {
  toUpperCase,
  toLowerCase,
  toTitleCase,
  toSentenceCase,
  toCamelCase,
  toPascalCase,
  toSnakeCase,
  toKebabCase,
  toConstantCase,
} from "./caseConvert";

describe("toUpperCase", () => {
  test.each([
    ["hello world", "HELLO WORLD"],
    ["HELLO WORLD", "HELLO WORLD"],
    ["Hello World", "HELLO WORLD"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toUpperCase(input)).toBe(expected);
  });
});

describe("toLowerCase", () => {
  test.each([
    ["HELLO WORLD", "hello world"],
    ["hello world", "hello world"],
    ["Hello World", "hello world"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toLowerCase(input)).toBe(expected);
  });
});

describe("toTitleCase", () => {
  test.each([
    ["hello world", "Hello World"],
    ["HELLO WORLD", "Hello World"],
    ["the quick brown fox", "The Quick Brown Fox"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toTitleCase(input)).toBe(expected);
  });
});

describe("toSentenceCase", () => {
  test.each([
    ["hello world", "Hello world"],
    ["HELLO WORLD", "Hello world"],
    ["hello. world. foo", "Hello. World. Foo"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toSentenceCase(input)).toBe(expected);
  });
});

describe("toCamelCase", () => {
  test.each([
    ["hello world", "helloWorld"],
    ["Hello World", "helloWorld"],
    ["hello-world", "helloWorld"],
    ["hello_world", "helloWorld"],
    ["HELLO WORLD", "helloWorld"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toCamelCase(input)).toBe(expected);
  });
});

describe("toPascalCase", () => {
  test.each([
    ["hello world", "HelloWorld"],
    ["hello-world", "HelloWorld"],
    ["hello_world", "HelloWorld"],
    ["HELLO WORLD", "HelloWorld"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toPascalCase(input)).toBe(expected);
  });
});

describe("toSnakeCase", () => {
  test.each([
    ["hello world", "hello_world"],
    ["Hello World", "hello_world"],
    ["helloWorld", "helloworld"],
    ["hello-world", "hello_world"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toSnakeCase(input)).toBe(expected);
  });
});

describe("toKebabCase", () => {
  test.each([
    ["hello world", "hello-world"],
    ["Hello World", "hello-world"],
    ["hello_world", "hello-world"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toKebabCase(input)).toBe(expected);
  });
});

describe("toConstantCase", () => {
  test.each([
    ["hello world", "HELLO_WORLD"],
    ["Hello World", "HELLO_WORLD"],
    ["hello-world", "HELLO_WORLD"],
    ["hello_world", "HELLO_WORLD"],
    ["", ""],
  ])('"%s" → "%s"', (input, expected) => {
    expect(toConstantCase(input)).toBe(expected);
  });
});
