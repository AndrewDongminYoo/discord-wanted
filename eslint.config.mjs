import globals from "globals";
import plugin from "@eslint/js";
import eslint from "typescript-eslint";

/**
 * 코드베이스에서 JavaScript, TypeScript 및 관련 파일을 린팅하기 위한 규칙과 설정을 정의하는 ESLint 구성 개체 배열을 내보냅니다.
 * https://discordjs.guide/preparations/setting-up-a-linter.html#setting-up-eslint-rules
 *
 * 구성은 다음과 같습니다.:
 * - 확장자가 .js, .mjs, .cjs, .ts인 모든 파일 린트하기
 * - eslint/js 플러그인의 권장 구성 사용
 * - typescript-eslint/eslint-plugin의 권장 구성 사용
 * - 환경을 Node.js 및 ES6으로 설정하기
 * - 코드 스타일 및 모범 사례에 대한 일련의 사용자 지정 규칙 정의하기:
 *   - 화살표 함수의 간격이 일정하도록 요구
 *   - 특정 중괄호 스타일 적용
 *   - 여러 줄의 객체 및 배열 리터럴에 후행 쉼표 필요
 *   - 일관된 쉼표 간격 및 스타일 적용
 *   - 여러 줄 조건문에 중괄호 필요
 *   - 탭을 사용하여 일관된 들여쓰기 적용
 *   - 키워드 주위에 일관된 간격 필요
 *   - 중첩 콜백의 최대 개수 제한
 *   - 한 줄당 최대 문 수 제한
 *   - 콘솔 로깅을 허용하기 위해 콘솔 금지 규칙 비활성화
 *   - 기타 다양한 코드 스타일 및 모범 사례 규칙 적용
 */
export default [
  { files: ["**/*.{js,mjs,cjs,ts}"] },
  { languageOptions: { globals: globals.node, ecmaVersion: 2021 } },
  plugin.configs.recommended,
  ...eslint.configs.recommended,
  {
    env: {
      node: true,
      es6: true,
    },
    rules: {
      "arrow-spacing": ["warn", { before: true, after: true }],
      "brace-style": ["error", "stroustrup", { allowSingleLine: true }],
      "comma-dangle": ["error", "always-multiline"],
      "comma-spacing": "error",
      "comma-style": "error",
      curly: ["error", "multi-line", "consistent"],
      "dot-location": ["error", "property"],
      "handle-callback-err": "off",
      indent: ["error", "tab"],
      "keyword-spacing": "error",
      "max-nested-callbacks": ["error", { max: 4 }],
      "max-statements-per-line": ["error", { max: 2 }],
      "no-console": "off",
      "no-empty-function": "error",
      "no-floating-decimal": "error",
      "no-inline-comments": "error",
      "no-lonely-if": "error",
      "no-multi-spaces": "error",
      "no-multiple-empty-lines": ["error", { max: 2, maxEOF: 1, maxBOF: 0 }],
      "no-shadow": ["error", { allow: ["err", "resolve", "reject"] }],
      "no-trailing-spaces": ["error"],
      "no-var": "error",
      "object-curly-spacing": ["error", "always"],
      "prefer-const": "error",
      quotes: ["error", "single"],
      semi: ["error", "always"],
      "space-before-blocks": "error",
      "space-before-function-paren": [
        "error",
        {
          anonymous: "never",
          named: "never",
          asyncArrow: "always",
        },
      ],
      "space-in-parens": "error",
      "space-infix-ops": "error",
      "space-unary-ops": "error",
      "spaced-comment": "error",
      yoda: "error",
    },
  },
];
