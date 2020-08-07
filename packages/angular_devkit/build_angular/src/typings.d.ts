/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { RawSourceMap } from 'source-map';
import * as webpack from 'webpack';

// tslint:disable: no-implicit-dependencies no-unnecessary-qualifier

// Webpack typings augmentations to support Webpack 5 transition
declare module 'webpack' {
  type InputFileSystem = webpack.Compiler['inputFileSystem'] & {
    readFileSync(path: string): Buffer;
    readlinkSync(path: string): string;
    statSync(path: string): import('fs').Stats;
  };

  interface RuleSetLoader {
    loader: string;
    options: Record<string, unknown>;
  }

  namespace compilation {
    interface Chunk extends webpack.Chunk {}
    interface Compilation extends webpack.Compilation {}
    interface Module extends webpack.Module {}
  }

  namespace loader {
    interface LoaderContext {
      addDependency(path: string): void;
      async(): (
        error: Error | null | undefined,
        content?: string | Buffer,
        sourceMap?: RawSourceMap,
      ) => void;
      cacheable(): void;
      callback(
        error: Error | null | undefined,
        content?: string | Buffer,
        sourceMap?: RawSourceMap,
      ): void;
      emitError(error: string): void;
      emitFile(path: string, content: string | Buffer, sourceMap?: RawSourceMap): void;
      emitWarning(warning: string): void;
      loadModule(
        request: string,
        callback: (error: Error | undefined, source: string, sourceMap: RawSourceMap) => void,
      ): void;
      resolve(
        context: string,
        request: string,
        callback: (error: Error | undefined, result: string) => void,
      ): void;

      readonly context: string;
      readonly fs: InputFileSystem;
      readonly loaderIndex: number;
      readonly loaders: { options: Record<string, unknown> }[];
      // tslint:disable-next-line: no-any
      readonly query: any;
      readonly resourcePath: string;
      readonly rootContext: string;
      readonly sourceMap: boolean;

      readonly _compilation: webpack.Compilation;
      readonly _compiler: webpack.Compiler;
      readonly _module: webpack.Module;
    }
  }

  namespace Stats {
    interface ToJsonOutput {
      assets: { name: string, size: number }[];
      chunks: { id: number, entry: boolean, initial: boolean, files: string[], names: string[] }[];
      entrypoints: Record<string, { chunks: number[] }>;
      errors: string[];
      hash: string;
      outputPath: string;
      warnings: string[];
    }
  }
}

// Workaround for https://github.com/bazelbuild/rules_nodejs/issues/1033
// Alternative approach instead of https://github.com/angular/angular/pull/33226
declare module '@babel/core' {
  export * from '@types/babel__core';
}
declare module '@babel/generator' {
  export { default } from '@types/babel__generator';
}
declare module '@babel/traverse' {
  export { default } from '@types/babel__traverse';
}
declare module '@babel/template' {
  export { default } from '@types/babel__template';
}
