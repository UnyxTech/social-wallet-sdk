interface OpenWindow {
  url: string;
  name?: string;
}

export const openWindow = ({ url, name }: OpenWindow) => {
  const top = (window.innerHeight - 400) / 2 + window.screenY;
  const left = (window.innerWidth - 400) / 2 + window.screenX;

  return window.open(
    url,
    name,
    `dialog=yes,top=${top}px,left=${left},width=${400}px,height=${600}px`
  );
};