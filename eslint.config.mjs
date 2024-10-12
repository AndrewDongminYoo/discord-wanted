import globals from 'globals';
import plugin from '@eslint/js';
import eslint from 'typescript-eslint';

/**
 * 코드베이스에서 JavaScript, TypeScript 및 관련 파일을 린팅하기 위한 규칙과 설정을 정의하는 ESLint 구성 개체 배열을 내보냅니다.
 *
 * 구성은 다음과 같습니다.:
 * It includes the following:
 * - 린팅 대상 파일: 모든 JavaScript, TypeScript 및 관련 파일
 * - Node.js 환경에서 사용 가능한 전역 변수
 * - eslint/js 및 typescript-eslint 플러그인에서 권장하는 구성
 * - 다음을 포함한 사용자 지정 규칙 및 설정
 *   - 일관된 코드 스타일 적용(예: 화살표 함수, 중괄호, 점 표기법)
 *   - 특정 규칙 비활성화(예: 복잡성, 파일당 최대 클래스 수)
 *   - 일반적인 프로그래밍 오류를 잡기 위한 규칙 활성화(예: no-console, no-undef-init)
 *   - var보다 const를 사용하도록 요구
 */
export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  { languageOptions: { globals: globals.node, ecmaVersion: 2021 } },
  plugin.configs.recommended,
  ...eslint.configs.recommended,
  {
    rules: {
      'arrow-body-style': 'error',
      complexity: 'off',
      'constructor-super': 'error',
      curly: 'error',
      'dot-notation': 'error',
      eqeqeq: ['error', 'smart'],
      'guard-for-in': 'error',
      'id-match': 'error',
      'max-classes-per-file': 'off',
      'max-params': ['error', 7],
      'no-await-in-loop': 'error',
      'no-bitwise': 'error',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-console': [
        'error',
        {
          allow: ['info', 'debug', 'warn', 'error', 'assert', 'clear', 'count'],
        },
      ],
      'no-constant-condition': 'error',
      'no-debugger': 'error',
      'no-dupe-else-if': 'error',
      'no-duplicate-case': 'error',
      'no-else-return': 'error',
      'no-empty': 'error',
      'no-eval': 'error',
      'no-extra-bind': 'error',
      'no-fallthrough': 'error',
      'no-implicit-coercion': 'error',
      'no-invalid-this': 'error',
      'no-irregular-whitespace': 'error',
      'no-new-func': 'error',
      'no-new-wrappers': 'error',
      'no-redeclare': 'error',
      'no-sequences': 'error',
      'no-shadow': 'off',
      'no-sparse-arrays': 'error',
      'no-template-curly-in-string': 'error',
      'no-throw-literal': 'error',
      'no-undef-init': 'error',
      'no-unsafe-finally': 'error',
      'no-unused-labels': 'error',
      'no-unused-vars': 'off',
      'no-useless-return': 'error',
      'no-var': 'error',
      'object-shorthand': 'error',
      'prefer-const': 'error',
      'prefer-object-spread': 'error',
      radix: 'error',
      strict: ['error', 'never'],
      'use-isnan': 'error',
      'valid-typeof': 'off',
      yoda: 'error',
    },
  },
];
