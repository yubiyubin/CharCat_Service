import { describe, it, expect } from "vitest";
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
  toAlternatingCase,
} from "@/utils/caseConvert";

describe("toUpperCase", () => {
  it("소문자를 대문자로 변환", () => {
    expect(toUpperCase("hello world")).toBe("HELLO WORLD");
  });
  it("이미 대문자인 텍스트 유지", () => {
    expect(toUpperCase("HELLO")).toBe("HELLO");
  });
  it("혼합 케이스 변환", () => {
    expect(toUpperCase("Hello World")).toBe("HELLO WORLD");
  });
  it("빈 문자열", () => {
    expect(toUpperCase("")).toBe("");
  });
});

describe("toLowerCase", () => {
  it("대문자를 소문자로 변환", () => {
    expect(toLowerCase("HELLO WORLD")).toBe("hello world");
  });
  it("혼합 케이스 변환", () => {
    expect(toLowerCase("Hello World")).toBe("hello world");
  });
  it("빈 문자열", () => {
    expect(toLowerCase("")).toBe("");
  });
});

describe("toTitleCase", () => {
  it("각 단어의 첫 글자 대문자", () => {
    expect(toTitleCase("hello world")).toBe("Hello World");
  });
  it("이미 대문자인 경우에도 나머지는 소문자로", () => {
    expect(toTitleCase("HELLO WORLD")).toBe("Hello World");
  });
  it("여러 단어 처리", () => {
    expect(toTitleCase("the quick brown fox")).toBe("The Quick Brown Fox");
  });
  it("단일 단어", () => {
    expect(toTitleCase("hello")).toBe("Hello");
  });
  it("빈 문자열", () => {
    expect(toTitleCase("")).toBe("");
  });
});

describe("toSentenceCase", () => {
  it("첫 글자만 대문자", () => {
    expect(toSentenceCase("hello world")).toBe("Hello world");
  });
  it("여러 문장 처리 (마침표 뒤 대문자)", () => {
    expect(toSentenceCase("hello world. goodbye world.")).toBe(
      "Hello world. Goodbye world."
    );
  });
  it("느낌표·물음표 뒤 대문자", () => {
    expect(toSentenceCase("hello! are you ok? yes i am.")).toBe(
      "Hello! Are you ok? Yes i am."
    );
  });
  it("빈 문자열", () => {
    expect(toSentenceCase("")).toBe("");
  });
});

describe("toCamelCase", () => {
  it("공백 구분 단어를 camelCase로", () => {
    expect(toCamelCase("hello world")).toBe("helloWorld");
    expect(toCamelCase("user first name")).toBe("userFirstName");
  });
  it("특수문자 구분자 처리", () => {
    expect(toCamelCase("hello-world")).toBe("helloWorld");
    expect(toCamelCase("hello_world")).toBe("helloWorld");
  });
  it("단일 단어", () => {
    expect(toCamelCase("hello")).toBe("hello");
  });
  it("대문자 입력 처리", () => {
    expect(toCamelCase("Hello World")).toBe("helloWorld");
  });
  it("빈 문자열", () => {
    expect(toCamelCase("")).toBe("");
  });
});

describe("toPascalCase", () => {
  it("공백 구분 단어를 PascalCase로", () => {
    expect(toPascalCase("hello world")).toBe("HelloWorld");
    expect(toPascalCase("user first name")).toBe("UserFirstName");
  });
  it("특수문자 구분자 처리", () => {
    expect(toPascalCase("hello-world")).toBe("HelloWorld");
    expect(toPascalCase("hello_world")).toBe("HelloWorld");
  });
  it("단일 단어", () => {
    expect(toPascalCase("hello")).toBe("Hello");
  });
  it("빈 문자열", () => {
    expect(toPascalCase("")).toBe("");
  });
});

describe("toSnakeCase", () => {
  it("공백 구분 단어를 snake_case로", () => {
    expect(toSnakeCase("hello world")).toBe("hello_world");
    expect(toSnakeCase("user first name")).toBe("user_first_name");
  });
  it("특수문자 구분자 처리", () => {
    expect(toSnakeCase("hello-world")).toBe("hello_world");
  });
  it("대문자 입력 소문자로 변환", () => {
    expect(toSnakeCase("Hello World")).toBe("hello_world");
  });
  it("단일 단어", () => {
    expect(toSnakeCase("hello")).toBe("hello");
  });
  it("빈 문자열", () => {
    expect(toSnakeCase("")).toBe("");
  });
});

describe("toKebabCase", () => {
  it("공백 구분 단어를 kebab-case로", () => {
    expect(toKebabCase("hello world")).toBe("hello-world");
    expect(toKebabCase("user first name")).toBe("user-first-name");
  });
  it("특수문자 구분자 처리", () => {
    expect(toKebabCase("hello_world")).toBe("hello-world");
  });
  it("대문자 입력 소문자로 변환", () => {
    expect(toKebabCase("Hello World")).toBe("hello-world");
  });
  it("단일 단어", () => {
    expect(toKebabCase("hello")).toBe("hello");
  });
  it("빈 문자열", () => {
    expect(toKebabCase("")).toBe("");
  });
});

describe("toConstantCase", () => {
  it("공백 구분 단어를 CONSTANT_CASE로", () => {
    expect(toConstantCase("hello world")).toBe("HELLO_WORLD");
    expect(toConstantCase("max retry count")).toBe("MAX_RETRY_COUNT");
  });
  it("소문자 입력 대문자로 변환", () => {
    expect(toConstantCase("api base url")).toBe("API_BASE_URL");
  });
  it("단일 단어", () => {
    expect(toConstantCase("timeout")).toBe("TIMEOUT");
  });
  it("빈 문자열", () => {
    expect(toConstantCase("")).toBe("");
  });
});

describe("toAlternatingCase (TODO: 미구현 placeholder)", () => {
  it("현재 구현은 입력 텍스트를 그대로 반환", () => {
    // toAlternatingCase는 현재 placeholder 상태 (TODO(human))
    // 구현 완료 전까지는 입력값이 그대로 반환됨
    const input = "hello world";
    expect(toAlternatingCase(input)).toBe(input);
  });
  it("빈 문자열 처리", () => {
    expect(toAlternatingCase("")).toBe("");
  });
});
