export const isClient = () => typeof window !== 'undefined';

export const env = (key: string): string | undefined => {
  if(isClient()) {
    return window?.PUBLIC_CONFIG?.publicRuntimeConfig?.[key];
  }

  return process.env?.[key];
}
