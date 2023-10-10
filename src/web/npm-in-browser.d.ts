declare module "npm-in-browser" {
  export const runNpmCli: (
    args: string[],
    options: {
      fs: unknown;
      cwd: string;
      stdout?: (chunk: string) => void;
      stderr?: (chunk: string) => void;
      timings?: {
        start: (name: string) => void
        end: (name: string) => void
      },
    },
  ) => Promise<void>
}