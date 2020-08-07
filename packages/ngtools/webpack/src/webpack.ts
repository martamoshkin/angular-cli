/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
type WebpackInputFileSystem = import('webpack').Compiler['inputFileSystem'];
type WebpackWatchFileSystem = import('webpack').Compiler['watchFileSystem'];

// Declarations for (some) Webpack types. Only what's needed.

export interface NormalModuleFactoryRequest {
  request: string;
  context: { issuer: string };
  contextInfo: { issuer: string };
  typescriptPathMapped?: boolean;
}

export interface NodeWatchFileSystemInterface extends WebpackWatchFileSystem {
  inputFileSystem: WebpackInputFileSystem;
  new (inputFileSystem: WebpackInputFileSystem): NodeWatchFileSystemInterface;
}
