export const PLATFORM = {
  MOBILE: "mobile",
  DESKTOP: "desktop",
};

export const getPlatform = (userAgent) => {
  const regexMobile =
    /(android|webos|iphone|ipad|ipod|blackberry|windows phone)/i;
  if (regexMobile.test(userAgent)) {
    return PLATFORM.MOBILE;
  }
  return PLATFORM.DESKTOP;
};
